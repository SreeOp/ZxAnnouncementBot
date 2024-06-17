const { Client, GatewayIntentBits, Collection } = require('discord.js');
const fs = require('fs');
const path = require('path');
const express = require('express');
require('dotenv').config();
const { printWatermark } = require('./functions/handlers');
const autoRoleHandler = require('./functions/autoRole');
const { connectToDatabase, disconnectFromDatabase, addDownloadLink, getDownloadLink } = require('./data/database');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMessageReactions,
    ],
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
    } catch (error) {
        console.error('Error executing command:', error);
        try {
            await message.channel.send('There was an error trying to execute that command!');
        } catch (sendError) {
            console.error('Failed to send error message:', sendError);
        }
    }
});

client.on('interactionCreate', async interaction => {
    if (!interaction.isButton()) return;

    const [action, messageId] = interaction.customId.split('_');
    if (!messageId) return;

    if (action === 'download') {
        const downloadLink = await getDownloadLink(messageId);

        if (!downloadLink) {
            return interaction.reply({ content: 'Download link not found.', ephemeral: true });
        }

        try {
            await interaction.deferReply({ ephemeral: true });
            await interaction.user.send(`Here is your download link: ${downloadLink}`);
            await interaction.editReply('Download link has been sent to your DMs!');
        } catch (error) {
            console.error('Error handling interaction:', error);
            try {
                await interaction.followUp({ content: 'There was an error while processing your request.', ephemeral: true });
            } catch (followUpError) {
                console.error('Failed to follow up interaction:', followUpError);
            }
        }
    } else if (action === 'watch') {
        // Add similar logic for watch action if needed
    }
});

const app = express();
const port = 3000;
app.get('/', (req, res) => {
    const indexPath = path.join(__dirname, 'index.html');
    res.sendFile(indexPath);
});
app.listen(port, () => {
    console.log(`🔗 Listening to GlaceYT : http://localhost:3000`);
});
printWatermark();

async function login() {
    try {
        await client.login(process.env.TOKEN);
        console.log('\x1b[32m%s\x1b[0m', '|    🍔 Bot logged in successfully!');
        console.log('\x1b[36m%s\x1b[0m', '|    🚀 Commands Loaded successfully!');
        console.log('\x1b[32m%s\x1b[0m', `|    🌼 Logged in as ${client.user.username}`);
        console.log('\x1b[36m%s\x1b[0m', `|    🏡 Bot is in ${client.guilds.cache.size} servers`);
        await connectToDatabase(); // Connect to MongoDB after logging in
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

process.on('SIGINT', async () => {
    await disconnectFromDatabase(); // Disconnect from MongoDB when process is terminated
    process.exit(0);
});

module.exports = client;
