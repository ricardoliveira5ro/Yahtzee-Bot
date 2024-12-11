# Yahtzee Discord Bot

This Discord bot introduces the classic game of Yahtzee to your server! Players can use simple commands to roll dice, track scores, and play multiplayer games with friends—all without leaving Discord.

### 🚀 Getting Started

* Invite the bot to your Discord server using [this link](https://discord.com/oauth2/authorize?client_id=1313522573845200948)
* That's it — you're ready to play! 😁

### 🎮 Commands

* `!help` : Displays instructions on how to play the game
* `!start` : Starts a new Yahtzee game
* `!stop` : Stops an ongoing game
* `!join [username]` : Lets a second player join an existing game
    * *username* is the opponent you want to challenge. Note that this must be the unique Discord username, not the nickname in the server
* `!roll` : Rolls the dice for your turn
* `!lock [position]` : Locks one or more dice to prevent them from being rolled again
    * *position* refers to the dice's position from left to right. For example:
        * *!lock 1*
        * *!lock 1 2 5*
* `!mark [spot]` : Completes your turn by marking a spot on the scorecard according to your scoring choice. 
    * The spot names match the scorecard but have **no spaces** and are **not case-sensitive**. For example:
        * *!mark ones*
        * *!mark fourOfAKind*
        * *!mark largestraight*

### 💻 Tech Stack

* **Node.js**: JavaScript runtime for the bot's backend.
* **Discord.js**: Library for interacting with the Discord API.