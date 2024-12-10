const { getPreviews } = require("../functions/scoring");
const { messageEmbed } = require("../messages/board");
const { wrongMarkMessage, noGameStartedMessage, waitForYourTurnMessage, rollBeforeLock, alreadyMarkedMessage } = require("../messages/error");

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

        let alreadyMarked = false;
        switch (args[0].toLowerCase()) {
            case "ones":
                games[index].scores[targetPlayer][0] === -1 ? games[index].scores[targetPlayer][0] = previews[0]
                                                            : alreadyMarked = true
                break;
            case "twos":
                games[index].scores[targetPlayer][1] === -1 ? games[index].scores[targetPlayer][1] = previews[1]
                                                            : alreadyMarked = true
                break;
            case "threes":
                games[index].scores[targetPlayer][2] === -1 ? games[index].scores[targetPlayer][2] = previews[2]
                                                            : alreadyMarked = true
                break;
            case "fours":
                games[index].scores[targetPlayer][3] === -1 ? games[index].scores[targetPlayer][3] = previews[3]
                                                            : alreadyMarked = true
                break;
            case "fives":
                games[index].scores[targetPlayer][4] === -1 ? games[index].scores[targetPlayer][4] = previews[4]
                                                            : alreadyMarked = true
                break;
            case "sixes":
                games[index].scores[targetPlayer][5] === -1 ? games[index].scores[targetPlayer][5] = previews[5]
                                                            : alreadyMarked = true
                break;
            case "threeofakind":
                games[index].scores[targetPlayer][8] === -1 ? games[index].scores[targetPlayer][8] = previews[8]
                                                            : alreadyMarked = true
                break;
            case "fourofakind":
                games[index].scores[targetPlayer][9] === -1 ? games[index].scores[targetPlayer][9] = previews[9]
                                                            : alreadyMarked = true
                break;
            case "fullhouse":
                games[index].scores[targetPlayer][10] === -1 ? games[index].scores[targetPlayer][10] = previews[10]
                                                            : alreadyMarked = true
                break;
            case "smallstraight":
                games[index].scores[targetPlayer][11] === -1 ? games[index].scores[targetPlayer][11] = previews[11]
                                                            : alreadyMarked = true
                break;
            case "largestraight":
                games[index].scores[targetPlayer][12] === -1 ? games[index].scores[targetPlayer][12] = previews[12]
                                                            : alreadyMarked = true
                break;
            case "chance":
                games[index].scores[targetPlayer][13] === -1 ? games[index].scores[targetPlayer][13] = previews[13]
                                                            : alreadyMarked = true
                break;
            case "yahtzee":
                games[index].scores[targetPlayer][14] === -1 ? games[index].scores[targetPlayer][14] = previews[14]
                                                            : alreadyMarked = true
                break;
            default:
                message.reply({ embeds: [wrongMarkMessage] });
                return;
        }

        if (alreadyMarked) {
            message.reply({ embeds: [alreadyMarkedMessage] });
            return;
        }

        // Calculate Sum and Bonus
        const upperSection = games[index].scores[targetPlayer].slice(0, 6)
        if (!upperSection.includes(-1)) {
            const sum = upperSection.reduce((partialSum, value) => partialSum + value, 0)
            games[index].scores[targetPlayer][6] = sum
            games[index].scores[targetPlayer][7] = sum >= 63 ? 35 : 0
        }

        // Final Score
        const finalScoreArr = games[index].scores[targetPlayer].slice(0, 15)
        if (!finalScoreArr.includes(-1)) {
            const sum = finalScoreArr.reduce((partialSum, value) => partialSum + value, 0)
            games[index].scores[targetPlayer][15] = sum
        }

        // Reset rolled, locked and previews
        games[index].previews[targetPlayer] = [];
        games[index].rolledDice = [];
        games[index].lockedDice = [];

        // Continue game flow
        games[index].rollsLeft = 3
        games[index].playsCount++

        let embed = messageEmbed(games[index]);
        // End game condition
        if (games[index].playsCount === 26) {
            const finalScoreP1 = games[index].scores.player1[15]
            const finalScoreP2 = games[index].scores.player2[15]
            let winnerName;

            let winnerField;
            if (finalScoreP1 === finalScoreP2) {
                winnerField = { name: `⚖️ Tie ⚖️`, value: '\u200B', inline: true }
            }
            else {
                winnerName = finalScoreP1 > finalScoreP2 ? games[index].player1.nickname : games[index].player2.nickname
                winnerField = { name: `🏆 ${winnerName} 🏆`, value: '\u200B', inline: true }
            }

            embed.addFields(
                { name: '\u200B', value: '\u200B' },
                winnerField
            )
            message.channel.send({ embeds: [embed] })
            return;
        }

        message.reply({ embeds: [embed] });
    }
}