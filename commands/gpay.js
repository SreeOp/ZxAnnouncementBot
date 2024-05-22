const { EmbedBuilder } = require('discord.js');

module.exports = {
  name: 'pay',
  description: 'Uploading Payment Scanner',
  execute(message, args) {
    const pingEmbed = new EmbedBuilder()
      .setColor('#0099ff')
      .setTitle('Gpay')
      .setDescription('Uploading Payment Scanner')
      .setTimestamp();

    message.reply({ embeds: [pingEmbed] }).then(sentMessage => {
      const ping = sentMessage.createdTimestamp - message.createdTimestamp;

      const updatedPingEmbed = new EmbedBuilder()
        .setColor('#0099ff')
        .setTitle('Payment Method')
        .setDescription(`Google Pay`)
        .setTimestamp();

      sentMessage.edit({ embeds: [updatedPingEmbed] });
    });
  },
};
