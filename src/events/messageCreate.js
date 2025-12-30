const checkInputSanitization = require('../libs/checks/checkInputSanitization');

module.exports = (client) => {
    // Do somthing when a new message is written.

    client.on('messageCreate', async (message) => {

        // Ignore bot messages.
        if (message.author.bot) return;

    });

}