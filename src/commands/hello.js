module.exports = {
    name: "hello",
    async execute (message, args, name) {
        message.reply(`Hi, ${name}`);
    }
};