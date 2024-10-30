"""
Notes:
"""

from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
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
    f.close()
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
    ####################
    #  VERSUS QUERIES  #
    ####################
    if "vs" in query:
        split_query = query.split("vs")
        left = split_query[0].strip()
        right = split_query[1].strip()

        return versus_q(left, right, query)
    
    ####################
    #   MOST QUERIES   #
    ####################
    elif "most" in query:
        if "team" in query or "constructor" in query:
            return team_most_q(query)
        else:
            return driver_most_q(query)
    
    
    
    return driver_team_q(query)  # This will almost always be the last thing that gets checked. 
    
        
    return [{"result": "The following query was not accepted: " + query}]
    
        
    
def versus_q(left, right, query):
        
    ####################
    # DRIVER VS DRIVER #
    ####################
    driver1 = left
    driver2 = right
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
            if driver['name'].lower() == driver1.lower():
                driver1_exists = True
                driver1_stats = driver
            if driver['name'].lower() == driver2.lower():
                driver2_exists = True
                driver2_stats = driver
            if driver1_exists and driver2_exists:
                break
    
    # Check F3 last.
    if not driver1_exists or not driver2_exists:
        if (driver1_exists and not driver2_exists) or (not driver1_exists and driver2_exists):
            return [{"result": "The Search Engine does not support comparisons between drivers from different series."}]
        for driver in f3_drivers: 
            if driver['name'].lower() == driver1.lower():
                driver1_exists = True
                driver1_stats = driver
            if driver['name'].lower() == driver2.lower():
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

def driver_most_q(query):
    # check the query to see if the series is specified. 
    series = "F1"
    if "F2" in query or "f2" in query or "Formula 2" in query or "formula 2" in query or "Formula Two" in query or "formula two" in query: 
        series = "F2"
    if "F3" in query or "f3" in query or "Formula 3" in query or "formula 3" in query or "Formula Three" in query or "formula three" in query:
        series = "F3"

    # determine which stat the user is asking for.
    stat = ""
    if "wins" in query or "Wins" in query or "victories" in query or "Victories" in query:
        stat = "wins"
    elif "poles" in query or "Poles" in query or "pole positions" in query or "Pole Positions" in query:
        stat = "poles"
    elif "points" in query or "Points" in query or "point" in query:
        stat = "points"
    elif "championships" in query or "Championships" in query:
        stat = "championships"
    else:
        return [{"result": "The following query was not accepted, we could not determine the stat you were looking for: " + query}]
    
    
    if series == "F1":
        if stat == "wins":
            max_wins = 0
            max_wins_driver = None
            for driver in f1_drivers:
                if int(driver['wins']) > max_wins:
                    max_wins = int(driver['wins'])
                    max_wins_driver = driver
            return [{"result": "The driver with the most wins in F1 is " + str(max_wins_driver['name']) + " with " + str(max_wins) + " wins."}]
        elif stat == "poles":
            max_poles = 0
            max_poles_driver = None
            for driver in f1_drivers:
                if int(driver['poles']) > max_poles:
                    max_poles = int(driver['poles'])
                    max_poles_driver = driver
            return [{"result": "The driver with the most poles in F1 is " + str(max_poles_driver['name']) + " with " + str(max_poles) + " poles."}]
        elif stat == "points":
            max_points = 0
            max_points_driver = None
            for driver in f1_drivers:
                if int(driver['points']) > max_points:
                    max_points = int(driver['points'])
                    max_points_driver = driver
            return [{"result": "The driver with the most points in F1 is " + str(max_points_driver['name']) + " with " + str(max_points) + " points."}]
        elif stat == "championships":
            max_championships = 0
            max_championships_driver = None
            for driver in f1_drivers:
                if int(driver['championships']) > max_championships:
                    max_championships = int(driver['championships'])
                    max_championships_driver = driver
            return [{"result": "The driver with the most championships in F1 is " + str(max_championships_driver['name']) + " with " + str(max_championships) + " championships."}]
        else:
            return [{"result": "The following query was not accepted, we could not determine the stat you were looking for: " + query}]
            
    elif series == "F2":
        if stat == "wins":
            max_wins = 0
            max_wins_driver = None
            for driver in f2_drivers:
                if int(driver['wins']) > max_wins:
                    max_wins = int(driver['wins'])
                    max_wins_driver = driver
            return [{"result": "The driver with the most wins in F2 is " + str(max_wins_driver['name']) + " with " + str(max_wins) + " wins."}]
        elif stat == "poles":
            max_poles = 0
            max_poles_driver = None
            for driver in f2_drivers:
                if int(driver['poles']) > max_poles:
                    max_poles = int(driver['poles'])
                    max_poles_driver = driver
            return [{"result": "The driver with the most poles in F2 is " + str(max_poles_driver['name']) + " with " + str(max_poles) + " poles."}]
        elif stat == "points":
            max_points = 0
            max_points_driver = None
            for driver in f2_drivers:
                if int(driver['points']) > max_points:
                    max_points = int(driver['points'])
                    max_points_driver = driver
            return [{"result": "The driver with the most points in F2 is " + str(max_points_driver['name']) + " with " + str(max_points) + " points."}]
        elif stat == "championships":
            max_championships = 0
            max_championships_driver = None
            for driver in f2_drivers:
                if int(driver['championships']) > max_championships:
                    max_championships = int(driver['championships'])
                    max_championships_driver = driver
            return [{"result": "The driver with the most championships in F2 is " + str(max_championships_driver['name']) + " with " + str(max_championships) + " championships."}]
        else:
            return [{"result": "The following query was not accepted, we could not determine the stat you were looking for: " + query}]
        
    elif series == "F3":
        if stat == "wins":
            max_wins = 0
            max_wins_driver = None
            for driver in f3_drivers:
                if int(driver['wins']) > max_wins:
                    max_wins = int(driver['wins'])
                    max_wins_driver = driver
            return [{"result": "The driver with the most wins in F3 is " + str(max_wins_driver['name']) + " with " + str(max_wins) + " wins."}]
        elif stat == "poles":
            max_poles = 0
            max_poles_driver = None
            for driver in f3_drivers:
                if int(driver['poles']) > max_poles:
                    max_poles = int(driver['poles'])
                    max_poles_driver = driver
            return [{"result": "The driver with the most poles in F3 is " + str(max_poles_driver['name']) + " with " + str(max_poles) + " poles."}]
        elif stat == "points":
            max_points = 0
            max_points_driver = None
            for driver in f3_drivers:
                if int(driver['points']) > max_points:
                    max_points = int(driver['points'])
                    max_points_driver = driver
            return [{"result": "The driver with the most points in F3 is " + str(max_points_driver['name']) + " with " + str(max_points) + " points."}]
        elif stat == "championships":
            max_championships = 0
            max_championships_driver = None
            for driver in f3_drivers:
                if int(driver['championships']) > max_championships:
                    max_championships = int(driver['championships'])
                    max_championships_driver = driver
            return [{"result": "The driver with the most championships in F3 is " + str(max_championships_driver['name']) + " with " + str(max_championships) + " championships."}]
        else:
            return [{"result": "The following query was not accepted, we could not determine the stat you were looking for: " + query}]

def team_most_q(query):
    series = "F1"
    if "F2" in query or "f2" in query or "Formula 2" in query or "formula 2" in query or "Formula Two" in query or "formula two" in query: 
        series = "F2"
    if "F3" in query or "f3" in query or "Formula 3" in query or "formula 3" in query or "Formula Three" in query or "formula three" in query:
        series = "F3"
    
    if "wins" in query or "Wins" in query or "victories" in query or "Victories" in query:
        stat = "wins"
    elif "poles" in query or "Poles" in query or "pole positions" in query or "Pole Positions" in query:
        stat = "poles"
    elif "points" in query or "Points" in query or "point" in query:
        stat = "points"
    elif "championships" in query or "Championships" in query:
        stat = "championships"
    else:
        return [{"result": "The following query was not accepted, we could not determine the stat you were looking for: " + query}]
    
    if series == "F1":
        if stat == "wins":
            max_wins = 0
            max_wins_team = None
            for team in f1_teams:
                if int(team['wins']) > max_wins:
                    max_wins = int(team['wins'])
                    max_wins_team = team
            return [{"result": "The team with the most wins in F1 is " + str(max_wins_team['name']) + " with " + str(max_wins) + " wins."}]
        elif stat == "poles":
            max_poles = 0
            max_poles_team = None
            for team in f1_teams:
                if int(team['poles']) > max_poles:
                    max_poles = int(team['poles'])
                    max_poles_team = team
            return [{"result": "The team with the most poles in F1 is " + str(max_poles_team['name']) + " with " + str(max_poles) + " poles."}]
        elif stat == "points":
            max_points = 0
            max_points_team = None
            for team in f1_teams:
                if int(team['points']) > max_points:
                    max_points = int(team['points'])
                    max_points_team = team
            return [{"result": "The team with the most points in F1 is " + str(max_points_team['name']) + " with " + str(max_points) + " points."}]
        elif stat == "championships":
            max_championships = 0
            max_championships_team = None
            for team in f1_teams:
                if int(team['championships']) > max_championships:
                    max_championships = int(team['championships'])
                    max_championships_team = team
            return [{"result": "The team with the most championships in F1 is " + str(max_championships_team['name']) + " with " + str(max_championships) + " championships."}]
        else:
            return [{"result": "The following query was not accepted, we could not determine the stat you were looking for: " + query}]
    
    if series == "F2":
        if stat == "wins":
            max_wins = 0
            max_wins_team = None
            for team in f2_teams:
                if int(team['wins']) > max_wins:
                    max_wins = int(team['wins'])
                    max_wins_team = team
            return [{"result": "The team with the most wins in F2 is " + str(max_wins_team['name']) + " with " + str(max_wins) + " wins."}]
        elif stat == "poles":
            max_poles = 0
            max_poles_team = None
            for team in f2_teams:
                if int(team['poles']) > max_poles:
                    max_poles = int(team['poles'])
                    max_poles_team = team
            return [{"result": "The team with the most poles in F2 is " + str(max_poles_team['name']) + " with " + str(max_poles) + " poles."}]
        elif stat == "points":
            max_points = 0
            max_points_team = None
            for team in f2_teams:
                if int(team['points']) > max_points:
                    max_points = int(team['points'])
                    max_points_team = team
            return [{"result": "The team with the most points in F2 is " + str(max_points_team['name']) + " with " + str(max_points) + " points."}]
        elif stat == "championships":
            max_championships = 0
            max_championships_team = None
            for team in f2_teams:
                if int(team['championships']) > max_championships:
                    max_championships = int(team['championships'])
                    max_championships_team = team
            return [{"result": "The team with the most championships in F2 is " + str(max_championships_team['name']) + " with " + str(max_championships) + " championships."}]
        else:
            return [{"result": "The following query was not accepted, we could not determine the stat you were looking for: " + query}]
        
    if series == "F3":
        if stat == "wins":
            max_wins = 0
            max_wins_team = None
            for team in f3_teams:
                if int(team['wins']) > max_wins:
                    max_wins = int(team['wins'])
                    max_wins_team = team
            return [{"result": "The team with the most wins in F3 is " + str(max_wins_team['name']) + " with " + str(max_wins) + " wins."}]
        elif stat == "poles":
            max_poles = 0
            max_poles_team = None
            for team in f3_teams:
                if int(team['poles']) > max_poles:
                    max_poles = int(team['poles'])
                    max_poles_team = team
            return [{"result": "The team with the most poles in F3 is " + str(max_poles_team['name']) + " with " + str(max_poles) + " poles."}]
        elif stat == "points":
            max_points = 0
            max_points_team = None
            for team in f3_teams:
                if int(team['points']) > max_points:
                    max_points = int(team['points'])
                    max_points_team = team
            return [{"result": "The team with the most points in F3 is " + str(max_points_team['name']) + " with " + str(max_points) + " points."}]
        elif stat == "championships":
            max_championships = 0
            max_championships_team = None
            for team in f3_teams:
                if int(team['championships']) > max_championships:
                    max_championships = int(team['championships'])
                    max_championships_team = team
            return [{"result": "The team with the most championships in F3 is " + str(max_championships_team['name']) + " with " + str(max_championships) + " championships."}]
        else:
            return [{"result": "The following query was not accepted, we could not determine the stat you were looking for: " + query}]
    
def driver_team_q(query):
    for driver in f1_drivers:
        if query.lower() == driver['name'].lower():
            return [{"result": str(driver)}]
    for team in f1_teams:
        if query.lower() == team['name'].lower():
            return [{"result": str(team)}]
    for driver in f2_drivers:
        if query.lower() == driver['name'].lower():
            return [{"result": str(driver)}]
    for team in f2_teams:
        if query.lower() == team['name'].lower():
            return [{"result": str(team)}]
    for driver in f3_drivers:
        if query.lower() == driver['name'].lower():
            return [{"result": str(driver)}]
    for team in f3_teams:
        if query.lower() == team['name'].lower():
            return [{"result": str(team)}]


@app.route('/search', methods=['GET'])
def search():
    query = request.args.get('query')
    return jsonify(query_handler(query))

if __name__ == '__main__':
    load_data()
    app.run(debug=True)