require('dotenv').config({ quiet: true });
const { REST, Routes, ApplicationCommandOptionType, PermissionFlagsBits, } = require('discord.js');

//
// DEPRICATED
//

const commands = [];

const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

(async () => {
    try {
        console.log('[  ] Registering local slash commands...');

        await rest.put(
            Routes.applicationGuildCommands(
                process.env.CLIENT_ID,
                process.env.GUILD_ID
            ),
            { body: commands }
        );

        console.log('[  ] Local slash commands were registered successfully!');
    } catch (error) {
        console.log(error);
    }
})();