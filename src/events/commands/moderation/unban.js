const sendModerationDone = require('../../../libs/sendModerationDone');
const checkPermissions = require('../../../libs/checkPermissions');

async function unban(interaction) {

    // Get infos
    // getUser instead of getMember because the person is not in the guild
    const member = interaction.options.getUser('user');
    const reason = interaction.options.getString('reason');

    // Check permissions and hierarchy
    const ok = await checkPermissions(interaction, member, 'BanMembers');
    if (!ok) return;

    // Execute the punnishment
    await interaction.guild.bans.remove(member.id, { reason });

    // Display Moderation Message
    sendModerationDone(interaction, 'unbanned', member, null, reason);
}

module.exports = unban;