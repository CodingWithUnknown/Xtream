const { SlashCommandBuilder, PermissionFlagsBits, ChannelType, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('setup')
        .setDescription('Configure the logging system for your guild')
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild)
        .setDMPermission(false)
        .addSubcommand((options) => options
            .setName('logs')
            .setDescription('Configure the logging system for your guild')
            .addChannelOption((options) => options
                .setName('channel')
                .setDescription('Select the logging channel for your guild')
                .addChannelTypes(ChannelType.GuildText)
                .setRequired(true)
            )
        ),
    execute: (client, interaction) => {

    }
};