const Discord = require('discord.js');

module.exports = {
  name: 'bill',
  description: 'Calculate and display a bill for a list of items and their prices.',
  async execute(message, args) {
    // Check if the user provided any items and prices
    if (args.length === 0) {
      message.reply('Please provide a list of items and their prices.');
      return;
    }

    // Parse the arguments into items and their prices
    const items = [];
    let totalPrice = 0;
    args.forEach(arg => {
      const [itemName, itemPrice] = arg.split(':');
      if (!itemName || !itemPrice) {
        message.reply(`Invalid format for item: ${arg}. Please use format: ItemName:Price`);
        return;
      }
      const price = parseFloat(itemPrice);
      if (isNaN(price)) {
        message.reply(`Invalid price for item: ${arg}. Price must be a number.`);
        return;
      }
      items.push({ name: itemName, price: price });
      totalPrice += price;
    });

    // Generate the bill message
    const billEmbed = new Discord.MessageEmbed()
      .setColor('#0099ff')
      .setTitle('Bill')
      .setDescription('Here is your bill:')
      .setTimestamp();

    items.forEach(item => {
      billEmbed.addField(item.name, `$${item.price.toFixed(2)}`, true);
    });

    billEmbed.addField('Total', `$${totalPrice.toFixed(2)}`, true)
      .setImage('https://cdn.discordapp.com/attachments/1056903195961610275/1242682120141275176/standard_3.gif?ex=66671d29&is=6665cba9&hm=e71c9029429baf6d151ae124e7e31e639ebcc3bbfaa24e5d6ca365601f3be1dc&');

    // Send the bill message with GIF
    message.channel.send(billEmbed);
  },
};
