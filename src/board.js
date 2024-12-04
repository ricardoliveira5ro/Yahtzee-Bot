const { EmbedBuilder } = require('discord.js');

const axes = ["Ones", "Twos", "Threes", "Fours", "Fives", "Sixes", "Sum", "Bonus", 
                "Three of a Kind", "Four of a Kind", "Full House", 
                "Small Straight", "Large Straight", "Chance", "Yahtzee", "Score"]

const fillColumn = (values) => {
    let columnString = '';

    values.map((value, index) => {
        if (index === 6 || index === 8 || index === 15) {

            if (axes.includes(value))
                columnString += '-'.repeat(16) + '\n'
            else
                columnString += '-'.repeat(4) + '\n'
        }
        
        columnString += value + '\n'
    })

    return columnString;
}

const messageEmbed = (player_1_values, player_2_values) => {
    return new EmbedBuilder()
        .setColor("Yellow")
        .addFields(
            { name: '\u200B', value: fillColumn(axes), inline: true },
            { name: 'Me', value: fillColumn(player_1_values), inline: true },
            { name: 'You', value: fillColumn(player_2_values), inline: true }
        )
    ;
}

module.exports = { messageEmbed };