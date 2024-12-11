const { EmbedBuilder } = require("discord.js");
const { tooManyArgumentsMessage } = require("../messages/error");

module.exports = {
    name: "help",
    async execute(message, args, games) {
        if (args[0]) {
            message.reply({ embeds: [tooManyArgumentsMessage] });
            return;
        }

        const helpMessage = new EmbedBuilder()
            .setColor(0x0099FF)
            .setTitle('🎲 Yahtzee Help')
            .setDescription('Welcome to Yahtzee! Use the following commands to play the game:   ')
            .addFields(
                { name: '`!start`', value: 'Start a new Yahtzee game.' },
                { name: '`!stop`', value: 'Stop an ongoing game' },
                { name: '`!join [username]`', value: 'Join an ongoing game. Replace `[username]` with the unique Discord username of your opponent (not nickname in server).' },
                { name: '`!roll`', value: 'Roll the dice for your turn.' },
                { name: '`!lock [position]`', value: 'Lock dice to prevent re-rolling. Replace `[position]` with the dice positions, e.g., `!lock 1 2 5`.' },
                { name: '`!mark [spot]`', value: 'Mark a scorecard spot to complete your turn. Use scorecard names without spaces, e.g., `!mark ones`, `!mark largestraight`.' },
                { name: '`!help`', value: 'Display this help message.' },
                { name: '\u200B', value: '\u200B' }
            )
            .setFooter({ text: 'Scoring rules follow those of the traditional Yahtzee game.' })

        message.reply({ embeds: [helpMessage] });
    }
};