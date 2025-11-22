#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import Papa from 'papaparse';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read game1.csv using proper CSV parser
const game1Path = path.join(__dirname, 'public', 'data', 'game1.csv');
const game1Content = fs.readFileSync(game1Path, 'utf-8');

// Parse CSV properly
const parsed = Papa.parse(game1Content, {
    header: true,
    skipEmptyLines: true
});

// Function to generate 4 banned words for a given word and category
function generateBannedWords(name, category) {
    const bannedWords = [];

    // Split the name into parts
    const nameParts = name.split(/[\s-]+/).filter(p => p.length > 2);

    // Add significant parts of the name (but not all)
    if (nameParts.length > 1) {
        bannedWords.push(nameParts[0]);
    }

    // Add category-specific banned words
    const categoryBanned = {
        'Pakistani Cities': ['city', 'Pakistan', 'Sindh', 'Punjab'],
        'Traditional Dishes': ['food', 'rice', 'meat', 'curry'],
        'Spices': ['spice', 'powder', 'flavor', 'cooking'],
        'Fruits': ['fruit', 'sweet', 'juice', 'tree'],
        'Vegetables': ['vegetable', 'green', 'salad', 'cook'],
        'Clothing': ['wear', 'dress', 'traditional', 'cloth'],
        'Furniture': ['furniture', 'wood', 'sit', 'home'],
        'Kitchen Items': ['kitchen', 'cook', 'metal', 'utensil'],
        'Animals': ['animal', 'wild', 'mammal', 'zoo'],
        'Birds': ['bird', 'fly', 'feather', 'nest'],
        'Sports': ['sport', 'game', 'ball', 'player'],
        'Historical Places': ['historic', 'old', 'monument', 'ancient'],
        'Occupations': ['job', 'work', 'professional', 'career'],
        'Transport': ['vehicle', 'ride', 'wheels', 'travel'],
        'Stationery': ['paper', 'write', 'school', 'office'],
        'Colors': ['color', 'paint', 'bright', 'shade'],
        'Body Parts': ['body', 'human', 'anatomy', 'organ'],
        'Jewelry': ['gold', 'wear', 'shiny', 'precious'],
        'Nature': ['natural', 'outdoor', 'earth', 'sky'],
        'Electronics': ['electric', 'device', 'screen', 'battery'],
        'Tools': ['tool', 'metal', 'work', 'fix'],
        'Fabrics': ['cloth', 'material', 'soft', 'weave'],
        'Beverages': ['drink', 'liquid', 'cup', 'hot'],
        'Desserts': ['sweet', 'sugar', 'eat', 'delicious'],
        'Family Relations': ['family', 'relative', 'blood', 'relation'],
        'Sahaba': ['companion', 'Prophet', 'Caliph', 'Muslim'],
        'Prophets': ['prophet', 'messenger', 'Allah', 'revelation'],
        'Islamic Terms': ['Islam', 'Muslim', 'Arabic', 'religious'],
        'Islamic Locations': ['mosque', 'holy', 'Mecca', 'pilgrimage'],
        'Muslim Historical Figures': ['scholar', 'Islamic', 'famous', 'history']
    };

    const catWords = categoryBanned[category] || ['thing', 'object', 'item', 'word'];

    // Add category words
    for (let i = 0; i < catWords.length && bannedWords.length < 4; i++) {
        if (!bannedWords.includes(catWords[i]) && !name.toLowerCase().includes(catWords[i].toLowerCase())) {
            bannedWords.push(catWords[i]);
        }
    }

    // Fill remaining with generic words if needed
    const fillers = ['similar', 'related', 'like', 'same', 'type'];
    for (let i = 0; bannedWords.length < 4; i++) {
        if (!bannedWords.includes(fillers[i % fillers.length])) {
            bannedWords.push(fillers[i % fillers.length]);
        }
    }

    // Use pipe separator instead of comma to avoid CSV parsing issues
    return bannedWords.slice(0, 4).join(' | ');
}

// Create new data with banned words
const newData = parsed.data.map(row => ({
    Name: row.Name,
    Description: generateBannedWords(row.Name, row.Category),
    Category: row.Category
}));

// Convert back to CSV
const csv = Papa.unparse(newData);

// Write to game2.csv
const game2Path = path.join(__dirname, 'public', 'data', 'game2.csv');
fs.writeFileSync(game2Path, csv);

console.log(`Generated ${newData.length} entries for game2.csv with banned words (pipe-separated)`);
