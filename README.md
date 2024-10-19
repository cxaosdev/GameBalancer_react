# Game Balancer
## Team Match Balancer for League of Legends and Valorant
<div align=center>
  <img src="https://github.com/user-attachments/assets/c1f7cf12-523c-4581-ab0a-2e3a95b74f82" alt="GBlogo" height="150" />
  <img src="https://github.com/user-attachments/assets/ecd4bacb-06c1-4bd9-bdad-34fa12f65ad6" alt="Valorant" height="150" />
  <img src="https://github.com/user-attachments/assets/8c814e0e-3f97-4ed3-96a3-4a3161549520" alt="LeagueOfLegends" height="150" />
</div>

> 🕹️ A fair match generator for **League of Leagends** and **Valorant** that divides 10 players into two balanced teams based on their **tiers and points**.

<div align=center style="text-align: center; gap:20">
  <img src="https://github.com/user-attachments/assets/a1a17488-b867-498e-94ea-7d6d83930229" alt="SelectGame" width="800" />
</div>

## Features
- 🏅 **Player Tier Input**: Select each player's rank.
- ⚖️ **Fair Team Generation**: Automatically create two balanced teams based on player points.
- 📊 **Result**: Displays the generated teams and their total points in a modal.


***

## Project Structure
```
src
├── assets
├── components
│   ├── Footer.jsx
│   ├── Header.jsx
│   ├── logo.jpg
│   ├── OnBoarding.jsx
│   ├── PlayerLol.jsx
│   ├── PlayerVlrt.jsx
│   ├── ResultModal.jsx
│   ├── Spinner.jsx
│   ├── WarningModal.jsx
├── pages
│   ├── Home.jsx
│   ├── Lol.jsx
│   ├── Vlrt.jsx
├── styles
│   ├── constants.json
│   ├── index.css
│   ├── players.scss
│   ├── reset.scss
├── util
│   ├── teamGenerator.js
│   ├── tierPoints.js
├── App.jsx
├── index.js
```
---

## Algorithm for Team Generation

- The **tiers are mapped to points** as follows:
  - Valorant
  ```
  Iron: 7, Bronze: 13, Silver: 17, Gold: 25, Platinum: 29, Diamond: 37, Ascendant: 43, Immortal: 45, Radiant: 48
  ```
  - League of Legends
  ```
  Iron: 7, Bronze: 13, Silver: 17, Gold: 25, Platinum: 32, Emerald: 40, Diamond: 48, Master: 54, GrandMaster: 59, Challenger: 64,
  ```
- The players are **sorted by points** in descending order.
- Players are **distributed between two teams** such that the total points of both teams are as close as possible.

---

## How to Use:

1. **Select Your Game**
   
   Choose the game you want to create a balanced match for.

    ![Select Game](src/assets/ScreenShots/SelectGame.png)

3. **Enter Players' Ranks**

   Input the ranks of each player. Players who do not select a tier will be considered at the lowest tier for calculation purposes.

   ![ValorantScreen](https://github.com/user-attachments/assets/373d9e63-823e-4487-9625-0f70650acb61)


5. **Generate Fair Match**

   Click on 'Generate Fair Match!' to see the balanced match results.
   
---

## Contact

If you have any questions or suggestions, feel free to reach out:  
📧 **Email**: scy0723123@gmail.com  
📱 **GitHub**: [cxaos](https://github.com/cxaosdev)
