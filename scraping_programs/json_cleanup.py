import json
from unidecode import unidecode
def cleanup_gp():
    # Load the JSON file
    with open('grand_prix_stats/f1_grand_prix.json', 'r', encoding='utf-8') as file:
        data = json.load(file)

    # Iterate through each year and race to apply unidecode to the circuit name
    for year, races in data.items():
        for race_name, race_details in races.items():
            if 'circuit' in race_details:
                # Apply unidecode to the circuit name
                original_circuit = race_details['circuit']
                race_details['circuit'] = unidecode(original_circuit)

    # Save the updated JSON back to the file
    with open('grand_prix_stats/f1_grand_prix.json', 'w', encoding='utf-8') as file:
        json.dump(data, file, indent=4, ensure_ascii=False)



if __name__ == "__main__":
    cleanup_gp()