const { messageEmbed } = require("../messages/board");
const { showDice } = require("../messages/dice");
const { rollBeforeLock } = require("../messages/error");

module.exports = {
    name: "lock",
    async execute(message, args, games) {
        const index = games.findIndex(game => game.player1.id === message.author.id || game.player2.id === message.author.id)
        if (index === -1) {
            message.reply({ embeds: [noGameStartedMessage] });
            return;
        }

        const isPlayer1Turn = games[index].playsCount & 1 == 1;
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

        // Drawing dice
        let embed = messageEmbed(games[index]);
        embed.addFields({ name: '\u200B', value: '\u200B' }) // Empty line
        embed.addFields({ name: '\u200B', value: 'Rolled Dice:' })
        embed.addFields(showDice(games[index].rolledDice))
        embed.addFields({ name: '\u200B', value: 'Locked Dice:' })
        embed.addFields(showDice(games[index].lockedDice))
        message.reply({ embeds: [embed] });

        return games;
    }
}