#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read game1.csv
const game1Path = path.join(__dirname, 'public', 'data', 'game1.csv');
const game1Content = fs.readFileSync(game1Path, 'utf-8');
const lines = game1Content.trim().split('\n');

// Function to generate 4 banned words for a given word and category
function generateBannedWords(name, category) {
    const words = [];

    // Add the category as first banned word (if it's not the same as the name)
    if (category && category !== name) {
        words.push(category.split(' ')[0]); // First word of category
    }

    // Add parts of the name itself
    const nameParts = name.split(' ').filter(p => p.length > 2);
    words.push(...nameParts.slice(0, 2));

    // Add related words based on category
    const categoryRelated = {
        'Pakistani Cities': ['city', 'Pakistan', 'place', 'town'],
        'Traditional Dishes': ['food', 'dish', 'eat', 'cook'],
        'Spices': ['spice', 'flavor', 'cooking', 'ingredient'],
        'Fruits': ['fruit', 'sweet', 'eat', 'tree'],
        'Vegetables': ['vegetable', 'green', 'eat', 'plant'],
        'Clothing': ['wear', 'cloth', 'dress', 'garment'],
        'Furniture': ['furniture', 'house', 'sit', 'room'],
        'Kitchen Items': ['kitchen', 'cook', 'utensil', 'tool'],
        'Animals': ['animal', 'creature', 'wild', 'pet'],
        'Birds': ['bird', 'fly', 'feather', 'wing'],
        'Sports': ['sport', 'game', 'play', 'team'],
        'Historical Places': ['place', 'historic', 'monument', 'building'],
        'Occupations': ['job', 'work', 'profession', 'career'],
        'Transport': ['vehicle', 'transport', 'ride', 'travel'],
        'Stationery': ['stationery', 'write', 'school', 'office'],
        'Colors': ['color', 'shade', 'hue', 'paint'],
        'Body Parts': ['body', 'part', 'human', 'anatomy'],
        'Jewelry': ['jewelry', 'gold', 'wear', 'ornament'],
        'Nature': ['nature', 'natural', 'earth', 'environment'],
        'Electronics': ['electronic', 'device', 'machine', 'gadget'],
        'Tools': ['tool', 'work', 'fix', 'build'],
        'Fabrics': ['fabric', 'cloth', 'material', 'textile'],
        'Beverages': ['drink', 'beverage', 'liquid', 'sip'],
        'Desserts': ['sweet', 'dessert', 'sugar', 'treat'],
        'Family Relations': ['family', 'relative', 'relation', 'kin'],
        'Sahaba': ['companion', 'Prophet', 'Islam', 'Muslim'],
        'Prophets': ['prophet', 'messenger', 'Allah', 'Islam'],
        'Islamic Terms': ['Islam', 'Muslim', 'religion', 'faith'],
        'Islamic Locations': ['place', 'Islam', 'holy', 'mosque'],
        'Muslim Historical Figures': ['Muslim', 'scholar', 'leader', 'Islamic']
    };

    const related = categoryRelated[category] || ['word', 'thing', 'item', 'object'];

    // Fill up to 4 words
    while (words.length < 4) {
        const nextWord = related[words.length % related.length];
        if (!words.includes(nextWord)) {
            words.push(nextWord);
        } else {
            words.push(related[(words.length + 1) % related.length]);
        }
    }

    return words.slice(0, 4).join(', ');
}

// Process lines
const output = [lines[0]]; // Keep header

for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;

    // Parse CSV line (simple parser, assumes no commas in fields)
    const parts = line.split(',');
    if (parts.length >= 3) {
        const name = parts[0];
        const category = parts[2];
        const bannedWords = generateBannedWords(name, category);
        output.push(`${name},${bannedWords},${category}`);
    }
}

// Write game2.csv
const game2Path = path.join(__dirname, 'public', 'data', 'game2.csv');
fs.writeFileSync(game2Path, output.join('\n') + '\n');

console.log(`Generated ${output.length - 1} entries for game2.csv`);
