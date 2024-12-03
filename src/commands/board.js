const { EmbedBuilder, embedLength } = require('discord.js');

module.exports = {
    name: "board",
    async execute (message, args) {
        
        const messageEmbed = new EmbedBuilder()
            .setColor("Yellow")
            .addFields(
                { name: '\u200B', value: 'Ones\nTwos\nThrees', inline: true },
                { name: 'Me', value: '1\n2\n3', inline: true },
                { name: 'You', value: '4\n5\n6', inline: true }
            )

        message.channel.send({ embeds: [messageEmbed] })
    }
};