const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

module.exports = {
    name: 'embedstaff',
    description: 'Send an embedded message with an image and a show staff button.',
    async execute(message, args) {
        if (args.length < 1) {
            return message.channel.send('Usage: $embedstaff [image_url]');
        }

        const [imageUrl] = args;

        const embed = new EmbedBuilder()
            .setColor('#BC13FE')
            .setTitle('Staff Information')
            .setDescription('Click the button below to show staff members.')
            .setImage(imageUrl);

        const row = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId('show_staff')
                    .setLabel('Show Staff')
                    .setStyle(ButtonStyle.Primary)
            );

        try {
            await message.channel.send({ embeds: [embed], components: [row] });
        } catch (error) {
            console.error('Error sending message:', error);
            message.channel.send('There was an error while trying to send the embed message.');
        }
    },
};
