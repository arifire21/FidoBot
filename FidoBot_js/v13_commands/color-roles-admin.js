const config = require('../config.json');
const {SlashCommandBuilder, roleMention} = require('@discordjs/builders');
const {MessageActionRow, MessageButton, MessageEmbed} = require('discord.js');

//SETUP
//attempting to make these global so I dont have to magic-number everything
const red_emoji = '🔴';
const orange_emoji = '🟠';
const yellow_emoji = '🟡';
const green_emoji = '🟢';
const blue_emoji = '🔵';
const purple_emoji = '🟣';
const brown_emoji = '🟤';

const colorEmbed = new MessageEmbed()
    .setColor('#45C3D6')
    .setTitle('Color Roles 2.0!')
	.setAuthor('FidoPaint')
;

const row1 = new MessageActionRow()
	.addComponents(
		new MessageButton()
			.setLabel('Red')
			.setStyle('SECONDARY')
			.setCustomId('Red')
			.setEmoji(red_emoji),
		new MessageButton()
			.setLabel('Orange')
			.setStyle('SECONDARY')
			.setCustomId('Orange')
			.setEmoji(orange_emoji),
		new MessageButton()
			.setLabel('Yellow')
			.setStyle('SECONDARY')
			.setCustomId('Yellow')
			.setEmoji(yellow_emoji),
		new MessageButton()
			.setLabel('Green')
			.setStyle('SECONDARY')
			.setCustomId('Green')
			.setEmoji(green_emoji),
		new MessageButton()
			.setLabel('Blue')
			.setStyle('SECONDARY')
			.setCustomId('Blue')
			.setEmoji(blue_emoji)
	)	//end add for row 1

const row2 = new MessageActionRow()
	.addComponents(
		new MessageButton()
			.setLabel('Purple')
			.setStyle('SECONDARY')
			.setCustomId('Purple')
			.setEmoji(purple_emoji),
		new MessageButton()
			.setLabel('Brown')
			.setStyle('SECONDARY')
			.setCustomId('Brown')
			.setEmoji(brown_emoji),
	)

//IMPLEMENTATION
module.exports = {
	data: new SlashCommandBuilder()
    .setName('colorroles-new')
	.setDescription('Create set of color emojis and handle reaction/removal')
	// .setDefaultPermission(false)
	//todo, figure that out, reply msg will be good for now
	,

	async execute(interaction) {
		//find roles
		const red_role = interaction.guild.roles.cache.find(role => role.name === "Red");
		const orange_role = interaction.guild.roles.cache.find(role => role.name === "Orange");
		const yellow_role = interaction.guild.roles.cache.find(role => role.name === "Yellow");
		const green_role = interaction.guild.roles.cache.find(role => role.name === "Green");
		const blue_role = interaction.guild.roles.cache.find(role => role.name === "Blue");
		const purple_role = interaction.guild.roles.cache.find(role => role.name === "Purple");
		const brown_role = interaction.guild.roles.cache.find(role => role.name === "Brown");

		//MESSAGE SETUP
		updateEmbed(red_role, orange_role, yellow_role, green_role, blue_role, purple_role, brown_role);
        // message.channel.send('Cool collar colors! :sparkles: React to one to change your name color!')
		// channel.send(colorEmbed)
		
		await interaction.reply({ embeds: [colorEmbed] , components: [row1, row2] })
	},	//end execute	
}	//end export

function updateEmbed(r_role, o_role, y_role, g_role, b_role, p_role, br_role){
	colorEmbed.setDescription(':sparkles: React to one to change your name color!' +
		'\n' + red_emoji + ' - ' + roleMention(r_role.id) +
		'\n' + orange_emoji + ' - ' + roleMention(o_role.id) +
		'\n' + yellow_emoji + ' - ' + roleMention(y_role.id) +
		'\n' + green_emoji + ' - ' + roleMention(g_role.id) +
		'\n' + blue_emoji + ' - ' + roleMention(b_role.id) +
		'\n' + purple_emoji + ' - ' + roleMention(p_role.id) +
		'\n' + brown_emoji + ' - ' + roleMention(br_role.id)
		);
}