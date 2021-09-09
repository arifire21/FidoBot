const { SlashCommandBuilder } = require('@discordjs/builders');
const Timer = require('tiny-timer');
const timerArray = require('./structure/array_skeleton.js');

const timer = new Timer();

module.exports = {
	data: new SlashCommandBuilder()
		.setName('timerbasic')
		.setDescription('stop and delete ongoing timer')
        .addIntegerOption(option => option.setName('id').setDescription('id of timer').setRequired(true))
        ,
        
    async execute(interaction) {
        timer.stop();
        console.log()
    }
}