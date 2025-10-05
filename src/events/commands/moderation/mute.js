const sendModerationDone = require('../../../libs/sendModerationDone');
const checkPermissions = require('../../../libs/checkPermissions');
const convertTime = require('../../../libs/convertTime');

async function mute(interaction) {

    // Get infos
    const member = interaction.options.getMember('user');
    const duration = interaction.options.getString('duration');
    const reason = interaction.options.getString('reason');
    const durationMillis = await convertTime(interaction, duration);

    // Stop when convertTime returns null
    if (!durationMillis) return;

    // Check permissions and hierarchy
    const ok = await checkPermissions(interaction, member, 'ModerateMembers');
    if (!ok) return;

    // Execute the punnishment
    await member.timeout(durationMillis, reason);

    // Display Moderation Message
    sendModerationDone(interaction, 'muted', member, duration, reason);
}

module.exports = mute;