
import csv

INPUT_FILE = '/home/haseeb/dev/jorbox-app/public/data/game5.csv'

with open(INPUT_FILE, 'r', encoding='utf-8') as f:
    reader = csv.reader(f)
    print("Searching for first empty category...")
    for i, row in enumerate(reader):
        if i == 0: continue
        # Row should be [Desc, Cat]
        if len(row) >= 2 and row[1].strip() == "":
            print(f"Found first empty category at line {i+1}:")
            print(row)
            break
