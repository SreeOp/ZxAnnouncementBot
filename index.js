const { Client, GatewayIntentBits, Collection, Interaction } = require('discord.js');
const fs = require('fs');
require('dotenv').config();

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMessageReactions,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.Interactions
    ],
});

client.commands = new Collection();

// Load commands dynamically from the root directory
const commandFiles = fs.readdirSync('./').filter(file => file.endsWith('.js') && file !== 'index.js');

for (const file of commandFiles) {
    const command = require(`./${file}`);
    client.commands.set(command.name, command);
}

client.on('messageCreate', async (message) => {
    if (!message.content.startsWith('$') || message.author.bot) return;

    const args = message.content.slice('$'.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

    const command = client.commands.get(commandName);

    if (!command) return;

    try {
        await command.execute(client, message, args);
    } catch (error) {
        console.error('Error executing command:', error);
        try {
            await message.channel.send('There was an error trying to execute that command!');
        } catch (sendError) {
            console.error('Failed to send error message:', sendError);
        }
    }
});

client.on('interactionCreate', async (interaction) => {
    if (!interaction.isCommand()) return;

    const command = client.commands.get(interaction.commandName);

    if (!command) return;

    try {
        await command.execute(client, interaction);
    } catch (error) {
        console.error('Error executing command:', error);
        await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
    }
});

async function login() {
    try {
        await client.login(process.env.TOKEN);
        console.log('Bot is logged in!');
    } catch (error) {
        console.error('Failed to log in:', error);
    }
}

login();
