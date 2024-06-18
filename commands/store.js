const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const { StoreItem, init } = require('../database'); // Ensure the correct path

module.exports = {
    name: 'store',
    description: 'Send an embedded message with download and video buttons.',
    async execute(message, args) {
        if (args.length < 4) {
            return message.channel.send('Usage: $store [image_url] [download_label] [download_url] [video_url]');
        }

        await init();

        const [imageUrl, downloadLabel, downloadLink, videoLink] = args;

        // Generate a unique ID for this store item
        const storeItemId = `item-${Date.now()}`;

        // Save the download link in the database
        try {
            await StoreItem.create({
                id: storeItemId,
                downloadLabel,
                downloadLink
            });
        } catch (error) {
            console.error('Error saving store data:', error);
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
            const sentMessage = await message.channel.send({ embeds: [embed], components: [row] });
            setTimeout(async () => {
                try {
                    await message.delete();
                } catch (deleteError) {
                    console.error('Error deleting the original message:', deleteError);
                }
            }, 1000); // Add a delay before attempting to delete the message
        } catch (error) {
            console.error('Error sending message:', error);
            message.channel.send('There was an error while trying to send the store message.');
        }
    },
};
