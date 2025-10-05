const { EmbedBuilder } = require('discord.js');

async function sendModerationDone(interaction, punishment, member, duration, reason) {

    if (!duration) {
        const embed = new EmbedBuilder()
            .setTitle('Moderation')
            .setDescription(`${member} has been ${punishment}\nReason: \`${reason}\``)
            .setColor(0x89b4fa);
        interaction.reply({ embeds: [embed], flags: 64 });
    } else {
        const embed = new EmbedBuilder()
            .setTitle('Moderation')
            .setDescription(`${member} has been ${punishment}\nDuration: \`${duration}\`\nReason: \`${reason}\``)
            .setColor(0x89b4fa);
        interaction.reply({ embeds: [embed], flags: 64 });
    }
}

module.exports = sendModerationDone;