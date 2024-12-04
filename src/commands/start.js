const { messageEmbed } = require("../board");

module.exports = {
    name: "start",
    async execute (message, args) {
        message.channel.send({ embeds: [messageEmbed([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16], [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16])] })
    }
};
