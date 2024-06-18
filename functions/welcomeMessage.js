const { EmbedBuilder } = require('discord.js');

module.exports = (client, welcomeChannelId) => {
    client.on('guildMemberAdd', async (member) => {
        try {
            // Create an embed message
            const welcomeEmbed = new EmbedBuilder()
                .setColor('#BC13FE')
                .setTitle('Welcome to the Server!')
                .setDescription(`Hello ${member.user.username}, welcome to ${member.guild.name}! We're glad to have you here.`)
                .setThumbnail(member.user.avatarURL())
                .setTimestamp()
                .setFooter({ text: 'Enjoy your stay!', iconURL: member.guild.iconURL() });

            // Send the embed to the specified channel
            const channel = member.guild.channels.cache.get(welcomeChannelId);
            if (channel) {
                await channel.send({ embeds: [welcomeEmbed] });
            } else {
                console.error('Welcome channel not found.');
            }
        } catch (error) {
            console.error('Error sending welcome message:', error);
        }
    });
};
