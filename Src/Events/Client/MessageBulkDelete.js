const { Events, EmbedBuilder, ChannelType, Message, Client } = require('discord.js');

module.exports = {
    name: Events.MessageBulkDelete,
    /**
     * 
     * @param {Client} client 
     * @param {Message} message 
     * @returns 
     */
    execute: async (client, message) => {
        const messages = message.first();
        if (messages.size === 0) return;
        if (!messages) return;
        if (messages.channel.type === ChannelType.DM) return;

        console.log(message)
        console.log(message)
        console.log(messages)

        let channel = client.channels.cache.get('990186368237989948');

        const embeds = new EmbedBuilder()
            .setAuthor(
                { name: messages.author.tag, iconURL: messages.author.displayAvatarURL() }
            )
            .setTitle(`<:delete:1088764990938427423> Bulk Message Delete`)
            .setDescription(`\`${messages.size}\` messages were deleted`)
            .addFields(
                { name: 'Channel', value: `<#${messages.channelId}>`, inline: false },
                { name: 'Member', value: `<@${messages.author.id}>`, inline: false },
                { name: 'Deleted Time', value: `<t:${Math.floor(Date.now() / 1000)}:R> - (<t:${Math.floor(Date.now() / 1000)}>)`, inline: false },
            )
            .setFooter(
                { text: client.user.username, iconURL: client.user.displayAvatarURL() }
            )
            .setColor(0x2d2c31)

        await channel.send({ embeds: [embeds] });
    }
};