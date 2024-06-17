const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');

module.exports = {
    name: 'store',
    description: 'Displays the store information.',
    execute(message, args) {
        // Create an embed for store information
        const embed = new MessageEmbed()
            .setColor('#0099ff')
            .setTitle('Welcome to WZX STORE')
            .setDescription('Check out our latest products!')
            .setImage('https://example.com/store-image.jpg') // Replace with your store image URL
            .setTimestamp()
            .setFooter('Click a button below to take action');

        // Create buttons
        const downloadButton = new MessageButton()
            .setCustomId('download')
            .setLabel('Download')
            .setStyle('PRIMARY');

        const watchVideoButton = new MessageButton()
            .setCustomId('watch_video')
            .setLabel('Watch Video')
            .setStyle('SECONDARY')
            .setURL('https://example.com/watch-video'); // Replace with your video URL

        // Create action row for buttons
        const actionRow = new MessageActionRow()
            .addComponents(downloadButton, watchVideoButton);

        // Send the embed with buttons to the channel
        message.channel.send({ embeds: [embed], components: [actionRow] });
    },
};
