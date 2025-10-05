const { EmbedBuilder } = require('discord.js');

async function help(interaction) {
    const embed = new EmbedBuilder()
        .setTitle('Command Overview')
        .setDescription('Quick reference of all available commands.')
        .setColor(0x89b4fa)
        .addFields(
            {
                name: 'User Commands',
                value: [
                    '`/help` — Displays this message',
                    '`/ping` — Shows the bots latency',
                    '`/headpat <user>` — Give a user a headpat :3'
                ].join('\n'),
                inline: false,
            },
            {
                name: 'Moderation Commands',
                value: [
                    '`/mute <user> <duration> <reason>` — Mute a user',
                    '`/unmute <user> <reason>` — Unmute a user',
                    '`/kick <user> <reason>` — Kick a user',
                    '`/ban <user> <reason>` — Ban a user',
                    '`/unban <user> <reason>` — Unban a user'
                ].join('\n'),
                inline: false,
            }
        )
        .setTimestamp();

    await interaction.reply({ embeds: [embed], flags: 64 });
}

module.exports = help;