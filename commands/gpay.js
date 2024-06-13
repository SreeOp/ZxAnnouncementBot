const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'pay',
  description: 'Uploading Payment Scanner',
  execute(message, args) {
    // Delete the user's message that triggered the command (if permissions allow)
    message.delete().catch(console.error);

    const initialEmbed = new MessageEmbed()
      .setColor('#0099ff')
      .setTitle('Gpay')
      .setDescription('Uploading Payment Scanner')
      .setTimestamp();

    // Send the initial embed as a reply and store the sent message
    message.reply({ embeds: [initialEmbed] }).then(sentMessage => {
      // Calculate the time difference between message creation and reply creation
      const ping = sentMessage.createdTimestamp - message.createdTimestamp;

      // Create an updated embed with payment method details and an image
      const updatedEmbed = new MessageEmbed()
        .setColor('#0099ff')
        .setTitle('Payment Method')
        .setDescription('Google Pay')
        .setImage('https://cdn.discordapp.com/attachments/1056903195961610275/1242682120141275176/standard_3.gif')
        .setTimestamp();

      // Edit the sent message to update it with the new embed
      sentMessage.edit({ embeds: [updatedEmbed] }).catch(console.error);
    }).catch(console.error);
  },
};
