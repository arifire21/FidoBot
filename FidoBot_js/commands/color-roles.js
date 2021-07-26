const red_emoji = '🔴';
const orange_emoji = '🟠';
const yellow_emoji = '🟡';
const green_emoji = '🟢';
const blue_emoji = '🔵';
const purple_emoji = '🟣';
const brown_emoji = '🟤';

module.exports = {
    name: 'colorroles',
	description: 'Create set of color emojis and handle reaction/removal',
	execute(message, args) {
		const red_role = message.guild.roles.cache.find(role => role.name === "Red");
		const orange_role = message.guild.roles.cache.find(role => role.name === "Orange");
		const yellow_role = message.guild.roles.cache.find(role => role.name === "Yellow");
		const green_role = message.guild.roles.cache.find(role => role.name === "Green");
		const blue_role = message.guild.roles.cache.find(role => role.name === "Blue");
		const purple_role = message.guild.roles.cache.find(role => role.name === "Purple");
		const brown_role = message.guild.roles.cache.find(role => role.name === "Brown");

		//reaction setup
        message.channel.send('Cool collar colors! :sparkles: React to one to change your name color!')
            .then(function (message){
                message.react(red_emoji)
                message.react(orange_emoji)
                message.react(yellow_emoji)
                message.react(green_emoji)
                message.react(blue_emoji)
                message.react(purple_emoji)
                message.react(brown_emoji)
            }	//end function
		);	//end then, send
		
		//TODO add remove handling
		
	},	//end execute	
}	//end export
