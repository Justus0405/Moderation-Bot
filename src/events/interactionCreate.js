// Commands User
const helpCommand = require('./commands/user/help')
const pingCommand = require('./commands/user/ping')
const headpatCommand = require('./commands/user/headpat')

// Commands Moderation
const muteCommand = require('./commands/moderation/mute')
const unmuteCommand = require('./commands/moderation/unmute')
const kickCommand = require('./commands/moderation/kick')
const banCommand = require('./commands/moderation/ban')
const unbanCommand = require('./commands/moderation/unban')

module.exports = (client) => {

    // Slash commands interactions.
    client.on('interactionCreate', async (interaction) => {
        if (!interaction.isChatInputCommand()) return;

        switch (interaction.commandName) {

            // User Commands.
            case 'help':
                helpCommand(interaction);
                break;
            case 'ping':
                pingCommand(interaction, client);
                break;
            case 'headpat':
                headpatCommand(interaction);
                break;

            // Moderation Commands.
            case 'mute':
                muteCommand(interaction);
                break;
            case 'unmute':
                unmuteCommand(interaction);
                break;
            case 'kick':
                kickCommand(interaction);
                break;
            case 'ban':
                banCommand(interaction);
                break;
            case 'unban':
                unbanCommand(interaction);
                break;

            // Unkown Commands.
            default:
                break;
        }
    });
}