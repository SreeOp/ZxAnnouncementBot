const { Client, GatewayIntentBits, Collection, Partials } = require('discord.js');
const fs = require('fs');
const path = require('path');
const express = require('express');
require('dotenv').config();
const { printWatermark } = require('./functions/handlers');
const autoRoleHandler = require('./functions/autoRole');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMessageReactions,
    ],
    partials: [Partials.Message, Partials.Channel, Partials.Reaction],
});

const prefix = '$';
client.commands = new Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

client.on('messageCreate', async (message) => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

    const command = client.commands.get(commandName);

    if (!command) return;

    try {
        await command.execute(message, args);
        // Delete the user's command message
        await message.delete();
    } catch (error) {
        console.error(error);
        message.reply('There was an error trying to execute that command!');
    }
});

// Event listener for button interactions
client.on('interactionCreate', async interaction => {
    if (!interaction.isButton()) return;

    if (interaction.customId === 'download') {
        try {
            await interaction.deferUpdate();
            await interaction.user.send(`Here is your download link: ${process.env.DOWNLOAD_LINK}`);
            await interaction.followUp({ content: 'Download link has been sent to your DMs!', ephemeral: true });
        } catch (error) {
            console.error('Error handling interaction:', error);
            await interaction.followUp({ content: 'There was an error while processing your request.', ephemeral: true });
        }
    }
});

const app = express();
const port = 3000;
app.get('/', (req, res) => {
    const indexPath = path.join(__dirname, 'index.html');
    res.sendFile(indexPath);
});
app.listen(port, () => {
    console.log(`🔗 Listening to GlaceYT : http://localhost:${port}`);
});
printWatermark();

async function login() {
    try {
        await client.login(process.env.TOKEN);
        console.log('\x1b[32m%s\x1b[0m', '|    🍔 Bot logged in successfully!');
        console.log('\x1b[36m%s\x1b[0m', '|    🚀 Commands Loaded successfully!');
        console.log('\x1b[32m%s\x1b[0m', `|    🌼 Logged in as ${client.user.username}`);
        console.log('\x1b[36m%s\x1b[0m', `|    🏡 Bot is in ${client.guilds.cache.size} servers`);
    } catch (error) {
        console.error('\x1b[31m%s\x1b[0m', '❌ Failed to log in:', error);
        console.log('\x1b[31m%s\x1b[0m', '❌ Client Not Login, Restarting Process...');
        process.kill(1);
    }
}

client.once('ready', () => {
    setTimeout(() => {
        console.log('\x1b[32m%s\x1b[0m', `|    🎯 Activity successfully set!`);
        client.user.setPresence({
            activities: [{ name: `WZX STORE`, type: 'WATCHING' }],
            status: 'dnd',
        });
    }, 2000);

    const autoRoleId = '1251558263632167052'; // Replace with your auto role ID
    autoRoleHandler(client, autoRoleId); // Call the auto-role handler function
});

login();

setInterval(() => {
    if (!client || !client.user) {
        console.log('\x1b[31m%s\x1b[0m', '❌ Client Not Logged in, Restarting Process...');
        process.kill(1);
    }
}, 15000);

module.exports = client;
