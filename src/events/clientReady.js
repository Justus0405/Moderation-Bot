const { ActivityType } = require("discord.js");

module.exports = (client) => {
    // This function runs code once the bot is ready.

    client.once('clientReady', async () => {
        console.log(`[  ] ${client.user.tag} is online!`);

        // Set Presence.
        const updatePresence = () => {
            client.user.setPresence({
                activities: [{ name: `Beep Boop`, type: ActivityType.Custom }],
                status: 'online',
            });
        }

        // Inital Presence.
        updatePresence();

        // Update Presence every 1 minute.
        // This is needed because otherwise the status randomly gets blank idk.
        const sendPresenceInterval = setInterval(() => {
            //console.log('[  ] Updating Presence...');
            updatePresence();
        }, 60000);
    });
};