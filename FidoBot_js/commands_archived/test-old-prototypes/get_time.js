const { MessageEmbed } = require('discord.js');
const { SlashCommandBuilder, userMention } = require('@discordjs/builders');
const Timer = require('tiny-timer');
const ms = require('ms');

const timer = new Timer();

const embed = new MessageEmbed()
    .setColor('#45C3D6')
    .setAuthor('FidoClock')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('gettime')
		.setDescription('Display the time left for current timer, if running')
        ,
    
    async execute(interaction) {
        console.log("\nget_timer call");
        userToMention = userMention(interaction.user.id);

        if(timer.status != 'running'){
            console.log(timer.status);
            await interaction.reply(userToMention + ', there is no timer running.');
        }else{
            timerEmbed.setDescription('time remaining: `' + ms(timer.time) + '`');
            await interaction.reply({ embeds: [embed]});
        }
    }
}