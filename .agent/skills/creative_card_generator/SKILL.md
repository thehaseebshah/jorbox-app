---
name: Creative Card Generator
description: A skill for generating creative, culturally appropriate game cards for a Pakistani audience.
---

# Creative Card Generator

This skill helps generate content for game cards (prompts, questions, challenges) tailored for a Pakistani audience, specifically for the Jorbox App.

## 🎯 Audience & Cultural Context

1.  **Target Audience**: Pakistani (Desi).
    *   **Relatability**: Content should resonate with growing up in a Desi household, local trends, and common experiences in Pakistan.
    *   **Language**: Use simple English. Incorporate common Urdu words/Roman Urdu where it adds flavor (e.g., "Ammi", "Rishta", "Chai", "Jugaad"), but ensure it's readable.

2.  **Cultural Do's & Don'ts**:
    *   **DO**: Reference Cricket, Food (Biryani, Chai), Weddings, Traffic, Load Shedding, Desi Parents, School Life, Childhood Games (Ludo, Oonch Neech).
    *   **DON'T**: Use niche Western references (e.g., Baseball, American Football, Halloween specificities, obscure US TV shows, "Hot Dog" debates unless humorously contrasted).

3.  **🛡️ Halal & Family Friendly Policy (CRITICAL)**:
    *   **Strictly Prohibited**:
        *   Dating / Boyfriend-Girlfriend scenarios.
        *   Sexual references or innuendos.
        *   Alcohol or drug references.
        *   Gambling.
        *   Religiously offensive or controversial topics.
        *   Parties, dancing, or music-related content.
    *   **Goal**: The game should be safe to play with parents, elders, and children in the room without awkwardness.

## 🃏 Generation Guidelines

When requested to create cards:

1.  **Identify the Game Type**:
    *   *Herd Mentality / Aik Rangi Soch*: Questions with one obvious answer or a 50/50 split.
    *   *Charades / Taboo*: Words that are hard to guess or have specific forbidden words.
    *   *Trivia*: Facts about Pakistan, History, Geography, or General Knowledge common in the region.

2.  **Brainstorming Angles**:
    *   **The "Desi" Angle**: Instead of "sandwich", think "Bun Kebab". Instead of "Cookies", think "Biscuits/Zeera Plus".
    *   **The "Vibe"**: Chaotic, loud, opinionated, nostalgic.

3.  **Output Format**:
    *   Always match the CSV format of the target game.
    *   Common Format: `Name,Description,Category` (Description is often optional or used for hints).

## 💡 Examples

### Good (Culturally Fit)
*   **Question**: "What is the official national drink of Pakistan?" (Answer: Sugarcane Juice/Rooh Afza in spirit).
*   **Prompt**: "Name a sweet dish served at every wedding." (Kheer/Zarda).
*   **Debate**: "Biryani: With Cloud (Aloo) or Without?"
*   *Why*: Relatable, family-safe, specific to the region.

### Bad (Culturally Misfit)
*   **Question**: "What is the best topping for a pepperoni pizza?" (Pepperoni is often assumed non-halal/pork in western contexts, safer to say 'Chicken Tikka Pizza').
*   **Prompt**: "Who is your celebrity crush?" (Can get awkward in conservative family settings).
*   **Reference**: "Home Run", "Touchdown", "Prom Night". (Concepts not native to the local culture).
*   **Prohibited Content**: "Singing competitions", "concerts", "dance-offs", or "party planning". (Not Halal-compliant for this app).

## 🛠️ How to Use

When asking the agent to generate cards, specify:
1.  **Game Name**: (e.g., Aik Rangi Soch).
2.  **Topic/Theme**: (Optional, e.g., "Food", "Weddings").
3.  **Quantity**: How many cards needed.

**Example User Prompt**:
> "Use the Creative Card Generator skill to create 10 new cards for Aik Rangi Soch about Desi Parents."
