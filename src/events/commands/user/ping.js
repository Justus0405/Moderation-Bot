const { EmbedBuilder } = require('discord.js');

async function ping(interaction, client) {

    // Get infos
    await interaction.deferReply();
    const reply = await interaction.fetchReply();
    const ping = reply.createdTimestamp - interaction.createdTimestamp;

    const embed = new EmbedBuilder()
        .setTitle('Latency')
        .setDescription(`Client: \`${ping}ms\`\n\nServer: \`${client.ws.ping}ms\`\n`)
        .setColor(0x89b4fa);

    interaction.editReply({ embeds: [embed], flags: 64 });
}

module.exports = ping;