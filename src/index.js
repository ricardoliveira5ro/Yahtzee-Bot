require('dotenv').config();

const { Client, GatewayIntentBits } = require('discord.js');
const Discord = require("discord.js");
const fs = require("fs");

const client = new Client({ 
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ]
});

client.commands = new Discord.Collection();

client.on('ready', () => {
    console.log(`${client.user.tag} is online.`);
});

const commandFiles = fs.readdirSync("./src/commands").filter(file => file.endsWith(".js"));

for (const file of commandFiles) {
    const command = require(`../src/commands/${file}`);
    client.commands.set(command.name, command);
}

const COMMAND_PREFIX = '!';

client.on('messageCreate', async (message) => {
    if (!message.content.startsWith(COMMAND_PREFIX) || message.author.bot) return;

    const args = message.content.slice(COMMAND_PREFIX.length).split(/ +/);
    const commandName = args.shift().toLowerCase();

    const command = client.commands.get(commandName);
    if (!command) return;

    try {
        await command.execute(message, args, message.author);
    } catch (error) {
        console.error(error);
        message.reply("There was an error trying to execute that command!");
    }
});

client.login(process.env.token);