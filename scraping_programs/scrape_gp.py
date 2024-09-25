from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options
import time
import os
import json
from unidecode import unidecode
import re

def get_gp():
    options = Options()
    options.add_argument("--headless")
    driver = webdriver.Chrome(options=options)

    link_text = "https://www.statsf1.com/en/1985/allemagne.aspx"
    driver.get(link_text)
    time.sleep(5)

    grand_prix_data = {}
    try:
        with open('grand_prix_stats/f1_grand_prix.json', 'r') as file:
            if file.readable():
                file.seek(0)  # Go back to the start of the file
                data = file.read()
                if data.strip():  # Check if the file is not empty
                    grand_prix_data = json.loads(data)
    except (FileNotFoundError, json.JSONDecodeError):
        # Initialize an empty dict if the file doesn't exist or is invalid
        grand_prix_data = {}


    while True:
        next_button = driver.find_element(By.ID, "ctl00_HL_NavigRight")
        
        # Get the name and year. 
        name_year_element = driver.find_elements(By.TAG_NAME, "h2")[1]
        name_year = name_year_element.find_elements(By.TAG_NAME, "a")
        gp_name = name_year[0].text
        
        if gp_name == "INDIANAPOLIS":
            next_button.click()
            continue
            
        gp_year = name_year[1].text

        # Get the circuit name, and the date of the gp. 
        gp_info_element = driver.find_element(By.CLASS_NAME, "GPinfo")
        circuit_name = gp_info_element.find_element(By.TAG_NAME, "a").text
        gp_info_text = gp_info_element.text.split("\n")
        gp_date = gp_info_text[1]

        # Click the result link, and get the results.
        driver.find_element(By.ID, "ctl00_CPH_Main_HL_Classement").click()
        time.sleep(4)

        # Check if the year and GP name already exist in the data structure
        if gp_year not in grand_prix_data:
            grand_prix_data[gp_year] = {}
        
        if gp_name not in grand_prix_data[gp_year]:
            grand_prix_data[gp_year][gp_name] = {
                "circuit": circuit_name,
                "date": gp_date,
                "results": []
            }

        # Process the results table
        table = driver.find_element(By.TAG_NAME, "table")
        table_rows = table.find_elements(By.TAG_NAME, "tr")

        for row in table_rows[1:]:
            row_data = row.find_elements(By.TAG_NAME, "td")
            position = row_data[0].text
            
            if position in ["np", "f", "", " "]:
                continue
            
            number = row_data[1].text
            driver_name = unidecode(row_data[2].text)
            laps = row_data[5].text
            points = row_data[7].text
            if points == "":
                points = "0"

            grand_prix_data[gp_year][gp_name]["results"].append({
                "position": position,
                "number": number,
                "driver_name": driver_name,
                "laps": laps,
                "points": points
            })
        
        driver.back()
        time.sleep(3)

        # Write the updated data back to the JSON file
        with open('grand_prix_stats/f1_grand_prix.json', 'w') as file:
            json.dump(grand_prix_data, file, indent=4)

        next_button.click()
        time.sleep(3)



if __name__ == "__main__":
    get_gp()