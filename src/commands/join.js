const { messageEmbed } = require("../messages/board");
const { onGoingGameMessage, noOpponentSelectedMessage, opponentDoesNotExists, noGameStartedMessage, fullPartyMessage } = require("../messages/error");

module.exports = {
    name: "join",
    async execute(message, args, games) {

        if (!args[0]) {
            message.reply({ embeds: [noOpponentSelectedMessage] });
            return;
        }

        if (games.find(game => game?.player1 === message.author || game?.player2 === message.author)) {
            message.reply({ embeds: [onGoingGameMessage] });
            return;
        }

        const opponent = message.channel.members.find(m => m.user.username === args[0])
        if (!opponent) {
            message.reply({ embeds: [opponentDoesNotExists] });
            return;
        }

        const gameIndex = games.findIndex(game => game.player1.id === opponent.user.id)
        if (gameIndex === -1) {
            message.reply({ embeds: [noGameStartedMessage] });
            return;
        }

        if (games[gameIndex].player1 && games[gameIndex].player2) {
            message.reply({ embeds: [fullPartyMessage] });
            return;
        }
        
        games[gameIndex].player2 = {
            id: message.author.id,
            nickname: message.channel.members.find(m => m.id === message.author.id).nickname
        };

        message.reply({ embeds: [messageEmbed(games[gameIndex])] });

        return games;
    }
};