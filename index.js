const { Client, GatewayIntentBits, ActivityType, MessageEmbed } = require('discord.js');
const fs = require('fs');
const path = require('path');
const express = require('express');
require('dotenv').config();
const { printWatermark } = require('./functions/handlers');
const autoRoleHandler = require('./functions/autoRole');
const voiceHandler = require('./functions/voiceHandler'); // Import the voiceHandler function

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildVoiceStates,
  ],
});

const prefix = '$';
client.commands = new Map(); 

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
}

client.on('messageCreate', (message) => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const commandName = args.shift().toLowerCase();

  const command = client.commands.get(commandName);

  if (!command) return;

  try {
    command.execute(message, args);
  } catch (error) {
    console.error(error);
    message.reply('There was an error trying to execute that command!');
  }
});

const app = express();
const port = 3000;
app.get('/', (req, res) => {
  const imagePath = path.join(__dirname, 'index.html');
  res.sendFile(imagePath);
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
      activities: [{ name: `ZX STORE`, type: ActivityType.Custom }],
      status: 'dnd',
    });
  }, 2000);

  const autoRoleId = '1251558263632167052'; // Replace with your auto role ID
  autoRoleHandler(client, autoRoleId); // Call the auto-role handler function

  const statusChannelId = '1251856027490455594'; // Replace with your status channel ID
  const statusChannel = client.channels.cache.get(statusChannelId);

  if (statusChannel) {
    const embed = new MessageEmbed()
      .setColor('#A020F0')
      .setTitle('Bot Status')
      .setDescription('The bot is now online and operational!')
      .addFields(
        { name: 'Server Count', value: `${client.guilds.cache.size}`, inline: true },
        { name: 'Uptime', value: `${getUptime()}`, inline: true },
        { name: 'Commands', value: `${getCommandList()}`, inline: false }
      )
      .setTimestamp()
      .setFooter('Bot Status');

    statusChannel.send({ embeds: [embed] })
      .then(() => console.log('Status message sent successfully.'))
      .catch(console.error);
  } else {
    console.error('Status channel not found.');
  }
});

// Function to get bot uptime
function getUptime() {
  const totalSeconds = client.uptime / 1000;
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = Math.floor(totalSeconds % 60);
  return `${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds`;
}

// Function to get list of bot commands
function getCommandList() {
  return client.commands.map(cmd => `\`${cmd.name}\`: ${cmd.description}`).join('\n');
}

login();

setInterval(() => {
  if (!client || !client.user) {
    console.log('\x1b[31m%s\x1b[0m', '❌ Client Not Logged in, Restarting Process...');
    process.kill(1);
  }
}, 15000);

module.exports = client;
