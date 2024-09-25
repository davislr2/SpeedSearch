from selenium import webdriver
from selenium.webdriver.common.by import By
import time
import json
import os
import re

year_regex = re.compile(r'^\d{4}$')

def scrapeConstructorData():
    options = webdriver.ChromeOptions()
    options.add_argument("--headless")  # Run Chrome in headless mode

    link_text = "https://www.statsf1.com/en/adams.aspx"
    driver = webdriver.Chrome(options=options)
    driver.get(link_text)
    time.sleep(5)

    constructor = {}
    while True:
        # Get the team name.
        name = driver.find_elements(By.TAG_NAME, "h2")[1].text

        # If the constructor has never been ranked in the World Championship (It doesn't have no_starts listed), skip it.
        starts_element = driver.find_elements(By.ID, "ctl00_CPH_Main_HL_StatsGP")
        if len(starts_element) ==0:
            next_button = driver.find_element(By.ID, "ctl00_HL_NavigRight")
            next_button.click()
            time.sleep(5)
            continue
        else:
            starts = int(re.findall(r'\d+\.\d+|\d+', starts_element[0].text)[0])
            # If the constructor has less than 10 starts, skip it.
            if starts < 10:
                next_button = driver.find_element(By.ID, "ctl00_HL_NavigRight")
                next_button.click()
                time.sleep(5)
                continue
            # If the site doesn't have points listed, set points to 0.
            points = driver.find_elements(By.ID, "ctl00_CPH_Main_LB_Point")
            if len(points) == 0: points = 0
            else: points = re.findall(r'\d+\.\d+|\d+', points[0].text)[0]
            # Get the number of wins, if wins aren't listed set to 0.
            wins = driver.find_elements(By.ID, "ctl00_CPH_Main_HL_StatsVictoire")
            if len(wins) == 0:
                wins = 0
            else:
                wins = re.findall(r'\d+\.\d+|\d+', wins[0].text)[0]

            # Get the number of poles, if poles aren't listed set to 0.
            poles = driver.find_elements(By.ID, "ctl00_CPH_Main_HL_StatsPole")
            if len(poles) == 0:
                poles = 0
            else:
                poles = re.findall(r'\d+\.\d+|\d+', poles[0].text)[0]

            # Get the start year.
            start_year = driver.find_elements(By.ID, "ctl00_CPH_Main_HL_FirstGP")[0].text
            start_year = re.findall(r'\d+\.\d+|\d+', start_year)[0]

            # If the end year isn't listed, set it to 2024. 
            end_year = driver.find_elements(By.ID, "ctl00_CPH_Main_HL_LastGP")
            if len(end_year) == 0:
                end_year = 0000
            else:
                end_year = end_year[0].text
                end_year = re.findall(r'\d+\.\d+|\d+', end_year)[0]
            
            # Get the number of championships.
            no_championships = 0
            constructor_stats_element = driver.find_element(By.XPATH, "//div[contains(@class, 'constructeurstats')]")
            constructor_stats = constructor_stats_element.find_elements(By.TAG_NAME, "p")
            for stat in constructor_stats:
                if "World Champion (Constructors)" in stat.text:
                    links = stat.find_elements(By.TAG_NAME, "a")
                    for link in links:
                        link_text = link.text
                        if year_regex.match(link_text):
                            no_championships += 1
                            best_position = 1
                if "Best ranked in the World Championship (Constructors)" in stat.text:
                    best_position = re.findall(r'\d+\.\d+|\d+', stat.text)[0]
            

            print(name)
            print("Points:",points)
            print("Wins:",wins)
            print("Poles:",poles)
            print("Start Year:",start_year)
            print("End Year:",end_year)
            print("Championships:",no_championships)
            print("Best Position:",best_position)

            constructor = {
                "name": name,
                "points": float(points),
                "wins": int(wins),
                "poles": int(poles),
                "start_year": int(start_year),
                "end_year": int(end_year),
                "championships": no_championships,
                "best_championship_position": int(best_position)
            }

            try:
                with open('f1_constructors.json', 'r') as file:
                    constructors_list = json.load(file)
            except (FileNotFoundError, json.JSONDecodeError):
                constructors_list = []

            # Step 2: Append the new team data
            constructors_list.append(constructor)

            # Step 3: Write the updated list back to the file
            with open('f1_constructors.json', 'w') as file:
                json.dump(constructors_list, file, indent=4)

            # Click the next button
            next_button = driver.find_element(By.ID, "ctl00_HL_NavigRight")
            next_button.click()
            time.sleep(5)


if __name__ == "__main__":
    scrapeConstructorData()