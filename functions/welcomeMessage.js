const { MessageEmbed } = require('discord.js');

module.exports = (client) => {
    client.on('guildMemberAdd', async (member) => {
        try {
            // Create an embed message
            const welcomeEmbed = new MessageEmbed()
                .setColor('#0099ff')
                .setTitle('Welcome to the Server!')
                .setDescription(`Hello ${member.user.username}, welcome to ${member.guild.name}! We're glad to have you here.`)
                .setThumbnail(member.user.avatarURL())
                .setTimestamp()
                .setFooter('Enjoy your stay!', member.guild.iconURL());

            // Send the embed to the user's DMs
            await member.send({ embeds: [welcomeEmbed] });
        } catch (error) {
            console.error('Error sending welcome message:', error);
        }
    });
};
