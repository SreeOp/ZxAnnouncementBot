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
    let billMessage = 'Here is your bill:\n';
    items.forEach(item => {
      billMessage += `${item.name}: $${item.price.toFixed(2)}\n`;
    });
    billMessage += `\nTotal: $${totalPrice.toFixed(2)}`;

    // Send the bill message
    message.channel.send(billMessage);
  },
};
