
import re
import csv
import os

def convert_md_to_csv(md_path, csv_path):
    with open(md_path, 'r', encoding='utf-8') as f:
        lines = f.readlines()

    csv_data = []
    current_category = None
    
    # Regex for category header: ## Number. Name
    category_pattern = re.compile(r'^##\s+\d+\.\s+(.+)$')
    # Regex for item: Number. Content
    item_pattern = re.compile(r'^\d+\.\s+(.+)$')
    # Regex for trailing parens: (Content) at end of string
    parens_pattern = re.compile(r'\s*\(([^)]+)\)$')

    item_index = 0

    for line in lines:
        line = line.strip()
        if not line:
            continue

        cat_match = category_pattern.match(line)
        if cat_match:
            current_category = cat_match.group(1).strip()
            item_index = 0
            continue

        item_match = item_pattern.match(line)
        if item_match and current_category:
            item_index += 1
            content = item_match.group(1).strip()
            
            # Check for description in parens
            paren_match = parens_pattern.search(content)
            if paren_match:
                description = paren_match.group(1).strip()
                title = content[:paren_match.start()].strip()
            else:
                description = str(item_index)
                title = content

            csv_data.append([title, description, current_category])

    # Write to CSV
    os.makedirs(os.path.dirname(csv_path), exist_ok=True)
    with open(csv_path, 'w', newline='', encoding='utf-8') as f:
        writer = csv.writer(f)
        writer.writerow(['Title', 'Description', 'Category'])
        writer.writerows(csv_data)

    print(f"Converted {len(csv_data)} items to {csv_path}")

if __name__ == "__main__":
    convert_md_to_csv('tareekhi_lists.md', 'public/data/game15.csv')
