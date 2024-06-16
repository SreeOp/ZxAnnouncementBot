const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');

module.exports = {
    name: 'store',
    description: 'Send an embedded message with download and video buttons.',
    async execute(message, args) {
        if (args.length < 4) {
            return message.channel.send('Usage: $store [image_url] [download_label] [download_url] [video_url]');
        }

        const imageUrl = args[0];
        const downloadLabel = args[1];
        const downloadLink = args[2];
        const videoLink = args[3];

        const embed = new MessageEmbed()
            .setColor('#0099ff')
            .setTitle('Custom Store Message')
            .setDescription('Click the buttons below to download or watch the video.')
            .setImage(imageUrl);

        const row = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setCustomId('download')
                    .setLabel(downloadLabel)
                    .setStyle('PRIMARY')
                    .setURL(downloadLink),
                new MessageButton()
                    .setLabel('Watch Video')
                    .setStyle('LINK')
                    .setURL(videoLink)
            );

        try {
            await message.channel.send({ embeds: [embed], components: [row] });

            // Attempt to delete the user's command message
            await message.delete();
        } catch (error) {
            console.error('Error sending message:', error);
            message.channel.send('There was an error while trying to send the store message.');
        }
    },
};
