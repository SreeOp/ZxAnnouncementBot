const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

module.exports = {
    name: 'store',
    description: 'Send an embedded message with download and video buttons.',
    async execute(message, args) {
        if (args.length < 3) {
            return message.channel.send('Usage: $store [image_url] [download_url] [video_url]');
        }

        const imageUrl = args[0];
        const downloadLink = args[1];
        const videoLink = args[2];

        const embed = new EmbedBuilder()
            .setColor('#BC13FE')
            .setTitle('ZX STORE')
            .setDescription('Click the buttons below to download or watch the video.')
            .setImage(imageUrl);

        const row = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId('download')
                    .setLabel('Download')
                    .setStyle(ButtonStyle.Primary),
                new ButtonBuilder()
                    .setLabel('Watch Video')
                    .setStyle(ButtonStyle.Link)
                    .setURL(videoLink)
            );

        await message.channel.send({ embeds: [embed], components: [row] });

        // Attempt to delete the user's command message
        try {
            await message.delete();
        } catch (error) {
            console.error('Failed to delete the command message:', error);
        }
    },
};
