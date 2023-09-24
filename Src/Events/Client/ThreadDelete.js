const { Events, EmbedBuilder } = require('discord.js');

module.exports = {
    name: Events.ThreadDelete,
    execute: async (client, thread) => {
        try {
            // const log = await Servers.getLogger(thread.guild.id, logType.threadDelete);
            // if (!log) return
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
            const user = await client.users.fetch(thread.ownerId);

            let channel = client.channels.cache.get('990186368237989948');

            const embed = new EmbedBuilder()
                .setAuthor({ name: thread.guild.name, iconURL: thread.guild.iconURL() })
                .setDescription([`<:delete:1088764990938427423> **${cnType[thread.type]}** Deleted **${thread.name}**`, '', `**Owner:** ${user.toString()} (\`${user.id}\`)`].join('\n'))
                .setColor(0x2d2c31)
                .addFields(
                    { name: 'Channel', value: `${thread.toString()} (\`${thread.id.toString()}\`)`, inline: true },
                    { name: 'Created Time', value: `<t:${Math.floor(thread.createdTimestamp / 1000)}:R> - (<t:${Math.floor(thread.createdTimestamp / 1000)}>)`, inline: true },
                    { name: 'Deleted Time', value: `<t:${Math.floor(Date.now() / 1000)}:R> - (<t:${Math.floor(Date.now() / 1000)}>)`, inline: false },
                )
                .setFooter({ text: client.user.username, iconURL: client.user.displayAvatarURL() })
                .setTimestamp();
            await channel.send({embeds: [embed] });
        } catch (err) {
            console.log(err);
        }
    }
}