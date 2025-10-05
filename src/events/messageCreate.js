const sanitizeInput = require('../libs/sanitizeInput');

module.exports = (client) => {
    // Do somthing when a new message is written.

    client.on('messageCreate', async (message) => {

        // Ignore bot messages.
        if (message.author.bot) return;

        // sanitize input message from weird characters.
        const sanitizedMessage = await sanitizeInput(message.content.toLowerCase());

        // Crazy? I was crazy once.
        if (sanitizedMessage.includes('crazy')) {
            message.reply('Crazy? I was crazy once');
        }
    });

}