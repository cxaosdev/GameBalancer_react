
# League of Leagends and Valorant Team Match Balancer

> 🕹️ A fair match generator for **League of Leagends** and **Valorant** that divides 10 players into two balanced teams based on their **tiers and points**.

## Features
- 🏅 **Player Tier Input**: Select each player's rank.
- ⚖️ **Fair Team Generation**: Automatically create two balanced teams based on player points.
- 📊 **Result**: Displays the generated teams and their total points in a modal.

***

## Project Structure

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

## Contact

If you have any questions or suggestions, feel free to reach out:  
📧 **Email**: scy0723123@gmail.com  
📱 **GitHub**: [cxaos](https://github.com/cxaosdev)
