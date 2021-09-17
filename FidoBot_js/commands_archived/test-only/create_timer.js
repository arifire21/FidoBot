const { SlashCommandBuilder, userMention, roleMention } = require('@discordjs/builders');
const Timer = require('tiny-timer');
const ms = require('ms');
const arraySkeleton = require('../../v13_commands/structure/array_skeleton.js');

const timer = new Timer();

module.exports = {
	data: new SlashCommandBuilder()
		.setName('createtimer')
		.setDescription('timer that lasts for specified amnt, then sends message')
        .addIntegerOption(option => option.setName('time').setDescription('amnt of time (int)').setRequired(true))
        .addStringOption(option => option.setName('duration').setDescription('S (seconds), or M (minutes)').setRequired(true))
        .addStringOption(option => option.setName('message').setDescription('msg to send').setRequired(true))
        .addRoleOption(option => option.setName('role').setDescription('Select a role to ping [wip]').setRequired(false))
        ,
	
    async execute(interaction) {
        console.log("\ncreate_timer call");
        inputTime = interaction.options.getInteger('time');
        inputDuration = interaction.options.getString('duration');
        inputMsg = interaction.options.getString('message');
        roleID = interaction.options.getRole('role');
        userToMention = userMention(interaction.user.id);

        // arraySkeleton.timers.push(new BotTimer(inputTime,inputDuration, inputMsg, userID));
        // console.log(arraySkeleton.timers[arraySkeleton.timers.length-1].id);

        isTimerAllowed = true;
        //check if timer is currently running (todo, make one timer per person)
        if(timer.status == 'running'){
            await interaction.reply(userToMention + ', right now I can only process one timer at a time. Please wait.');
            isTimerAllowed = false;
            console.log('timer not created, one already running');
        }
        
        if(isTimerAllowed){
            console.log("input time: " + inputTime); console.log("input msg: " + inputMsg);
            inputTime.toString();
            catTime = inputTime + " " + inputDuration; console.log("cat: " + catTime);
            convertedTime = ms(catTime);
            console.log("converted to ms: " + convertedTime);

            roleToMention = roleMention(roleID);
            console.log("input role: " + roleToMention);

        //todo actually go based off id
            await interaction.reply(userToMention + ', timer set for ' + catTime + '...');
            timer.start(convertedTime);
            console.log('timer set successfully')
        }

        timer.on('done', () => {
            try {
                console.log(convertedTime + ' -- timer done!');
                if(roleToMention && isTimerAllowed){
                    interaction.followUp(roleToMention + ' -- ' + inputMsg);
                    //todo actually go based off id
                    // arraySkeleton.timers.pop()
                }else{
                    if(isTimerAllowed){
                        interaction.followUp(userToMention + ' -- ' + inputMsg);
                    }
                    // }else{
                    //     interaction.followUp(userToMention + ' -- ' + inputMsg);
                    // }
                } 
            } catch (error) {}
        })
    }
}