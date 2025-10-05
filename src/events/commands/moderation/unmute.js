const sendModerationDone = require('../../../libs/sendModerationDone');
const checkPermissions = require('../../../libs/checkPermissions');

async function unmute(interaction) {

    // Get infos
    const member = interaction.options.getMember('user');
    const reason = interaction.options.getString('reason');

    // Check permissions and hierarchy
    const ok = await checkPermissions(interaction, member, 'ModerateMembers');
    if (!ok) return;

    // Execute the punnishment
    await member.timeout(null, reason);

    // Display Moderation Message
    sendModerationDone(interaction, 'unmuted', member, null, reason);
}

module.exports = unmute;