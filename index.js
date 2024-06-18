const { Client, Intents, MessageActionRow, MessageButton } = require('discord.js');
const fs = require('fs');
const path = require('path');
const express = require('express');
require('dotenv').config();
const autoRoleHandler = require('./autoRole');

const client = new Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.DIRECT_MESSAGES,
        Intents.FLAGS.MESSAGE_CONTENTS,
        Intents.FLAGS.MESSAGE_REACTIONS,
    ],
});

const prefix = '$';
client.commands = new Map();

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

    if (interaction.customId === 'download') {
        try {
            await interaction.deferReply({ ephemeral: true });

            // Get the download link and image URL from the embed's footer
            const footerText = interaction.message.embeds[0]?.footer?.text;
            if (!footerText) {
                await interaction.editReply('No download link found.');
                return;
            }

            const { downloadLink, imageUrl } = JSON.parse(footerText);

            // Send the image along with the download link to the user
            const embedToSend = {
                content: `Here is your download link: ${downloadLink}`,
                files: [imageUrl],
            };
            await interaction.user.send(embedToSend);

            // Edit the reply to indicate success
            await interaction.editReply('Download link and image have been sent to your DMs!');
        } catch (error) {
            console.error('Error handling interaction:', error);
            try {
                // Respond with an error message to the user
                await interaction.followUp({ content: 'There was an error while processing your request.', ephemeral: true });
            } catch (followUpError) {
                console.error('Failed to follow up interaction:', followUpError);
            }
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
    console.log(`🔗 Listening to GlaceYT : http://localhost:3000`);
});

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
