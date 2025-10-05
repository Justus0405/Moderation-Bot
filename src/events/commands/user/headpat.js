const { EmbedBuilder } = require('discord.js');

async function headpat(interaction) {

    // Get infos
    const member = interaction.options.getMember('user');

    const embed = new EmbedBuilder()
        .setTitle('Pat Pat')
        .setDescription(`${interaction.user} gave you headpats :3`)
        .setImage('https://c.tenor.com/KyGPQuYCdYkAAAAd/tenor.gif')
        .setColor(0x89b4fa);

    await interaction.reply({
        content: `${member}`,
        embeds: [embed],
        allowedMentions: { users: [member.id] }
    });
}

module.exports = headpat;