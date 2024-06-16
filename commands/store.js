const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'store',
    description: 'Send an embedded message with download and video buttons.',
    execute(message, args) {
        if (args.length < 3) {
            return message.channel.send('Usage: $embed [image_url] [download_url] [video_url]');
        }

        const imageUrl = args[0];
        const downloadLink = args[1];
        const videoLink = args[2];

        const embed = new MessageEmbed()
            .setColor('#0099ff')
            .setTitle('Custom Embed Message')
            .setDescription('Click the buttons below to download or watch the video.')
            .setImage(imageUrl);

        const row = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setStyle('LINK')
                    .setLabel('Download')
                    .setURL(downloadLink),
                new MessageButton()
                    .setStyle('LINK')
                    .setLabel('Watch Video')
                    .setURL(videoLink)
            );

        message.channel.send({ embeds: [embed], components: [row] })
            .catch(err => {
                console.error('Error sending message:', err);
                message.channel.send('There was an error while executing the command.');
            });
    },
};
