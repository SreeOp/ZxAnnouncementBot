const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'ppay',
  description: 'Send an embedded message with an image',
  async execute(message, args) {
    // Check if there are any arguments provided
    if (args.length === 0) {
      message.reply('Please provide additional details for the payment.');
      return;
    }

    // Join the arguments into a single string (assuming they represent details)
    const paymentDetails = args.join(' ');

    // Delete the user's message that triggered the command (if permissions allow)
    try {
      await message.delete();
    } catch (error) {
      console.error(`Error deleting user message: ${error}`);
    }

    // Construct the embed message
    const embed = new MessageEmbed()
      .setColor('#0099ff') // You can set the color of the embed here
      .setTitle('Payment Details')
      .setDescription(paymentDetails)
      .setImage('https://cdn.discordapp.com/attachments/1167836302239084586/1198202736924168252/FN3.png?ex=666b6982&is=666a1802&hm=1681987af9a97642fc1a9d136d010a3e293d349729eb122f10f2b56ae44d5561&') // Replace with the URL of your image

    // Send the embed message to the same channel
    try {
      await message.channel.send(embed);
    } catch (error) {
      console.error(`Error sending embed message: ${error}`);
    }
  },
};
