const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const fs = require('fs');
const path = require('path');

const storeDataPath = path.resolve(__dirname, 'storeData.json');

module.exports = {
    name: 'store',
    description: 'Send an embedded message with download and video buttons.',
    async execute(message, args) {
        if (args.length < 4) {
            return message.channel.send('Usage: $store [image_url] [download_label] [download_url] [video_url]');
        }

        const [imageUrl, downloadLabel, downloadLink, videoLink] = args;

        // Load existing store data
        let storeData;
        try {
            storeData = JSON.parse(fs.readFileSync(storeDataPath, 'utf8'));
        } catch (error) {
            console.error('Error reading store data:', error);
            storeData = {};
        }

        // Generate a unique ID for this store item
        const storeItemId = `item-${Date.now()}`;

        // Save the download link in the "database" (storeData.json)
        storeData[storeItemId] = {
            downloadLabel,
            downloadLink
        };

        try {
            fs.writeFileSync(storeDataPath, JSON.stringify(storeData, null, 2), 'utf8');
        } catch (error) {
            console.error('Error writing store data:', error);
            return message.channel.send('There was an error while trying to save the store data.');
        }

        const embed = new EmbedBuilder()
            .setColor('#BC13FE')
            .setTitle('ZX STORE')
            .setDescription('Click the buttons below to download or watch the video.')
            .setImage(imageUrl);

        const row = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId(`download-${storeItemId}`) // Use the store item ID as part of the custom ID
                    .setLabel(downloadLabel)
                    .setStyle(ButtonStyle.Primary),
                new ButtonBuilder()
                    .setLabel('Watch Video')
                    .setStyle(ButtonStyle.Link)
                    .setURL(videoLink)
            );

        try {
            await message.channel.send({ embeds: [embed], components: [row] });
            await message.delete();
        } catch (error) {
            console.error('Error sending message:', error);
            message.channel.send('There was an error while trying to send the store message.');
        }
    },
};
