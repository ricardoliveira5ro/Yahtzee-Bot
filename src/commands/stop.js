const { tooManyArgumentsMessage, noGameStartedMessage, botMessage } = require("../messages/error");

module.exports = {
    name: "stop",
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
        
        const surrenderGameMessage = botMessage(0xFF0000, 'Game canceled', 'You decided to cancel an ongoing game, now you can start a new one using command `!start`');
        message.reply({ embeds: [surrenderGameMessage] });
        
        games.splice(index, 1);
        
        return games;
    }
};