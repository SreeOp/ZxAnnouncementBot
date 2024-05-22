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
        .setImage(`https://cdn.discordapp.com/attachments/1056903195961610275/1242682120141275176/standard_3.gif?ex=664eb969&is=664d67e9&hm=63d30f8533214bdab9e3660a6e4ee7a5a4f81db3cc3c796fe4b84d671c11c8be&`)
        .setTimestamp();

      sentMessage.edit({ embeds: [updatedPingEmbed] });
    });
  },
};
