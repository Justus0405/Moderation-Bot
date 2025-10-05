const sendModerationDone = require('../../../libs/sendModerationDone');
const checkPermissions = require('../../../libs/checkPermissions');

async function ban(interaction) {

    // Get infos
    // getUser instead of getMember in case the person is not in the guild anymore
    const member = interaction.options.getUser('user');
    const reason = interaction.options.getString('reason');

    // Check permissions and hierarchy
    const ok = await checkPermissions(interaction, member, 'BanMembers');
    if (!ok) return;

    // Execute the punnishment
    await interaction.guild.bans.create(member.id, { reason });

    // Display Moderation Message
    sendModerationDone(interaction, 'banned', member, null, reason);
}

module.exports = ban;