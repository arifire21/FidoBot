const { SlashCommandBuilder, userMention, roleMention } = require('@discordjs/builders');
const Timer = require('tiny-timer');
const ms = require('ms');
const arraySkeleton = require('./structure/array_skeleton.js');

const timer = new Timer();

module.exports = {
	data: new SlashCommandBuilder()
		.setName('createtimer')
		.setDescription('timer that lasts for specified amnt, then sends message')
        .addIntegerOption(option => option.setName('time').setDescription('amnt of time (int)').setRequired(true))
        .addStringOption(option => option.setName('duration').setDescription('s, m, or h').setRequired(true))
        .addStringOption(option => option.setName('message').setDescription('msg to send').setRequired(true))
        .addRoleOption(option => option.setName('role').setDescription('Select a role to ping').setRequired(false))
        ,
	
    async execute(interaction) {
        console.log("\ncreate_timer call");
        inputTime = interaction.options.getInteger('time');
        inputDuration = interaction.options.getString('duration');
        inputMsg = interaction.options.getString('message');
        roleID = interaction.options.getRole('role');
        userID = interaction.user.id;
        console.log("input time: " + inputTime); console.log("input msg: " + inputMsg);

        arraySkeleton.timers.push(new BotTimer(inputTime,inputDuration, inputMsg, userID));
        console.log(arraySkeleton.timers[arraySkeleton.timers.length-1].id);
        
        const role = roleMention(roleID);
        console.log("input role: " + role);
        
        inputTime.toString();
        catTime = inputTime + " " + inputDuration;
        console.log("cat: " + catTime);
        convertedTime = ms(catTime);
        console.log("converted to ms: " + convertedTime);

        //todo actually go based off id
        await interaction.reply('`Timer id: ' + arraySkeleton.timers[arraySkeleton.timers.length-1].id + '.` Timer set for ' + catTime + '...');
        timer.start(convertedTime);

        timer.on('done', () => {
            try {
                console.log(convertedTime + ' -- timer done!');
                if(roleID){
                    interaction.followUp(role + ' ' + inputMsg);
                    //todo actually go based off id
                    arraySkeleton.timers.pop()
                }else{
                    interaction.followUp(inputMsg);
                } 
            } catch (error) {}
        })
    }
}