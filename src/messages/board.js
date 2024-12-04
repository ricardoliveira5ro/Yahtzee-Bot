const { EmbedBuilder, userMention } = require('discord.js');

let longestNicknameLength;

const axes = ["Ones", "Twos", "Threes", "Fours", "Fives", "Sixes", "Sum", "Bonus", 
                "Three of a Kind", "Four of a Kind", "Full House", 
                "Small Straight", "Large Straight", "Chance", "Yahtzee", "SCORE"]

const fillColumn = (values) => {
    let columnString = '';

    values.map((value, index) => {
        // Line separator
        if (index === 6 || index === 8 || index === 15) {

            if (axes.includes(value))
                columnString += '-'.repeat(16) + '\n'
            else
                columnString += '-'.repeat(longestNicknameLength + 1) + '\n'
        }

        if (value === -1)
            columnString += '\u200B\n'
        else
            columnString += value + '\n'
    })

    return columnString;
}

const messageEmbed = (game) => {
    longestNicknameLength = Math.max(...([game?.player1?.nickname || '', game?.player2?.nickname || ''].map(el => el.length)));
    
    return new EmbedBuilder()
        .setColor("Yellow")
        .addFields(
            { name: '\u200B', value: fillColumn(axes), inline: true },
            { name: game?.player1?.nickname || 'P1', value: fillColumn(game?.scores?.player1), inline: true },
            { name: game?.player2?.nickname || 'P2', value: fillColumn(game?.scores?.player2), inline: true }
        )
    ;
}

module.exports = { messageEmbed };