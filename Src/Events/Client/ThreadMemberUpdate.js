const { Events, EmbedBuilder } = require('discord.js');

module.exports = {
    name: Events.ThreadMemberUpdate,
    execute: async (client, oldMember, newMember) => {
        try {
            // const log = await Servers.getLogger(oldMember.thread.guild.id, logType.threadMemberUpdate);
            // if (!log) return

            let channel = client.channels.cache.get('990186368237989948');

            if (oldMember.joinedTimestamp != newMember.joinedTimestamp) {
                const embed = new EmbedBuilder()
                    .setAuthor({ name: oldMember.thread.guild.name, iconURL: oldMember.thread.guild.iconURL({}) })
                    .setColor(0x141318)
                    .setDescription(`<:up_n:1089775058026766377> **Thread member updated in ${oldMember.thread.toString()}**`)
                    .addFields(
                        { name: `Member`, value: `${oldMember}`, inline: true },
                        { name: `Joined Timestamp`, value: `<t:${Math.floor(oldMember.joinedTimestamp / 1000)}:R> - (<t:${Math.floor(oldMember.joinedTimestamp / 1000)}>)`, inline: true },
                    )
                    .setFooter({ text: client.user.username, iconURL: client.user.displayAvatarURL({}) })
                    .setTimestamp();
                await channel.send({ embeds: [embed] });
            }
        } catch (err) {
            console.log(err);
        }
    }
}