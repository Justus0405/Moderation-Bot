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

// Register Global Commands.
require('./libs/registers/registerGlobalCommands');

// Call functions.
require('./events/clientReady')(client);

// Events.
require('./events/messageCreate')(client);
require('./events/interactionCreate')(client);