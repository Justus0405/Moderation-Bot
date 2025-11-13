const { EmbedBuilder } = require('discord.js');

async function sendErrorMessage(interaction, message) {

    const embed = new EmbedBuilder()
        .setTitle('ERROR')
        .setDescription(message)
        .setColor('#f38ba8')
        .setTimestamp();

    await interaction.reply({ embeds: [embed], flags: 64 });
}

module.exports = sendErrorMessage;