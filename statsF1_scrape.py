"""
Name: Luke Davis

Resources:
https://www.selenium.dev/documentation/webdriver/elements/locators/


"""


from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager

import time

def main():
    options = Options()
    # Path to the Chrome binary (if needed)
    # Example options
    #options.add_argument('--headless')

    # Initialize WebDriver with service and options
    driver = webdriver.Chrome(options=options)

    driver.get("https://www.statsf1.com/en/default.aspx")
    time.sleep(3)       # Sleep to let the page load

    # Get the link to the statistics page. 
    statsLink = driver.find_element(By.ID, "ctl00_HL_StatsH").get_attribute("href")
    driver.get(statsLink)
    time.sleep(3)

    # Click the link to the Wins by number page. 
    driver.find_elements(By.LINK_TEXT, "By number")[1].click()

    # Get the table element then start looping through it. 
    table = driver.find_element(By.ID, "ctl00_CPH_Main_GV_Stats")
    results = []
    for row in table.find_elements(By.CSS_SELECTOR, "tr")[1:-1]:
        # Get the championship #, date, year, and driver.
        n = row.find_element(By.CSS_SELECTOR, "td:nth-child(1)").text
        driver = row.find_element(By.CSS_SELECTOR, "td:nth-child(2)").text
        no_wins = row.find_element(By.CSS_SELECTOR, "td:nth-child(3)").text
        win_percentage = row.find_element(By.CSS_SELECTOR, "td:nth-child(4)").text

        # Click the driver's page and get the number of poles.
        row.find_element(By.CLASS_NAME, "CurChpDriver").click()
        # Change this to use an xpath selector. 
        poles = driver.find_element(By.ID, "ctl00_CPH_Main_HL_StatsPole").text.replace(" pole positions", "")

        with open("results.jl", "a") as f:
            f.write ({"position": n, "driver": driver, "no_wins": no_wins, "win%": win_percentage,
                        "poles" : poles})
            
    """ 
    TODO
      Get table of race winners
        Name, Number of wins, win percentage, Has won a championship?, etc.

    """


if __name__ == "__main__":
    main()

    
        





