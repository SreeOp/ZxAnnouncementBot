const { EmbedBuilder } = require('discord.js');

module.exports = {
  name: 'pay',
  description: 'Display a list of available commands',
  execute(message, args, commandList) {
    const embed = new EmbedBuilder()
      .setColor('#0099ff')
      .setTitle('Bot Commands')
      .setDescription('▶️  **Here are the available commands :**\n‎ ')
      .addImage('https://cdn.discordapp.com/attachments/1167836302239084586/1198202736924168252/FN3.png?ex=666b6982&is=666a1802&hm=1681987af9a97642fc1a9d136d010a3e293d349729eb122f10f2b56ae44d5561&')
