const { MessageEmbed } = require('discord.js');
const { SlashCommandBuilder, userMention } = require('@discordjs/builders');
const Timer = require('tiny-timer');
const ms = require('ms');

const timer = new Timer();

const data = new SlashCommandBuilder()
	.setName('timer')
	.setDescription('Get info about a user or a server!')
	.addSubcommand(subcommand =>
		subcommand
			.setName('create')
			.setDescription('Create a new timer, display msg once done')
			.addUserOption(option => option.setName('target').setDescription('The user')))
	.addSubcommand(subcommand =>
		subcommand
			.setName('delete')
			.setDescription('Delete a currently running timer'))
    .addSubcommand(subcommand =>
        subcommand
            .setName('get')
            .setDescription('Display current time, if any'));






    
            if (interaction.options.getSubcommand() === 'user') {
                const user = interaction.options.getUser('target');
    
                if (user) {
                    await interaction.reply(`Username: ${user.username}\nID: ${user.id}`);
                } else {
                    await interaction.reply(`Your username: ${interaction.user.username}\nYour ID: ${interaction.user.id}`);
                }
            } else if (interaction.options.getSubcommand() === 'server') {
                await interaction.reply(`Server name: ${interaction.guild.name}\nTotal members: ${interaction.guild.memberCount}`);
            }