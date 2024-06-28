const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');

module.exports = {
    name: 'embedstaff',
    description: 'Send an embedded message with an image and a Show Staff button.',
    async execute(message, args) {
        if (args.length < 1) {
            return message.channel.send('Usage: $embedstaff [image_url]');
        }

        const [imageUrl] = args;

        const embed = new MessageEmbed()
            .setColor('#BC13FE')
            .setTitle('Staff Information')
            .setDescription('Click the button below to view the staff members.')
            .setImage(imageUrl);

        const row = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setCustomId('show_staff')
                    .setLabel('Show Staff')
                    .setStyle('PRIMARY')
            );

        try {
            await message.channel.send({ embeds: [embed], components: [row] });
            await message.delete();
        } catch (error) {
            console.error('Error sending message:', error);
            message.channel.send('There was an error while trying to send the embed message.');
        }
    },
};
