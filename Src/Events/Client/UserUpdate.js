const { Events, EmbedBuilder } = require('discord.js');
const { MergeImages } = require('../../Models/Canvas')

module.exports = {
    name: Events.UserUpdate,
    execute: async (client, oldUser, newUser) => {
        if (oldUser.id === client.user.id) return;
        if (oldUser.partial) { await oldUser.fetch(); }
        if (oldUser.partial) return;

        await client.guilds.cache.forEach(async (x) => {
            x.members.cache.forEach(async (member, memberid) => {
                if (newUser.id === memberid) {
                    let guilds = null;
                    guilds = member.guild;
                }
            });
        });

        let channel = client.channels.cache.get('990186368237989948');

        if (oldUser.avatar !== newUser.avatar) {
            let file = await MergeImages(`https://cdn.discordapp.com/avatars/${oldUser.id}/${oldUser.avatar}.png`, `https://cdn.discordapp.com/avatars/${newUser.id}/${newUser.avatar}.png`);
            const embeds = new EmbedBuilder()
                .setAuthor({ name: newUser.tag, iconURL: newUser.avatarURL() })
                .setTitle('Member Avatar Changed')
                .setImage('attachment://image.png')
                .setDescription(`User avatar changed: [Old Avatar](${`https://cdn.discordapp.com/avatars/${oldUser.id}/${oldUser.avatar}.png`}) | [New Avatar](${`https://cdn.discordapp.com/avatars/${newUser.id}/${newUser.avatar}.png`})`)
                .setFooter({ text: client.user.username, iconURL: client.user.displayAvatarURL() })
                .setColor(0x2d2c31)
                .setTimestamp()
            await channel.send({ embeds: [embeds], files: [file] });
        }

        if (oldUser.username !== newUser.username) {
            const embeds = new EmbedBuilder()
                .setAuthor({ name: newUser.user.tag, iconURL: newUser.avatarURL() })
                .setTitle('Member Username Changed')
                .setDescription(`User username changed: **${oldUser.username}** | **${newUser.username}**`)
                .addFields({ name: 'Member', value: `<@${newUser.id}> \`(${newUser.id})\`` })
                .setFooter({ text: client.user.username, iconURL: client.user.displayAvatarURL() })
                .setColor(0x2d2c31)
                .setTimestamp()
            await channel.send({ embeds: [embeds] });
        }
    }
};