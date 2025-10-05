const sendModerationDone = require('../../../libs/sendModerationDone');
const checkPermissions = require('../../../libs/checkPermissions');

async function kick(interaction) {

    // Get infos
    const member = interaction.options.getMember('user');
    const reason = interaction.options.getString('reason');

    // Check permissions and hierarchy
    const ok = await checkPermissions(interaction, member, 'KickMembers');
    if (!ok) return;

    // Execute the punnishment
    await member.kick(reason);

    // Display Moderation Message
    sendModerationDone(interaction, 'kicked', member, null, reason);
}

module.exports = kick;