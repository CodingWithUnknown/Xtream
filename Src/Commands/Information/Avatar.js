const { SlashCommandBuilder, Client, ChatInputCommandInteraction, EmbedBuilder, ButtonBuilder, ButtonStyle, StringSelectMenuBuilder, ActionRowBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('avatar')
        .setDescription('display the avatar')
        .addUserOption((options) => options
            .setName('user')
            .setDescription('select the user')
        ),
    /**
     * 
     * @param {Client} client 
     * @param {ChatInputCommandInteraction} interaction 
     */
    execute: async (client, interaction) => {
        let userID = interaction.options.getUser('user') || interaction.user;
        await interaction.deferReply({ ephemeral: false });

        const user = await client.users.fetch(userID, { force: true });
        const memberExists = await interaction.guild.members.fetch(userID).then(() => true).catch(() => false);
        const member = await interaction.guild.members.fetch(memberExists ? user.id : interaction.user.id);

        let type = 'avatar';
        let sizes = [16, 32, 64, 128, 256, 512, 1024, 2048, 4096];
        let formats = ['png', 'webp', 'jpg', 'jpeg', ...(user.displayAvatarURL().includes('.gif') ? ['gif'] : [])];
        let change = 'user';

        const embeds = new EmbedBuilder()
            .setAuthor({ name: user.tag, iconURL: user.displayAvatarURL({ size: 1024 }) })
            .addFields(
                {
                    name: `General`, value: [
                        `> **Animated: ${user.displayAvatarURL().includes('.gif') ? '✅' : '❌'}**`,
                        `> **Server Avatar: '❌'**`
                    ].filter((e) => { return e }).join('\n')
                })
            .setColor(interaction.member.displayColor)
            .setImage(user.displayAvatarURL({ size: 1024 }))
        const button = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId('change-to-banner')
                    .setLabel('Banner')
                    .setEmoji('🔁')
                    .setStyle(ButtonStyle.Primary)
                    .setDisabled(!user.banner),
                new ButtonBuilder()
                    .setLabel('Avatar Link')
                    .setStyle(ButtonStyle.Link)
                    .setURL(user.displayAvatarURL({ size: 1024 }))
            )
        const size_menu = new ActionRowBuilder()
            .addComponents(
                new StringSelectMenuBuilder()
                    .addOptions(sizes.map((size) => ({ label: `${size}x${size}`, value: size.toString() })))
                    .setCustomId('size_menu').setPlaceholder(`Size: 1024x1024`)
                    .setMaxValues(1)
                    .setDisabled(!user.avatar)
            )
        const format_menu = new ActionRowBuilder()
            .addComponents(new StringSelectMenuBuilder()
                .addOptions(formats.map((format) => ({ label: format.toUpperCase(), value: format })))
                .setCustomId('format_menu')
                .setPlaceholder(`Format: ${user.displayAvatarURL().includes('.gif') ? 'GIF' : 'WEBP'}`)
                .setMaxValues(1)
                .setDisabled(!user.avatar)
            )
        const change_menu = new ActionRowBuilder()
            .addComponents(new StringSelectMenuBuilder()
                .addOptions({ label: 'Server', value: 'server', emoji: '🔁' })
                .setCustomId('change_menu')
                .setPlaceholder(`Displayed Avatar: User`)
                .setMaxValues(1)
            )
        if (memberExists === false) {
            await change_menu.components[0].setDisabled(true)
        } else {
            if (member.displayAvatarURL() === user.displayAvatarURL()) {
                await change_menu.components[0].setDisabled(true)
            } else {
                await change_menu.components[0].setDisabled(false)
            }
        }
        const collector = await interaction.editReply({ embeds: [embeds], components: [size_menu, format_menu, change_menu, button] });

        collector.createMessageComponentCollector({ idle: 3e5 })
            .on('collect', async (editor) => {
                await editor.deferUpdate()
                var size = 1024;
                var format = user.avatar.includes('a_') ? 'gif' : embeds.data.image.url.split('.').pop().split('?')[0] || 'webp';
                if (editor.user.id === interaction.user.id) {
                    if (type === 'avatar') {
                        // ---------------Avatar--------------------------//
                        size = embeds.data.image.url.split('?size=')[1] || 1024
                        format = embeds.data.image.url.split('.').pop().split('?')[0] || 'webp';
                        if (editor.customId === 'change-to-banner') {
                            format = user.banner.includes('a_') ? 'gif' : 'webp';
                            type = 'banner'
                            change = 'user';
                            let formats1 = ['png', 'webp', 'jpg', 'jpeg', ...(user.bannerURL().includes('.gif') ? ['gif'] : [])];
                            await button.components[0].setCustomId('change-to-avatar').setLabel('Avatar').setEmoji('🔁')
                            await format_menu.components[0].setOptions(formats1.map((format) => ({ label: format.toUpperCase(), value: format }))).setPlaceholder(`Format: ${format.toUpperCase()}`)
                            await button.components[1].setURL(user.bannerURL({ size: Number(size), extension: format, forceStatic: true })).setLabel('Banner Link')
                            await change_menu.components[0].setPlaceholder(`Displayed Banner: User`).setDisabled(true)
                            embeds.setFields({
                                name: `General`,
                                value: [
                                    `> **Animated: ${user.bannerURL().includes('.gif') ? '✅' : '❌'}**`,
                                ].filter(function (e) { return e }).join('\n')
                            })
                            embeds.setImage(user.bannerURL({ forceStatic: true, extension: format, size: Number(size) }))
                            await editor.editReply({ embeds: [embeds], components: [size_menu, format_menu, change_menu, button] })
                        } if (editor.customId === 'change_menu') {
                            if (editor.values[0] === 'server') {
                                let formats1 = ['png', 'webp', 'jpg', 'jpeg', ...(member.displayAvatarURL().includes('.gif') ? ['gif'] : [])];
                                change = 'server'
                                format = member.displayAvatarURL().includes('a_') ? 'gif' : 'webp';
                                embeds.setFields({
                                    name: `General`,
                                    value: [
                                        `> **Animated: ${member.displayAvatarURL().includes('.gif') ? '✅' : '❌'}**`,
                                        `> **Server Avatar: '✅'**`
                                    ].filter(function (e) { return e }).join('\n')
                                })
                                embeds.setImage(member.displayAvatarURL({ size: Number(size), extension: format, forceStatic: true }))
                                await change_menu.components[0].setOptions({ label: 'User', value: 'user', emoji: '🔁' }).setPlaceholder(` Displayed Avatar: Server`)
                                await format_menu.components[0].setOptions(formats1.map(format => ({ label: format.toUpperCase(), value: format }))).setPlaceholder(`Format: ${format.toUpperCase()}`)
                                await button.components[1].setURL(member.displayAvatarURL({ size: Number(size), extension: format, forceStatic: true }))
                                await editor.editReply({ embeds: [embeds], components: [size_menu, format_menu, change_menu, button] })

                            } else if (editor.values[0] === 'user') {
                                let formats2 = ['png', 'webp', 'jpg', 'jpeg', ...(user.displayAvatarURL().includes('.gif') ? ['gif'] : [])];
                                change = 'user'
                                format = user.displayAvatarURL().includes('a_') ? 'gif' : 'webp';
                                embeds.setFields({
                                    name: `General`,
                                    value: [
                                        `> **Animated: ${user.avatarURL().includes('.gif') ? '✅' : '❌'}**`,
                                        `> **Server Avatar: '❌'**`
                                    ].filter(function (e) { return e }).join('\n')
                                })
                                embeds.setImage(user.avatarURL({ size: Number(size), extension: format, forceStatic: true }))
                                await change_menu.components[0].setOptions({ label: 'Server', value: 'server', emoji: '🔁' }).setPlaceholder(` Displayed Avatar: User`)
                                await format_menu.components[0].setOptions(formats2.map(format => ({ label: format.toUpperCase(), value: format }))).setPlaceholder(`Format: ${format.toUpperCase()}`)
                                await button.components[1].setURL(user.avatarURL({ size: Number(size), extension: format, forceStatic: true }))
                                await editor.editReply({ embeds: [embeds], components: [size_menu, format_menu, change_menu, button] })
                            }
                        } else if (editor.customId === 'size_menu') {
                            size = editor.values[0];
                            if (change === 'user') {
                                embeds.setImage(user.displayAvatarURL({ size: Number(size), extension: format, forceStatic: true }))
                                await button.components[1].setURL(user.displayAvatarURL({ size: Number(size), extension: format, forceStatic: true }))
                                await size_menu.components[0].setPlaceholder(`Size: ${size}x${size}`)
                                await editor.editReply({ embeds: [embeds], components: [size_menu, format_menu, change_menu, button] })
                            } else if (change === 'server') {
                                embeds.setImage(member.displayAvatarURL({ size: Number(size), extension: format, forceStatic: true }))
                                await button.components[1].setURL(member.displayAvatarURL({ size: Number(size), extension: format, forceStatic: true }))
                                await size_menu.components[0].setPlaceholder(`Size: ${size}x${size}`)
                                await editor.editReply({ embeds: [embeds], components: [size_menu, format_menu, change_menu, button] })
                            }
                        } else if (editor.customId === 'format_menu') {
                            var format = editor.values[0];
                            size = embeds.data.image.url.split('?size=')[1]
                            if (change === 'user') {
                                embeds.setImage(user.displayAvatarURL({ size: Number(size), extension: format, forceStatic: true }))
                                await button.components[1].setURL(user.displayAvatarURL({ size: Number(size), extension: format, forceStatic: true }))
                                await format_menu.components[0].setPlaceholder(`Format: ${format.toUpperCase()}`)
                                await editor.editReply({ embeds: [embeds], components: [size_menu, format_menu, change_menu, button] })
                            } else if (change === 'server') {
                                embeds.setImage(member.displayAvatarURL({ size: Number(size), extension: format, forceStatic: true }))
                                await button.components[1].setURL(member.displayAvatarURL({ size: Number(size), extension: format, forceStatic: true }))
                                await format_menu.components[0].setPlaceholder(`Format: ${format.toUpperCase()}`)
                                await editor.editReply({ embeds: [embeds], components: [size_menu, format_menu, change_menu, button] })
                            }
                        }
                        // ---------------Avatar--------------------------//

                        // ---------------Banner--------------------------//
                    } else if (type === 'banner') {
                        size = embeds.data.image.url.split('?size=')[1] || 1024
                        format = embeds.data.image.url.split('.').pop().split('?')[0] || 'webp';
                        if (editor.customId === 'change-to-avatar') {
                            format = user.displayAvatarURL().includes('a_') ? 'gif' : 'webp';
                            type = 'avatar'
                            change = 'user';
                            let formats3 = ['png', 'webp', 'jpg', 'jpeg', ...(user.displayAvatarURL().includes('.gif') ? ['gif'] : [])];
                            await button.components[0].setCustomId('change-to-banner').setLabel('Banner').setEmoji('🔁')
                            await format_menu.components[0].setOptions(formats3.map(format => ({ label: format.toUpperCase(), value: format }))).setPlaceholder(`Format: ${format.toUpperCase()}`)
                            await button.components[1].setURL(user.displayAvatarURL({ size: Number(size), extension: format, forceStatic: true })).setLabel('Avatar Link')
                            await change_menu.components[0].setPlaceholder(` Displayed Avatar: User`).setOptions({ label: 'Server', value: 'server', emoji: '🔁' })
                            if (memberExists === false) {
                                await change_menu.components[0].setDisabled(true)
                            } else {
                                if (member.displayAvatarURL() === user.displayAvatarURL()) {
                                    await change_menu.components[0].setDisabled(true)
                                } else {
                                    await change_menu.components[0].setDisabled(false)
                                }
                            }
                            embeds.setFields({
                                name: `General`,
                                value: [
                                    `> **Animated: ${user.displayAvatarURL().includes('.gif') ? '✅' : '❌'}**`,
                                    `> **Server Avatar: '❌'**`
                                ].filter(function (e) { return e }).join('\n')
                            })
                            embeds.setImage(user.displayAvatarURL({ forceStatic: true, extension: format, size: Number(size) }))
                            await editor.editReply({ embeds: [embeds], components: [size_menu, format_menu, change_menu, button] })
                        } if (editor.customId === 'size_menu') {
                            size = editor.values[0];
                            if (change === 'user') {
                                embeds.setImage(user.bannerURL({ size: Number(size), extension: format, forceStatic: true }))
                                await button.components[1].setURL(user.bannerURL({ size: Number(size), extension: format, forceStatic: true }))
                                await size_menu.components[0].setPlaceholder(`Size: ${size}x${size}`)
                                await editor.editReply({ embeds: [embeds], components: [size_menu, format_menu, change_menu, button] })
                            }
                        } else if (editor.customId === 'format_menu') {
                            var format = editor.values[0];
                            size = embeds.data.image.url.split('?size=')[1]
                            if (change === 'user') {
                                embeds.setImage(user.bannerURL({ size: Number(size), extension: format, forceStatic: true }))
                                await button.components[1].setURL(user.bannerURL({ size: Number(size), extension: format, forceStatic: true }))
                                await format_menu.components[0].setPlaceholder(`Format: ${format.toUpperCase()}`)
                                await editor.editReply({ embeds: [embeds], components: [size_menu, format_menu, change_menu, button] })
                            }
                        }
                        // ---------------Banner--------------------------//
                    }
                } else {
                    await editor.followUp({ content: `Only ${interaction.user.toString()} can use these selectMenus/Buttons`, ephemeral: true });
                }
            }).on('end', async () => {
                change_menu.components[0].setDisabled(true)
                size_menu.components[0].setDisabled(true)
                format_menu.components[0].setDisabled(true)
                button.components[0].setDisabled(true)

                interaction.editReply({ components: [size_menu, format_menu, change_menu, button] })
            })
    }
}