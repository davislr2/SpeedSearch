from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options
import time
import os
import json
from unidecode import unidecode
import re


def get_circuits():
    options = Options()
    options.add_argument("--headless")
    driver = webdriver.Chrome(options=options)
    circuit_links = []
    while True:
        link = input("Enter the link of the circuits page: ")
        if link == "q":
            break
        circuit_links.append(link)
    
    for link in circuit_links:
        driver.get(link)
        time.sleep(3)

        circuit_name = unidecode(driver.find_element(By.ID, "venueName").text)
        circuit_location = unidecode(driver.find_element(By.XPATH, "//div[contains(@class, 'styled__Address')]").text)
        no_corners = driver.find_element(By.ID, "cornersAmount").text
        if no_corners == "\u2014":
            no_corners = "N/A"
        length = driver.find_element(By.ID, "venueLength").text
        first_year = re.findall(r'\d+\.\d+|\d+', driver.find_element(By.ID, "firstRaceName").text)[0]
        last_year = re.findall(r'\d+\.\d+|\d+',driver.find_element(By.ID, "lastRaceName").text)[0]
        
        """
        print(f"Circuit Name: {circuit_name}")
        print(f"Location: {circuit_location}")
        print(f"Number of Corners: {no_corners}")
        print(f"First Year: {first_year}")
        print(f"Last Year: {last_year}")
        print("\n")
        """

        circuit = {
            "circuit_name": circuit_name,
            "circuit_location": circuit_location,
            "no_corners": no_corners,
            "length": length,
            "first_year": first_year,
            "last_year": last_year
        }

        try:
            with open('circuit_stats/f3_circuits.json', 'r') as file:
                    circuit_list = json.load(file)
        except (FileNotFoundError, json.JSONDecodeError):
                circuit_list = []

        circuit_list.append(circuit)

        with open('circuit_stats/f3_circuits.json', 'w') as file:
            json.dump(circuit_list, file, indent=4)



if __name__ == "__main__":
    get_circuits()

        


    

