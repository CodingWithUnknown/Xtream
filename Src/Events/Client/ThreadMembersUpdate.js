const { Events, EmbedBuilder } = require('discord.js');

module.exports = {
    name: Events.ThreadMembersUpdate,
    execute: async (client, oldMembers, mewMembers) => {
        try {
            const cnType = {
                0: 'Text Channel',
                2: 'Voice Channel',
                4: 'Category',
                13: 'Stage Channel',
                5: 'Announcement Channel',
                14: 'Directory Channel',
                15: 'Forum Channel',
                12: 'Private Thread Channel',
                11: 'Public Thread Channel',
                10: 'News Thread Channel',
            }
            const thread = oldMembers.first()?.thread ?? mewMembers.first()?.thread;
            // const log = await Servers.getLogger(thread.guild.id, logType.threadMembersUpdate);
            // if (!log) return

            let channel = client.channels.cache.get('990186368237989948');

            if (oldMembers.size != mewMembers.size) {
                const memberAdded = mewMembers.filter(x => !oldMembers.get(x.id));
                const memberRemoved = oldMembers.filter(x => !mewMembers.get(x.id));
                if (memberAdded.size != 0 || memberRemoved.size != 0) {
                    const memberAddedString = [];
                    for (const role of [...memberAdded.values()]) {
                        memberAddedString.push(`${thread.guild.members.cache.get(role.id)}`);
                    }
                    const memberRemovedString = [];
                    for (const role of [...memberRemoved.values()]) {
                        memberRemovedString.push(`${thread.guild.members.cache.get(role.id)}`);
                    }
                    const embed = new EmbedBuilder()
                        .setAuthor({ name: thread.guild.name, iconURL: thread.guild.iconURL() })
                        .setColor(0x141318)
                        .setDescription(`<:up_n:1089775058026766377> **${cnType[thread.type]}** Members Updated **${thread.name}**`)
                        .addFields(
                            { name: `Member Added (${memberAdded.size})`, value: memberAddedString.join('\n') || 'None', inline: true },
                            { name: `Member Removed (${memberRemoved.size})`, value: memberRemovedString.join('\n') || 'None', inline: true },
                        )
                        .setFooter({ text: client.user.username, iconURL: client.user.displayAvatarURL() })
                        .setTimestamp();
                        await channel.send({embeds: [embed] });
                }
            }
        } catch (error) {
            console.log(error);
        }
    }
}