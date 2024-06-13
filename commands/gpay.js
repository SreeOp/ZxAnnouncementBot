const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'pay',
  description: 'Display payment details with an image',
  execute(message, args, commandList) {
    // Create a new MessageEmbed object
    const embed = new MessageEmbed()
      .setColor('#0099ff')
      .setTitle('Payment')
      .setDescription('Pay')
      .setImage('https://cdn.discordapp.com/attachments/1167836302239084586/1198202736924168252/FN3.png');

    // Send the embed message to the same channel
    message.channel.send({ embeds: [embed] }).catch(console.error);
  },
};
