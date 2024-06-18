const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');

module.exports = {
    name: 'store',
    description: 'Send an embedded message with download and video buttons.',
    async execute(message, args) {
        if (args.length < 4) {
            return message.channel.send('Usage: $store [image_url] [download_label] [download_url] [video_url]');
        }

        const [imageUrl, downloadLabel, downloadLink, videoLink] = args;

        const embed = new MessageEmbed()
            .setColor('#BC13FE')
            .setTitle('ZX STORE')
            .setDescription('Click the buttons below to download or watch the video.')
            .setImage(imageUrl)
            .setFooter(JSON.stringify({ downloadLink, imageUrl })); // Store download link and image URL in footer as JSON string

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
            const sentMessage = await message.channel.send({ embeds: [embed], components: [row] });
            await message.delete();
            return sentMessage; // Return the sent message object to access it later
        } catch (error) {
            console.error('Error sending message:', error);
            message.channel.send('There was an error while trying to send the store message.');
        }
    },
};
