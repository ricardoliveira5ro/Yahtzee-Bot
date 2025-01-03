const { getPreviews } = require("../functions/scoring");
const { messageEmbed } = require("../messages/board");
const { showRolledAndLockedDice } = require("../messages/dice");
const { rollBeforeLockMessage, wrongLockDiceMessage, noGameStartedMessage, waitForYourTurnMessage, waitingForOpponentMessage } = require("../messages/error");

module.exports = {
    name: "lock",
    async execute(message, args, games) {
        const index = games.findIndex(game => game.player1.id === message.author.id || game.player2.id === message.author.id)
        if (index === -1) {
            message.reply({ embeds: [noGameStartedMessage] });
            return;
        }

        if (!games[index].player2) {
            message.reply({ embeds: [waitingForOpponentMessage] });
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
            message.reply({ embeds: [rollBeforeLockMessage] });
            return;
        }

        // Reset rolled and locked dice
        if (!args[0]) {
            const tmpLocked = games[index].lockedDice;
            games[index].lockedDice = [];
            games[index].rolledDice.push(...tmpLocked);
        }

        // Remove duplicates and sort indexes
        let diceList = args.filter((item, index) => args.indexOf(item) === index);
        diceList = diceList.map(Number).sort((a, b) => b - a);

        // Check whether dice is valid or not
        for (let diceIndex of diceList) {
            if (isNaN(diceIndex) || !Number.isInteger(Number(diceIndex)) || Number(diceIndex) < 1 || games[index].rolledDice.length < Number(diceIndex)) {
                message.reply({ embeds: [wrongLockDiceMessage] });
                return;
            }
        }

        diceList.forEach(diceIndex => {
            games[index].lockedDice.push(games[index].rolledDice[diceIndex - 1]);
            games[index].rolledDice.splice(diceIndex - 1, 1);
        });

        // Re-order locked dice
        games[index].lockedDice = games[index].lockedDice.sort((a, b) => a - b);

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
}