const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

module.exports = {
    name: 'store',
    description: 'Send an embedded message with download and video buttons.',
    async execute(message, args) {
        try {
            if (args.length < 3) {
                return message.channel.send('Usage: $store [image_url] [download_url] [video_url]');
            }

            const imageUrl = args[0];
            const downloadLink = args[1];
            const videoLink = args[2];

            const embed = new EmbedBuilder()
                .setColor('#0099ff')
                .setTitle('Custom Store Message')
                .setDescription('Click the buttons below to download or watch the video.')
                .setImage(imageUrl);

            const row = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                        .setCustomId('download')
                        .setLabel('Download')
                        .setStyle(ButtonStyle.Primary),
                    new ButtonBuilder()
                        .setLabel('Watch Video')
                        .setStyle(ButtonStyle.Link)
                        .setURL(videoLink)
                );

            const sentMessage = await message.channel.send({ embeds: [embed], components: [row] });

            const filter = i => i.customId === 'download' && i.user.id === message.author.id;
            const collector = sentMessage.createMessageComponentCollector({ filter, time: 60000 });

            collector.on('collect', async i => {
                if (i.customId === 'download') {
                    await i.deferUpdate();
                    await i.user.send(`Here is your download link: ${downloadLink}`);
                }
            });

            collector.on('end', collected => {
                console.log(`Collected ${collected.size} interactions.`);
            });

        } catch (error) {
            console.error('Error executing command:', error);
            message.channel.send('There was an error while executing the command.');
        }
    },
};
