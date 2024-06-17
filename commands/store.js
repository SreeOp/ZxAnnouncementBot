const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');
const { addDownloadLink, addWatchLink } = require('../data/database');

module.exports = {
    name: 'store',
    description: 'Store a download link and a watch video link',
    async execute(message, args) {
        if (args.length < 2) {
            return message.channel.send('Please provide a download link and a watch video link.');
        }

        const downloadLink = args[0];
        const watchLink = args[1];
        const messageId = message.id;

        addDownloadLink(messageId, downloadLink);
        addWatchLink(messageId, watchLink);

        const embed = new MessageEmbed()
            .setTitle('Download and Watch')
            .setDescription('Click the buttons below to download or watch the video.')
            .setImage('YOUR_IMAGE_URL_HERE') // Replace with your image URL
            .setColor('#0099ff');

        const row = new MessageActionRow().addComponents(
            new MessageButton()
                .setCustomId(`download_${messageId}`)
                .setLabel('Download')
                .setStyle('PRIMARY'),
            new MessageButton()
                .setCustomId(`watch_${messageId}`)
                .setLabel('Watch Video')
                .setStyle('SECONDARY')
        );

        await message.channel.send({ embeds: [embed], components: [row] });
    },
};
