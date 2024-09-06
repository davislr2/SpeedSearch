from selenium import webdriver
from selenium.webdriver.common.by import By
import time
import json
import os

def scrapeDriverData():
    options = webdriver.ChromeOptions()
    options.add_argument("--headless")  # Run Chrome in headless mode
    driver = webdriver.Chrome(options=options)
    #driver.get("https://motorsportstats.com/series/fia-formula-3-championship/standings/2024") # F3
    #driver.get("https://motorsportstats.com/series/fia-formula-2-championship/standings/2024") # F2
    driver.get("https://motorsportstats.com/series/fia-formula-one-world-championship/standings/2024") # F1
    time.sleep(4)  # Sleep to let the page load

    while True:
        # Locate the table again after each navigation
        table = driver.find_element(By.CSS_SELECTOR, "table")
        rows = table.find_elements(By.TAG_NAME, "tr")

        for i in range(1, len(rows)):
            # Refresh row elements after each navigation
            rows = driver.find_elements(By.TAG_NAME, "tr")
            cell = rows[i].find_elements(By.TAG_NAME, "td")[1]
            driver_link = cell.find_element(By.TAG_NAME, "a")
            driver_name = driver_link.text
            driver_link.click()
            time.sleep(4)
            # Get driver wins
            wins_value_element = driver.find_element(By.XPATH, "//div[text()='Wins']/following-sibling::div[contains(@class, 'styled__CareerStatisticsItemValue')]")
            wins_value = wins_value_element.text
            
            # Get driver poles
            poles_value_element = driver.find_element(By.XPATH, "//div[text()='Poles']/following-sibling::div[contains(@class, 'styled__CareerStatisticsItemValue')]")
            poles_value = poles_value_element.text

            # Get driver points
            points_value_element = driver.find_element(By.XPATH, "//div[text()='Points']/following-sibling::div[contains(@class, 'styled__CareerStatisticsItemValue')]")
            points_value = points_value_element.text

            # Get number of championships
            no_championships_element = driver.find_element(By.XPATH, "//div[text()='Championships']/preceding-sibling::div[contains(@class, 'styled__ValueContainer')]//div[contains(@class, 'styled__ValueNumber')]")
            no_championships = no_championships_element.text

            # Get start year and last year.
            summary_table = driver.find_element(By.CSS_SELECTOR, "table")
            summary_rows = summary_table.find_elements(By.TAG_NAME, "tr")
            last_year = summary_rows[1].find_elements(By.TAG_NAME, "td")[0].text
            start_year = summary_rows[len(summary_rows) - 2].find_elements(By.TAG_NAME, "td")[0].text

            # Get best championship finish. 
            best_championship_finish_element = driver.find_element(By.XPATH, "//div[text()='Best Championship position']/following-sibling::div[contains(@class, 'styled__CareerStatisticsItemValue')]")
            best_championship_finish = best_championship_finish_element.text

            print(driver_name)
            print("wins: " + wins_value)
            print("poles: " + poles_value)
            print("points: " + points_value)
            print("championships: " + no_championships)
            print("start year: " + start_year)
            print("last year: " + last_year)
            print("best championship finish: " + best_championship_finish)

            driver_data = {
                "name": driver_name,
                "wins": wins_value,
                "poles": poles_value,
                "points": points_value,
                "championships": no_championships,
                "start_year": start_year,
                "last_year": last_year,
                "best_championship_finish": best_championship_finish
            }

            update_json_file(driver_data, 'f1_drivers.json')

            driver.back()  # Navigate back to the standings table
            time.sleep(4)

        break

    driver.quit()

def update_json_file(driver_data, filename):
    # Check if file exists, if not, create a new one with an empty list
    if not os.path.exists(filename):
        with open(filename, 'w') as f:
            json.dump([], f)
    
    # Try to read the existing data from the JSON file
    try:
        with open(filename, 'r') as f:
            data = json.load(f)  # Load the existing data
    except (json.JSONDecodeError, FileNotFoundError):
        # If the file is empty or corrupted, start with an empty list
        data = []

    # Append the new driver data
    data.append(driver_data)
    
    # Write the updated data back to the JSON file
    with open(filename, 'w') as f:
        json.dump(data, f, indent=4)

# Call the function
scrapeDriverData()
