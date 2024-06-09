module.exports = {
  name: 'bill',
  description: 'Calculate the sum of numbers associated with each item.',
  async execute(message, args) {
    // Check if the user provided any items and numbers
    if (args.length === 0) {
      message.reply('Please provide a list of items and their numbers.');
      return;
    }

    // Parse the arguments into items and their numbers
    const items = [];
    let totalNumber = 0;
    args.forEach(arg => {
      const [itemName, itemNumber] = arg.split(':');
      if (!itemName || !itemNumber) {
        message.reply(`Invalid format for item: ${arg}. Please use format: ItemName:Number`);
        return;
      }
      const number = parseFloat(itemNumber);
      if (isNaN(number)) {
        message.reply(`Invalid number for item: ${arg}. Number must be a valid number.`);
        return;
      }
      items.push({ name: itemName, number: number });
      totalNumber += number;
    });

    // Generate the sum message
    let sumMessage = 'The Bill Is Ready:\n';
    items.forEach(item => {
      sumMessage += `${item.name}: ${item.number}\n`;
    });
    sumMessage += `\nTotal: ${totalNumber}`;

    // Send the sum message
    message.channel.send(sumMessage);
  },
};
