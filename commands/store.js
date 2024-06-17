const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

module.exports = {
    name: 'store',
    description: 'Send an embedded message with download and video buttons.',
    async execute(client, message, args) {
        if (args.length < 4) {
            return message.channel.send('Usage: $store [image_url] [download_label] [download_url] [video_url]');
        }

        const [imageUrl, downloadLabel, downloadLink, videoLink] = args;

        const embed = new EmbedBuilder()
            .setColor('#BC13FE')
            .setTitle('ZX STORE')
            .setDescription('Click the buttons below to download or watch the video.')
            .setImage(imageUrl)
            .setFooter({ text: 'Dev ZyX' });

        const row = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId('download')
                    .setLabel(downloadLabel)
                    .setStyle(ButtonStyle.Primary),
                new ButtonBuilder()
                    .setLabel('Watch Video')
                    .setStyle(ButtonStyle.Link)
                    .setURL(videoLink)
            );

        try {
            // Send the message with the embed and buttons
            const sentMessage = await message.channel.send({ embeds: [embed], components: [row] });

            // Store the download link in the message's custom data (to be retrieved later)
            client.downloadLinks.set(sentMessage.id, downloadLink);

            // Attempt to delete the original command message
            try {
                await message.delete();
            } catch (deleteError) {
                console.error('Failed to delete the command message:', deleteError);
            }
        } catch (error) {
            console.error('Error sending message:', error);
            message.channel.send('There was an error while trying to send the store message.');
        }
    },
};
