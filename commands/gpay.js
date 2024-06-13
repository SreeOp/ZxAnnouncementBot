const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'pay',
  description: 'Send payment details with an image',
  execute(message, args, commandList) {
    // Check if there are any arguments provided
    if (args.length === 0) {
      // Optionally, you can add a reply if desired, or remove this block entirely.
      // message.reply('Please provide payment details.');
      return;
    }

    // Join the arguments into a single string (assuming they represent payment details)
    const paymentDetails = args.join(' ');

    // Delete the user's message that triggered the command (if permissions allow)
    message.delete().catch(console.error);

    // Construct the embed message using MessageEmbed
    const embed = new MessageEmbed()
      .setColor('#0099ff')
      .setTitle('Payment Details')
      .setDescription(paymentDetails)
      .setImage('https://cdn.discordapp.com/attachments/1167836302239084586/1198202736924168252/FN3.png')
      // Replace with the actual URL of your image

    // Send the embed message to the same channel
    message.channel.send({ embeds: [embed] }).catch(console.error);
  },
};
