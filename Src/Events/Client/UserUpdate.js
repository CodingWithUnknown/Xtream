const { Events, EmbedBuilder } = require('discord.js');
const { MergeImages } = require('../../Models/Canvas')

module.exports = {
    name: Events.UserUpdate,
    execute: async (client, oldUser, newUser) => {
        if (oldUser.id === client.user.id) return;
        if (oldUser.partial) { await oldUser.fetch(); }
        if (oldUser.partial) return;

        client.guilds.cache.forEach(async (x) => {
            x.members.cache.forEach(async (member, memberid) => {
                if (newUser.id === memberid) {
                    let guilds = null;
                    guilds = member.guild;
                }
            });
        });

        if (oldUser.avatar !== newUser.avatar) {
            // log = await Servers.getLogger(guilds.id, logType.MemberAvatarUpdate)
            // if (!log) return;
            let channel = client.channels.cache.get('990186368237989948');
            let file = await MergeImages(`https://cdn.discordapp.com/avatars/${oldUser.id}/${oldUser.avatar}.png`, `https://cdn.discordapp.com/avatars/${newUser.id}/${newUser.avatar}.png`);
            const embeds = new EmbedBuilder()
                .setAuthor(
                    { name: newUser.tag, iconURL: newUser.avatarURL() }
                )
                .setTitle(`<:up_n:1089775058026766377> Member Avatar Changed`)
                .setImage(`attachment://image.png`)
                .setDescription(`User avatar changed: [Old Avatar](${`https://cdn.discordapp.com/avatars/${oldUser.id}/${oldUser.avatar}.png`}) | [New Avatar](${`https://cdn.discordapp.com/avatars/${newUser.id}/${newUser.avatar}.png`})`)
                .setFooter(
                    { text: client.user.username, iconURL: client.user.displayAvatarURL() }
                )
                .setColor(0x2d2c31)
                .setTimestamp()
            await channel.send({ embeds: [embeds], files: [file] });
            /* await ClientLogger.sendWebhook(client, guilds.id, log.textId, {
                embeds: [embed],
                files: [file]
            }); */
        }

        if (oldUser.username !== newUser.username) {
            // log = await Servers.getLogger(guilds.id, logType.MemberUsernameUpdate)
            // if (!log) return;
            let channel = client.channels.cache.get('990186368237989948');
            const embeds = new EmbedBuilder()
                .setAuthor({ name: newUser.user.tag, iconURL: newUser.avatarURL() })
                .setTitle(`<:up_n:1089775058026766377> Member Username Changed`)
                .setDescription(`User username changed: **${oldUser.username}** | **${newUser.username}**`)
                .addFields(
                    { name: 'Member', value: `<@${newUser.id}> \`(${newUser.id})\``, inline: true },

                )
                .setFooter(
                    { text: client.user.username, iconURL: client.user.displayAvatarURL() }
                )
                .setColor(0x2d2c31)
                .setTimestamp()
            await channel.send({ embeds: [embeds] });
            /* await ClientLogger.sendWebhook(client, guilds.id, log.textId, {
                embeds: [embed]
            }); */
        }
    }
};