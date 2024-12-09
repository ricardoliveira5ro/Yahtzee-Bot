const { messageEmbed } = require("../messages/board");
const { tooManyArgumentsMessage, onGoingGameMessage } = require("../messages/error");

module.exports = {
    name: "start",
    async execute(message, args, games) {

        if (args[0]) {
            message.reply({ embeds: [tooManyArgumentsMessage] });
            return;
        }

        if (games.find(game => game?.player1?.id === message.author.id || game?.player2?.id === message.author.id)) {
            message.reply({ embeds: [onGoingGameMessage] });
            return;
        }

        const startingPointGame = {
            player1: {
                id: message.author.id,
                nickname: message.channel.members.find(m => m.id === message.author.id).nickname
            },
            player2: null,
            scores: {
                player1: [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
                player2: [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1]
            },
            previews: {
                player1: [],
                player2: [],
            },
            playsCount: 0,
            rollsLeft: 3, //By turn
            rolledDice: [],
            lockedDice: []
        }

        games.push(startingPointGame)

        message.reply({ embeds: [messageEmbed(startingPointGame)] });

        return games;
    }
};