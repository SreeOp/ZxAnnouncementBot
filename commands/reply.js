module.exports = {
  name: 'reply',
  description: 'Replies with a predefined message',
  execute(message, args) {
    // Define the reply message
    const replyMessage = 'This is the reply message.';

    // Send the reply message
    message.reply(replyMessage).catch(error => {
      console.error('Failed to send reply:', error);
      message.channel.send('There was an error trying to send the reply message.');
    });
  },
};
