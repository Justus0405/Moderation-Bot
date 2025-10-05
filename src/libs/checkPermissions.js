const sendErrorMessage = require("./sendErrorMessage");

async function checkPermissions(interaction, targetMember, permission) {

    const executorRolePosition = interaction.member.roles.highest.position;
    const targetRolePosition = targetMember?.roles?.highest?.position ?? null;

    // Executor hierarchy check. Skip if target is not in guild.
    if (targetRolePosition !== null && targetRolePosition >= executorRolePosition) {
        sendErrorMessage(interaction, "You can't punish this user because their role is higher or equal to yours!");
        return false;
    }

    // Bot hierarchy check. Skip if target is not in guild.
    if (targetRolePosition !== null && !targetMember.moderatable) {
        sendErrorMessage(interaction, "I can't punish this user because their role is above mine!");
        return false;
    }

    // Executor permission check.
    if (!interaction.member.permissions.has(permission)) {
        sendErrorMessage(interaction, "You don't have the permission needed to execute this command!");
        return false;
    }

    // Bot permission check.
    if (!interaction.guild.members.me.permissions.has(permission)) {
        sendErrorMessage(interaction, "The bot doesn't have the permission to execute this command!");
        return false;
    }

    // All checks passed.
    return true;
}

module.exports = checkPermissions;
