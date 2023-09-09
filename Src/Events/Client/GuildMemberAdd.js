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
        // await data.find({ Guild: member.guild.id }, {
            
        // })
    }
};