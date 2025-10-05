require('dotenv').config({ quiet: true });
const { Client, IntentsBitField } = require('discord.js');

const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
    ]
});

// Bot token from .env file.
client.login(process.env.TOKEN);

// Call functions.
require('./events/clientReady')(client);

// Register Global Commands.
require('./libs/registerGlobalCommands');

// Events.
require('./events/messageCreate')(client);
require('./events/interactionCreate')(client);