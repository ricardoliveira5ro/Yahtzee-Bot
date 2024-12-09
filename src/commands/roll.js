const { getPreviews } = require("../functions/scoring");
const { messageEmbed } = require("../messages/board");
const { showRolledAndLockedDice } = require("../messages/dice");
const { noGameStartedMessage, waitForYourTurnMessage, noRollsLeft } = require("../messages/error");

module.exports = {
    name: "roll",
    async execute(message, args, games) {
    
        if (args[0]) {
            message.reply({ embeds: [tooManyArgumentsMessage] });
            return;
        }

        const index = games.findIndex(game => game.player1.id === message.author.id || game.player2.id === message.author.id)
        if (index === -1) {
            message.reply({ embeds: [noGameStartedMessage] });
            return;
        }

        const isPlayer1Turn = games[index].playsCount % 2 == 0;
        if ((isPlayer1Turn && message.author.id !== games[index].player1.id) ||
            (!isPlayer1Turn && message.author.id !== games[index].player2.id)
        ) {
            message.reply({ embeds: [waitForYourTurnMessage] });
            return;
        }

        if (games[index].rollsLeft === 0) {
            message.reply({ embeds: [noRollsLeft] });
            return;
        }


        games[index].rollsLeft--;

        // Randomize dice
        games[index].rolledDice = [];
        for (let i = 0; i < (5 - games[index].lockedDice.length); i++) {
            games[index].rolledDice.push(Math.floor(Math.random() * 6) + 1)
        }

        // Preview results
        const dice = [...games[index].rolledDice, ...games[index].lockedDice]
        const targetPlayer = isPlayer1Turn ? 'player1' : 'player2';
        games[index].previews[targetPlayer] = getPreviews(games[index].scores[targetPlayer], dice);

        // Drawing dice
        let embed = messageEmbed(games[index]);
        embed = showRolledAndLockedDice(embed, games[index].rolledDice, games[index].lockedDice)

        message.reply({ embeds: [embed] });

        return games;
    }
};