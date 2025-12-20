require('dotenv').config({ quiet: true });
const { REST, Routes, ApplicationCommandOptionType, PermissionFlagsBits, } = require('discord.js');

// Source: https://discord.com/guidelines
const punishmentApply = [
    "Promoted or engaged in harassment. [1]",
    "Threatened harm to an individual or group. [2]",
    "Shared or threatened to share PII without consent. [3]",
    "Used hate speech or engaged in hateful conduct. [4]",
    "Supported or promoted violent extremism. [5]",
    "Created or shared child sexual abuse material. [6]",
    "Engaged in unsafe sexual conduct while under 18. [7]",
    "Engaged in sexual conduct with a minor. [8]",
    "Provided sexually explicit content to minors. [9]",
    "Shared explicit content of adults without consent. [10]",
    "Shared content promoting suicide or self-harm. [11]",
    "Shared violent, gory, or animal cruelty content to shock or harass. [12]",
    "Sent spam or unsolicited bulk messages. [13]",
    "Used self-bots or user-bots. [14]",
    "Shared false or misleading information. [17]",
    "Misrepresented identity in a harmful or deceptive way. [18]",
    "Evaded Discord or server enforcement actions. [19]",
    "Compromised account, network, or system security. [20]",
    "Used Discord to promote or execute scams. [21]",
    "Committed fraud for financial gain. [22]",
    "Submitted false or abusive reports. [23]",
    "Shared content violating intellectual property rights. [24]",
    "Sold or promoted regulated or dangerous goods. [25]",
    "Participated in illegal gambling. [26]",
    "Engaged in illegal activity harming others' safety or wellbeing. [27]"
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