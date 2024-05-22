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
        .setTitle('GPay')
        .setDescription(`https://media.discordapp.net/attachments/1167836302239084586/1198200591508312135/FN1.png?ex=664e6682&is=664d1502&hm=9e0a32f74b328510c16bafa9b5db6b2b883be7597d49dd29bc2466c27dd40079&`)
        .setTimestamp();

      sentMessage.edit({ embeds: [updatedPingEmbed] });
    });
  },
};
