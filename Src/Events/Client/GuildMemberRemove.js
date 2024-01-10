const { Events, EmbedBuilder } = require('discord.js');

module.exports = {
    name: Events.GuildMemberRemove,
    execute: async (client, member) => {
        if (member.user.id === client.user.id) return
        if (member.partial) return;

        // const log = await Servers.getLogger(member.guild.id, logType.MemberLeave);

        let channel = client.channels.cache.get('990186368237989948');

        try {
            const ban = await member.guild.bans.fetch(member.id);
            if (ban) return;
        } catch (err) {
            // if (!log) return;
            const embed = new EmbedBuilder()
                .setAuthor({ name: member.user.tag, iconURL: member.user.displayAvatarURL() })
                .setTitle(`<:remove_user:1089772643416285244> Member Left`)
                .setColor(0x141318)
                .addFields(
                    { name: 'Member', value: `<@${member.id}> (\`${member.id}\`)`, inline: true },
                )
                .setFooter({ text: client.user.username, iconURL: client.user.displayAvatarURL() })
                .setTimestamp();
            await channel.send({ embeds: [embed] });
        }
    }
}