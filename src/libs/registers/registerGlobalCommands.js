require('dotenv').config({ quiet: true });
const { REST, Routes, ApplicationCommandOptionType, PermissionFlagsBits, } = require('discord.js');

const punishmentApply = [
    'User engaged in harassment, slurs, or personal attacks.',
    'User made threats of violence or encouraged self-harm.',
    'User promoted external products, services, or other servers.',
    'User violated Discord’s Terms of Service or Community Guidelines.',
    'User posted an excessive number of messages in one or multiple chats',
    'User posted explicit, offensive, or otherwise NSFW content.',
    'User posted graphic, gory, or violent content.',
    'User posted in incorrect channels or ignored channel topics.',
    'User posted scam, phishing, or fraudulent links.',
    'User shared illegal, pirated, or malicious content.',
    'User shared personal information or private data without consent.',
    'User abused alternative accounts to evade punishments.',
    'User refused to follow staff instructions.',
    'User impersonated staff, members, or public figures.',
    'User participated in raids, coordinated attacks, or mass-mention spam.',
    'User used languages other than allowed in moderated areas.',
    'User disrupted discussions with irrelevant or off-topic content.'
];

const punishmentResolve = [
    'Evidence did not support maintaining the punishment.',
    'New evidence showed the punishment was unnecessary.',
    'Punishment was issued in error.',
    'Punishment was lifted at staff discretion.',
    'Punishment was removed as part of a server-wide reset.',
    'The issue was resolved through discussion.',
    'The user demonstrated understanding of the rules.',
    'The user successfully appealed the punishment.'
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