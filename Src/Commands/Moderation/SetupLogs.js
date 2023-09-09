const { SlashCommandBuilder, Client, ChatInputCommandInteraction, PermissionFlagsBits, ChannelType, EmbedBuilder } = require('discord.js');
const data = require('../../Models/Schema/Logging');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('setup')
        .setDescription('Configure the logging system for your guild')
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild)
        .setNSFW(false)
        .setDMPermission(false)
        .addSubcommandGroup((options) => options
            .setName('logs')
            .setDescription('Configure the logging system for your guild.')
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
                    .setDescription('Set the role to be automatically added to new bots.')
                    .setRequired(true)
                )
            )
        ),
    /**
     * 
     * @param {Client} client 
     * @param {ChatInputCommandInteraction} interaction 
     */
    execute: async (client, interaction) => {
        switch (interaction.options.getSubcommandGroup()) {
            case 'logs':
                switch (interaction.options.getSubcommand()) {
                    case 'members':
                        let channel = interaction.options.getChannel('channel').id;
                        let memberRole = interaction.options.getRole('memberRole') ? interaction.options.getRole('memberRole').id : null;
                        let botRole = interaction.options.getRole('botRole') ? interaction.options.getRole('botRole').id : null;

                        await data.findOneAndUpdate({ Guild: interaction.guild.id }, {
                            Channel: channel,
                            MemberRole: memberRole,
                            BotRole: botRole
                        }, { new: true, upsert: true })

                        const embeds = new EmbedBuilder()
                            .setDescription([
                                `- Logging Channel Updated: <@${channel}>`,
                                `- Member Auto-Role Updated: ${memberRole ? `<@${memberRole}>` : 'Not Spacified.'}`,
                                `- Bot Auto-Role Updated: ${botRole ? `<@${botRole}>` : 'Not Spacified.'}`
                            ].join('/n'))
                            .setColor(0x2d2c31)
                            .setTimestamp();

                        return await interaction.reply({ embeds: [embeds] });
                }
        }
    }
};