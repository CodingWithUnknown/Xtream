const { Events, Client, GuildMember, EmbedBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder } = require('discord.js');
const data = require('../../Models/Schema/Logging');

module.exports = {
    name: Events.GuildMemberAdd,
    /**
     * 
     * @param {Client} client 
     * @param {GuildMember} member 
     */
    execute: async (client, member) => {
        if (member.user.id === this.client.user.id) return
        if (member.partial) return;
        // const welcome = await Servers.getWelcome(member.guild.id);
        /* if (welcome) {
            let welcomeMessageText = welcome.welcomeMesage
                .replace(/{user}/g, member.toString())
                .replace(/{server}/g, member.guild.name)
                .replace(/{membercount}/g, member.guild.memberCount.toString())
                .replace(/{tag}/g, member.user.tag)
                .replace(/{username}/g, member.user.username)
            if (welcome.welcomeToggle && welcome.welcomeMessageToggle) {
                const welcomeChannel = await member.guild.channels.fetch(welcome.welcomeChannel) as TextChannel;
                if (welcomeChannel) {
                    await welcomeChannel.send(welcomeMessageText);
                }
            }
        } */

        // const log = await Servers.getLogger(member.guild.id, logType.MemberJoin);
        // if (!log) return;

        let channel = client.channels.cache('990186368237989948');

        const embed = new EmbedBuilder()
            .setAuthor({ name: member.user.tag, iconURL: member.user.displayAvatarURL({}) })
            .setTitle(`<:add_user:1089772543126290523>} Member Joined`)
            .setColor(0x2d2c31)
            .addFields(
                { name: 'Member', value: `<@${member.id}> (\`${member.id}\`)`, inline: true },
                { name: 'Account Created', value: `<t:${Math.floor(member.user.createdTimestamp / 1000)}:R> (<t:${Math.floor(member.user.createdTimestamp / 1000)}>)`, inline: true },
            )
            .setFooter({ text: client.user.username, iconURL: client.user.displayAvatarURL({}) })
            .setTimestamp();
        await channel.send({ embeds: [embed] });
    }
};