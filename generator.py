import requests
x = requests.get('https://orar.usv.ro/orar/vizualizare/data/cadre.php?json')
data = x.json()
id = 0
file = open("date.out", 'w')

items = []
for item in data:
    print(f'<div id="option-{id}" class="option ">{item["firstName"]} {item["lastName"]}</div>')
    #print(f'\{ id: 1, nume: "{item["firstName"]} {item["lastName"]}"\}')
    id = id+1