require('dotenv').config({ quiet: true });
const { REST, Routes, ApplicationCommandOptionType, PermissionFlagsBits, } = require('discord.js');

// Source: https://discord.com/guidelines
const punishmentApply = [
    "Promoted, coordinated, or engaged in harassment. [1]",
    "Threatened to harm another individual or group of people. [2]",
    "Shared or threatened to share personally identifiable information (PII) without consent. [3]",
    "Used hate speech or engaged in hateful conduct. [4]",
    "Organized, promoted, or supported violent extremism. [5]",
    "Created, posted, solicited, shared, or attempted to distribute content involving child sexual abuse. [6]",
    "Engaged in unsafe sexual or risky conduct while under the age of 18. [7]",
    "Engaged in sexual conduct with someone under the age of 18. [8]",
    "Made sexually explicit content available to individuals under the age of 18. [9]",
    "Shared, distributed, or created sexually explicit or suggestive content of adults without explicit consent. [10]",
    "Shared content that glorified, promoted, or normalized suicide or self-harm. [11]",
    "Uploaded or shared material depicting violence, gore, or animal cruelty with intent to shock or harass. [12]",
    "Sent unsolicited bulk messages or spam. [13]",
    "Used self-bots or user-bots. [14]",
    "Shared false or misleading information (misinformation). [17]",
    "Misrepresented identity in a deceptive or harmful way. [18]",
    "Evaded Discord, or server-level enforcement actions. [19]",
    "Engaged in activities that damaged or compromised account, network, or system security. [20]",
    "Used Discord to promote, coordinate, or execute financial scams. [21]",
    "Engaged in fraudulent activities to generate profit at the expense of others. [22]",
    "Submitted false, misleading, or abusive reports to the server support teams. [23]",
    "Shared content that violated intellectual property or other rights. [24]",
    "Organized, promoted, or facilitated the sale of regulated or dangerous goods. [25]",
    "Coordinated or participated in illegal gambling. [26]",
    "Organized, promoted, or engaged in illegal activity that harmed the dignity, safety, or wellbeing of others. [27]"
];

const punishmentResolve = [
    'Evidence did not support maintaining the punishment.',
    'New evidence showed the punishment was unnecessary.',
    'Punishment was issued in error.',
    'Punishment was lifted at staff discretion.',
    'Punishment was removed as part of a server-wide reset.',
    'Issue was resolved through discussion.',
    'User demonstrated understanding of the rules.',
    'User successfully appealed the punishment.'
];

// Format the arrays so discord likes it.
const punishmentApplyArray = punishmentApply.map(text => ({ name: text, value: text }));
const punishmentResolveArray = punishmentResolve.map(text => ({ name: text, value: text }));

const commands = [
    {
        name: 'help',
        description: 'Get information about the bot and its features',
    },
    {
        name: 'ping',
        description: 'Get information about the bots latency'
    },
    {
        name: 'headpat',
        description: 'Give a specified user headpats :3',
        options: [
            {
                name: 'user',
                description: 'The user you want to give headpats',
                type: ApplicationCommandOptionType.User,
                required: true
            }
        ]
    },
    {
        name: 'mute',
        description: 'Mute a specified user',
        default_member_permissions: PermissionFlagsBits.ModerateMembers.toString(),
        options: [
            {
                name: 'user',
                description: 'The user you want to mute',
                type: ApplicationCommandOptionType.User,
                required: true
            },
            {
                name: 'duration',
                description: 'The mute duration',
                type: ApplicationCommandOptionType.String,
                required: true
            },
            {
                name: 'reason',
                description: 'The mute reason',
                type: ApplicationCommandOptionType.String,
                required: true,
                choices: punishmentApplyArray
            },
        ]
    },
    {
        name: 'unmute',
        description: 'Unmute a specified user',
        default_member_permissions: PermissionFlagsBits.ModerateMembers.toString(),
        options: [
            {
                name: 'user',
                description: 'The user you want to unmute',
                type: ApplicationCommandOptionType.User,
                required: true
            },
            {
                name: 'reason',
                description: 'The unmute reason',
                type: ApplicationCommandOptionType.String,
                required: true,
                choices: punishmentResolveArray
            },
        ]
    },
    {
        name: 'kick',
        description: 'Kick a specified user',
        default_member_permissions: PermissionFlagsBits.KickMembers.toString(),
        options: [
            {
                name: 'user',
                description: 'The user you want to kick',
                type: ApplicationCommandOptionType.User,
                required: true
            },
            {
                name: 'reason',
                description: 'The kick reason',
                type: ApplicationCommandOptionType.String,
                required: true,
                choices: punishmentApplyArray

            },
        ]
    },
    {
        name: 'ban',
        description: 'Ban a specified user',
        default_member_permissions: PermissionFlagsBits.BanMembers.toString(),
        options: [
            {
                name: 'user',
                description: 'The user you want to ban',
                type: ApplicationCommandOptionType.User,
                required: true
            },
            {
                name: 'reason',
                description: 'The ban reason',
                type: ApplicationCommandOptionType.String,
                required: true,
                choices: punishmentApplyArray
            },
        ]
    },
    {
        name: 'unban',
        description: 'Unban a specified user',
        default_member_permissions: PermissionFlagsBits.BanMembers.toString(),
        options: [
            {
                name: 'user',
                description: 'The user you want to unban',
                type: ApplicationCommandOptionType.User,
                required: true
            },
            {
                name: 'reason',
                description: 'The unban reason',
                type: ApplicationCommandOptionType.String,
                required: true,
                choices: punishmentResolveArray
            },
        ]
    },
];

const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

(async () => {
    try {
        console.log('[  ] Registering global slash commands...');

        await rest.put(
            Routes.applicationCommands(process.env.CLIENT_ID),
            { body: commands }
        );

        console.log('[  ] Global slash commands were registered successfully!');
    } catch (error) {
        console.log(error);
    }
})();