from selenium import webdriver
from selenium.webdriver.common.by import By
import time
import json
import os
from unidecode import unidecode
import re

def scrape_seasons():
    options = webdriver.ChromeOptions()
    options.add_argument("--headless")  # Run Chrome in headless mode
    f1_year_range = range(1950, 2025)
    f2_year_range = range(2017, 2025)
    f3_year_range = range(2019, 2025)

    seasons_dict = {}

    for year in reversed(f2_year_range):
        #link_text = "https://motorsportstats.com/series/fia-formula-one-world-championship/standings/" + str(year)
        #link_text = "https://motorsportstats.com/series/fia-formula-3-championship/standings/" + str(year) # F3
        link_text = "https://motorsportstats.com/series/fia-formula-2-championship/standings/" + str(year) # F2
        driver = webdriver.Chrome(options=options)
        driver.get(link_text)
        time.sleep(8)  # Sleep to let the page load

        seasons_dict[year] = []
        # Get the table, and a list of each row. 
        table = driver.find_element(By.CSS_SELECTOR, "table")
        rows = table.find_elements(By.TAG_NAME, "tr")

        # Get list of all races.
        race_row = rows[0]
        races_cells = race_row.find_elements(By.TAG_NAME, "a")
        race_names = [race.text for race in races_cells]


        # create a dictionary of results, keyed on driver name, where the value is a list of (race, points) pairs.
        driver_dict = {}
        for row in rows[1:]:                                # For each of the driver rows.
            cells = row.find_elements(By.TAG_NAME, "td")   
            driver_name = unidecode((cells[1].text.split("\n"))[0])
            driver_dict[driver_name] = []
            for i, cell in enumerate(cells[2:-2]):
                if cell.text == "":
                    points = "0"
                else:
                    points = re.findall(r'\d+\.\d+|\d+', cell.text)[0]
                driver_dict[driver_name].append((race_names[i], points))
        
        seasons_dict[year] = driver_dict
        # add the dictionary to the json file where it will be keyed on season year. 
        with open('f2_seasons.json', 'w') as file:
            json.dump(seasons_dict, file, indent=4)

            


        
if __name__ == "__main__":
    scrape_seasons()