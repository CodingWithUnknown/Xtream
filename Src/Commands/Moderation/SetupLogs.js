const { SlashCommandBuilder, PermissionFlagsBits, ChannelType, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('setup')
        .setDescription('Configure the logging system for your guild')
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild)
        .setNSFW(false)
        .setDMPermission(false)
        .addSubcommandGroup((options) => options
            .setName('logs')
            .setDescription('Configure the logging system for your guild')
            .addSubcommand((options) => options
                .setName('members')
                .setDescription('Configure the members logging system for your guild')
                .addChannelOption((options) => options
                    .setName('channel')
                    .setDescription('Select the logging channel for your guild.')
                    .addChannelTypes(ChannelType.GuildText)
                    .setRequired(true)
                )
                .addRoleOption((options) => options
                    .setName('memberRole')
                    .setDescription('Set the role to be automatically added to new members.')
                    .setRequired(true)
                )
                .addRoleOption((options) => options
                    .setName('botRole')
                    .setDescription('Set the roles to be automatically added to new bots.')
                    .setRequired(true)
                )
            )
        ),
    execute: (client, interaction) => {
        switch (interaction.options.getSubcommandGroup()) {
            case 'logs':
                switch (interaction.options.getSubcommand()) {
                    case 'users':
                        let channel = interaction.options.getChannel('channel');
                        let memberRole = interaction.options.getRole('memberRole');
                        let botRole = interaction.options.getRole('botRole');
                }
        }
    }
};