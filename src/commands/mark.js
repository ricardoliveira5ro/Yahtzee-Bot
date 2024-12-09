const { getPreviews } = require("../functions/scoring");
const { messageEmbed } = require("../messages/board");
const { noMarkMessage, noGameStartedMessage, waitForYourTurnMessage, rollBeforeLock } = require("../messages/error");

module.exports = {
    name: "mark",
    async execute(message, args, games) {
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

        if (games[index].rollsLeft === 3) {
            message.reply({ embeds: [rollBeforeLock] });
            return;
        }

        if (!args[0]) {
            message.reply({ embeds: [noMarkMessage] });
            return;
        }


        const dice = [...games[index].rolledDice, ...games[index].lockedDice]
        const targetPlayer = isPlayer1Turn ? 'player1' : 'player2';
        const previews = getPreviews(games[index].scores[targetPlayer], dice);

        switch (args[0].toLowerCase()) {
            case "ones":
                games[index].scores[targetPlayer][0] = previews[0];
                break;
        }

        // Reset rolled, locked and previews
        games[index].previews[targetPlayer] = [];
        games[index].rolledDice = [];
        games[index].lockedDice = [];

        // Continue game flow
        games[index].rollsLeft = 3
        games[index].playsCount++

        // Drawing dice
        let embed = messageEmbed(games[index]);

        message.reply({ embeds: [embed] });
    }
}