const { Events, EmbedBuilder } = require('discord.js');

module.exports = {
    name: Events.ThreadCreate,
    execute: async (client, thread) => {
        try {
            await thread.join();
        } catch (err) {
            console.log(err);
        }
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
            // const log = await Servers.getLogger(thread.guildId, logType.threadCreate);
            // if (!log) return;

            const user = await client.users.fetch(thread.ownerId);

            let channel = client.channels.cache.get('990186368237989948');

            const embed = new EmbedBuilder()
                .setAuthor({ name: thread.guild.name, iconURL: thread.guild.iconURL() })
                .setDescription([`<:create:1089903750879133736> **${cnType[thread.type]}** Created **${thread.name}**`, '', `**Owner:** ${user.toString()} (\`${user.id}\`)`].join('\n'))
                .setColor(0x141318)
                .addFields(
                    { name: 'Channel', value: `${thread.toString()} (\`${thread.id.toString()}\`)`, inline: true },
                    { name: 'Created Time', value: `<t:${Math.floor(thread.createdTimestamp / 1000)}:R> - (<t:${Math.floor(thread.createdTimestamp / 1000)}>)`, inline: true },
            )
                .setFooter({ text: client.user.username, iconURL: client.user.displayAvatarURL() })
                .setTimestamp();
                await channel.send({embeds: [embed] });
        } catch (error) {
            console.log(error);
        }
    }
}