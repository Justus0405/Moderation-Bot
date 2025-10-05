require('dotenv').config({ quiet: true });
const { REST, Routes, ApplicationCommandOptionType, PermissionFlagsBits, } = require('discord.js');

// Define Rules in an array.
const ruleTexts = [
    'Harassment, slurs, or personal attacks either implied or direct.',
    'Explicit, offensive, or NSFW messages and content.',
    'Flooding chats with messages, links, reactions, or mentions.',
    'Promoting products, services, or other servers.',
    'Sharing personal info or private messages.',
    'Pretending to be staff, other members, or public figures.',
    'Alt accounts or tactics to bypass bans or mutes.',
    'Broken Discord’s Terms of Service or Community Guidelines.',
    'Did not follow staff instructions.',
    'Did not keep discussions relevant to the channel.',
    'Did not post content in the right channel.',
    'Did not use only English or German for clarity and moderation.'
];

// Format the rules so discord likes it.
const rules = ruleTexts.map(text => ({ name: text, value: text }));

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
                choices: rules
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
                required: true
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
                choices: rules

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
                choices: rules
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
                required: true
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