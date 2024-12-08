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


####
## Implementation of Examples (not the actual working ones just reference)
####
    # get startDate and endDate with request
def storeDate(startDate: str, endDate: str) -> None:
    startHour, startMinute = startDate.split(':')
    endHour, endMinute = endDate.split(':')
    ...
    # store startHour, startMinute, endHour, endMinute # in dataBase.

def getAllDates() -> str:
    
    dates = []

    database = ... # database connection and querry
    for entry in database:
        # Form each date
        startDate = entry.startHour + ":" + entry.startMinute
        endDate = entry.endHour + ":" + entry.endMinute
        # Store each date in dates list
        dates.append([startDate, endDate])
    
    # return dates to request
    return dates


