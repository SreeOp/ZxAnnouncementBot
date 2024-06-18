const { EmbedBuilder } = require('discord.js');

module.exports = (client, welcomeChannelId) => {
    client.on('guildMemberAdd', async (member) => {
        try {
            // Create an embed message
            const welcomeEmbed = new EmbedBuilder()
                .setColor('#BC13FE')
                .setTitle('Welcome to the Server!')
                .setDescription(`Hello <@${member.id}>, welcome to ${member.guild.name}! We're glad to have you here.`)
                .setThumbnail(member.user.avatarURL())
                .setImage('https://media.discordapp.net/attachments/1056903195961610275/1252641958845878462/1228_1.mp4?ex=6672f53b&is=6671a3bb&hm=989bfc579d2958ad877998db7fdfedb52365060196696480675678e38fb38931&') // Add your GIF URL here
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
