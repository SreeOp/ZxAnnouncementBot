const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
const { encode } = require('querystring');

module.exports = {
    name: 'store',
    description: 'Send an embedded message with download and video buttons.',
    async execute(message, args) {
        if (args.length < 4) {
            return message.channel.send('Usage: $store [image_url] [download_label] [download_url] [video_url]');
        }

        const [imageUrl, downloadLabel, downloadLink, videoLink] = args;

        // Encode the download link to hide it in the embed's footer
        const encodedDownloadLink = encode(downloadLink);

        const embed = new MessageEmbed()
            .setColor('#BC13FE')
            .setTitle('ZX STORE')
            .setDescription('Click the buttons below to download or watch the video.')
            .setImage(imageUrl)
            .setFooter(encodedDownloadLink);

        const row = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setCustomId('download')
                    .setLabel(downloadLabel)
                    .setStyle('PRIMARY'),
                new MessageButton()
                    .setLabel('Watch Video')
                    .setStyle('LINK')
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
