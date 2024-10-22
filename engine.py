"""
Notes:
"""

from flask import Flask, request, jsonify
from flask_cors import CORS
import json
import os

app = Flask(__name__)
CORS(app)

f1_drivers = []
f1_teams = []
f2_drivers = []
f2_teams = []
f3_drivers = []
f3_teams = []

def load_data():
    global f1_drivers, f1_teams, f2_drivers, f2_teams, f3_drivers, f3_teams

    with open('./driver_stats/f1_drivers.json') as f:
        f1_drivers = json.load(f)
    with open('./constructor_stats/f1_constructors.json') as f:
        f1_teams = json.load(f)
    with open('./driver_stats/f2_drivers.json') as f:
        f2_drivers = json.load(f)
    with open('./constructor_stats/f2_constructors.json') as f:
        f2_teams = json.load(f)
    with open('./driver_stats/f3_drivers.json') as f:
        f3_drivers = json.load(f)
    with open('./constructor_stats/f3_constructors.json') as f:
        f3_teams = json.load(f)

def query_handler(query):	
    ###############################################
    #                                             #
    #               VERSUS QUERIES                #
    #                                             #
    ###############################################

    if "vs" in query:
        split_query = query.split("vs")
        driver1 = split_query[0].strip()
        driver2 = split_query[1].strip()

        ####################
        # DRIVER VS DRIVER #
        ####################
        driver1_exists = False
        driver2_exists = False
        driver1_stats = None
        driver2_stats = None

        # Check F1 first.
        for driver in f1_drivers: 
            if driver['name'].lower() == driver1.lower():
                driver1_exists = True
                driver1_stats = driver
            if driver['name'].lower() == driver2.lower():
                driver2_exists = True
                driver2_stats = driver
            if driver1_exists and driver2_exists:
                break
        
        # Check F2 next.
        if not driver1_exists or not driver2_exists:
            if (driver1_exists and not driver2_exists) or (not driver1_exists and driver2_exists):
                return [{"result": "The Search Engine does not support comparisons between drivers from different series."}]
            for driver in f2_drivers: 
                if driver['name'].lower == driver1:
                    driver1_exists = True
                    driver1_stats = driver
                if driver['name'].lower == driver2:
                    driver2_exists = True
                    driver2_stats = driver
                if driver1_exists and driver2_exists:
                    break
        
        # Check F3 last.
        if not driver1_exists or not driver2_exists:
            if (driver1_exists and not driver2_exists) or (not driver1_exists and driver2_exists):
                return [{"result": "The Search Engine does not support comparisons between drivers from different series."}]
            for driver in f3_drivers: 
                if driver['name'] == driver1:
                    driver1_exists = True
                    driver1_stats = driver
                if driver['name'] == driver2:
                    driver2_exists = True
                    driver2_stats = driver
                if driver1_exists and driver2_exists:
                    break
                
        if driver1_exists and driver2_exists:
            return [{"result": str(driver1_stats) + " vs " + str(driver2_stats)}]
        else:

            ####################
            #   TEAM VS TEAM   #
            ####################
            print("TEAM VERSUS TEAM QUERY")
            team1 = driver1.upper()
            team2 = driver2.upper()
            print("team1: " + team1)
            print("team2: " + team2)
            team1_exists = False
            team2_exists = False
            team1_stats = None
            team2_stats = None

            # Check F1 first.
            for team in f1_teams:
                if team['name'] == team1:
                    team1_exists = True
                    team1_stats = team
                if team['name'] == team2:
                    team2_exists = True
                    team2_stats = team
                if team1_exists and team2_exists:
                    break
            # Check F2 next.
            if not team1_exists or not team2_exists:
                if (team1_exists and not team2_exists) or (not team1_exists and team2_exists):
                    return [{"result": "The Search Engine does not support comparisons between teams from different series."}]
                for team in f2_teams:
                    if team['name'] == team1:
                        team1_exists = True
                        team1_stats = team
                    if team['name'] == team2:
                        team2_exists = True
                        team2_stats = team
                    if team1_exists and team2_exists:
                        break
            # Check F3 last. 
            if not team1_exists or not team2_exists:
                if (team1_exists and not team2_exists) or (not team1_exists and team2_exists):
                    return [{"result": "The Search Engine does not support comparisons between teams from different series."}]
                for team in f3_teams:
                    if team['name'] == team1:
                        team1_exists = True
                        team1_stats = team
                    if team['name'] == team2:
                        team2_exists = True
                        team2_stats = team
                    if team1_exists and team2_exists:
                        break

            if team1_exists and team2_exists:
                return [{"result": str(team1_stats) + " vs " + str(team2_stats)}]                         
        
        
    return [{"result": "The following query was not accepted: " + query}]

@app.route('/search')
def search():
    query = request.args.get('query')
    return jsonify(query_handler(query))

if __name__ == '__main__':
    load_data()
    app.run(debug=True)