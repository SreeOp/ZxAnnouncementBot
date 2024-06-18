// commands/store.js
const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const { StoreItem } = require('../database');
const { v4: uuidv4 } = require('uuid'); // Import UUID for unique IDs

module.exports = {
    name: 'store',
    description: 'Send an embedded message with download and video buttons.',
    async execute(message, args) {
        if (args.length < 4) {
            return message.channel.send('Usage: $store [image_url] [download_label] [download_url] [video_url]');
        }

        const [imageUrl, downloadLabel, downloadLink, videoLink] = args;
        const itemId = uuidv4(); // Generate a unique ID for the store item

        const embed = new EmbedBuilder()
            .setColor('#BC13FE')
            .setTitle('ZX STORE')
            .setDescription('Click the buttons below to download or watch the video.')
            .setImage(imageUrl);

        const row = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId(`download-${itemId}`) // Include the item ID in the button's custom ID
                    .setLabel(downloadLabel)
                    .setStyle(ButtonStyle.Primary),
                new ButtonBuilder()
                    .setLabel('Watch Video')
                    .setStyle(ButtonStyle.Link)
                    .setURL(videoLink)
            );

        try {
            await StoreItem.create({
                id: itemId,
                downloadLabel,
                downloadLink
            });

            await message.channel.send({ embeds: [embed], components: [row] });
            await message.delete();
        } catch (error) {
            console.error('Error sending message:', error);
            message.channel.send('There was an error while trying to send the store message.');
        }
    },
};
