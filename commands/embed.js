const { EmbedBuilder } = require('discord.js');

module.exports = {
  name: 'embed',
  description: 'embed example',
  execute(message, args, commandList) {
    const embed = new EmbedBuilder()
    .setColor(0x0099FF)
    .setTitle('This is Title')
    .setDescription('Some description here')
    .setThumbnail('https://media.discordapp.net/attachments/1167836302239084586/1198200591508312135/FN1.png?ex=664e6682&is=664d1502&hm=9e0a32f74b328510c16bafa9b5db6b2b883be7597d49dd29bc2466c27dd40079&')
    .addFields(
      { name: 'Field Name ', value: 'Some value here' },
       { name: 'ZyroniX', value: 'Developer' },
    )
    .setImage('https://cdn.discordapp.com/attachments/1056903195961610275/1242682120141275176/standard_3.gif?ex=664eb969&is=664d67e9&hm=63d30f8533214bdab9e3660a6e4ee7a5a4f81db3cc3c796fe4b84d671c11c8be&')
    .setTimestamp()
    .setFooter({ text: 'Some footer text here' });

    message.reply({ embeds: [embed] });
  },
};
