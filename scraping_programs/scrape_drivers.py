from selenium import webdriver
from selenium.webdriver.common.by import By
import time
import json
import os
from unidecode import unidecode

def scrapeDriverData():
    options = webdriver.ChromeOptions()
    options.add_argument("--headless")  # Run Chrome in headless mode
    f1_year_range = range(1950, 2021)
    f2_year_range = range(2017, 2025)
    f3_year_range = range(2019, 2025)

    for year in reversed(f2_year_range):
        #link_text = "https://motorsportstats.com/series/fia-formula-one-world-championship/standings/" + str(year)
        #link_text = "https://motorsportstats.com/series/fia-formula-3-championship/standings/" + str(year) # F3
        link_text = "https://motorsportstats.com/series/fia-formula-2-championship/standings/" + str(year) # F2
        driver = webdriver.Chrome(options=options)
        driver.get(link_text)
        time.sleep(8)  # Sleep to let the page load

        while True:
            # Locate the table again after each navigation
            table = driver.find_element(By.CSS_SELECTOR, "table")
            rows = table.find_elements(By.TAG_NAME, "tr")

           
            for i in range(1, len(rows)):                                           # For each driver in the standings table:
                # Refresh row elements after each navigation
                row = driver.find_elements(By.TAG_NAME, "tr")
                cell = row[i].find_elements(By.TAG_NAME, "td")[1]
                if cell.text == "":                                                 # Skip empty cells
                    continue
                driver_link = cell.find_element(By.TAG_NAME, "a")                   # Find the driver's link
                driver_name = driver_link.text                                      # Get the driver's name from the link's text
                driver_name = unidecode(driver_name)                                # Remove accents from the driver's name

                with open('f3_drivers.json', 'r') as file:                          # Make sure the driver's name isn't in the json file already.
                    if os.stat('f1_drivers.json').st_size == 0:
                        f1_drivers = []
                    else:
                        f1_drivers = json.load(file)
                if driver_exists(driver_name, f1_drivers):                          # If the driver is already in the json file, skip them.
                    continue            

                driver_link.click()                                                 # Click the driver's link
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
                best_championship_position_element = driver.find_element(By.XPATH, "//div[text()='Best Championship position']/following-sibling::div[contains(@class, 'styled__CareerStatisticsItemValue')]")
                best_championship_position = best_championship_position_element.text

                print(driver_name)
                print("wins: " + wins_value)
                print("poles: " + poles_value)
                print("points: " + points_value)
                print("championships: " + no_championships)
                print("start year: " + start_year)
                print("last year: " + last_year)
                print("best championship position: " + best_championship_position)

                driver_data = {
                    "name": driver_name,
                    "wins": wins_value,
                    "poles": poles_value,
                    "points": points_value,
                    "championships": no_championships,
                    "start_year": start_year,
                    "last_year": last_year,
                    "best_championship_position": best_championship_position
                }

                update_json_file(driver_data, 'f2_drivers.json')

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

# Helper method to determine if a driver already exists in the JSON file
def driver_exists(driver_name, drivers):
    for driver in drivers:
        if driver['name'] == driver_name:
            return True
    return False


# Call the function
if __name__ == "__main__":
    scrapeDriverData()
