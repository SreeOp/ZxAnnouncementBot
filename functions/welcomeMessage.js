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
                .setImage('https://cdn.discordapp.com/attachments/1252647416750936075/1252647490113634324/1228_1-ezgif.com-video-to-gif-converter.gif?ex=6672fa62&is=6671a8e2&hm=f9e012d90b6b1e669f1b700e5941ce8c699b1e8fb92e67eb44262df2e2ba268a&') // Add your GIF URL here
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
