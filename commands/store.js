const { MessageEmbed, MessageActionRow, MessageButton, MessageButtonStyle } = require('discord.js');

module.exports = {
    name: 'store',
    description: 'Send an embedded message with download and video buttons.',
    async execute(message, args) {
        if (args.length < 5) {
            return message.channel.send('Usage: $store [custom_title] [image_url] [download_label] [download_url] [video_url]');
        }

        const [customTitle, imageUrl, downloadLabel, downloadLink, videoLink] = args;

        const embed = new MessageEmbed()
            .setColor('#BC13FE')
            .setTitle(customTitle)
            .setDescription('Click the buttons below to download or watch the video.')
            .setImage(imageUrl)
            .setFooter(`Download Link: ${downloadLink}`);

        const row = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setCustomId('download')
                    .setLabel(downloadLabel)
                    .setStyle(MessageButtonStyle.PRIMARY),
                new MessageButton()
                    .setLabel('Watch Video')
                    .setStyle(MessageButtonStyle.LINK)
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
