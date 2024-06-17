const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');

module.exports = {
    name: 'store',
    description: 'Displays store information with download and video options.',
    async execute(message, args) {
        // Create an embed for the store information
        const embed = new MessageEmbed()
            .setColor('#0099ff')
            .setTitle('Welcome to WZX STORE')
            .setDescription('Check out our latest offerings!')
            .setImage('https://example.com/store-image.png') // Replace with your store image URL
            .setFooter('Download link: https://example.com/download-link');

        // Create two buttons: Download and Watch Video
        const row = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setCustomId('download')
                    .setLabel('Download')
                    .setStyle('PRIMARY'),
                new MessageButton()
                    .setLabel('Watch Video')
                    .setURL('https://example.com/watch-video')
                    .setStyle('LINK')
            );

        // Send the embed with buttons to the channel
        await message.channel.send({ embeds: [embed], components: [row] });
    },
};
