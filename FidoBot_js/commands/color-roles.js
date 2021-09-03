const config = require('../config.json');
const Discord = require('discord.js');

const colorEmbed = new Discord.MessageEmbed()
    .setColor('#45C3D6')
    .setTitle('Color Roles!')
	.setDescription(':sparkles: React to one to change your name color!')
	.addFields(
	{name: '🔴', value: '<@&825591949439926334>'},
	{name: '🟠', value: '<@&825822026148085760>'},
	{name: '🟡', value: '<@&825822082591358976>'},
	{name: '🟢', value: '<@&825822121778348052>'},
	{name: '🔵', value: '<@&825822159690924062>'},
	{name: '🟣', value: '<@&825822195312885770>'},
	{name: '🟤', value: '<@&825822234194477086>'},
	)
;

module.exports = {
    name: 'colorroles',
	description: 'Create set of color emojis and handle reaction/removal',
	async execute(message, Discord, client) {
		const red_emoji = '🔴';
		const orange_emoji = '🟠';
		const yellow_emoji = '🟡';
		const green_emoji = '🟢';
		const blue_emoji = '🔵';
		const purple_emoji = '🟣';
		const brown_emoji = '🟤';

		const red_role = message.guild.roles.cache.find(role => role.name === "Red");
		const orange_role = message.guild.roles.cache.find(role => role.name === "Orange");
		const yellow_role = message.guild.roles.cache.find(role => role.name === "Yellow");
		const green_role = message.guild.roles.cache.find(role => role.name === "Green");
		const blue_role = message.guild.roles.cache.find(role => role.name === "Blue");
		const purple_role = message.guild.roles.cache.find(role => role.name === "Purple");
		const brown_role = message.guild.roles.cache.find(role => role.name === "Brown");

		//reaction setup
        // message.channel.send('Cool collar colors! :sparkles: React to one to change your name color!')
		message.channel.send(colorEmbed)
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
		
		// client.on('messageReactionAdd', async (reaction, user) => {
		client.on('messageReactionAdd',async (potentialPartialReaction, potentialPartialUser) => {
			const reaction = await potentialPartialReaction.fetch();
			const user = await potentialPartialUser.fetch();
			//event checks
			if(reaction.message.partial) await reaction.message.fetch();
			if(reaction.partial) await reaction.fetch();
			if(user.bot) return; //do nothing
			if(!reaction.message.guild) return; //check if reaction is in guild and do nothing if not

			//check only in specific channel
			if(reaction.message.channel.id === config.role_channel_cyber || reaction.message.channel.id === config.role_channel_ff){
				let currentMember = '';
				let currentRole = '';
				let currentChannel = '';

				if(reaction.message.channel.id === config.role_channel_cyber){
					currentChannel = reaction.message.channel.name;
				}else{
					currentChannel = reaction.message.channel.name;
				}

				try{
					if(reaction.emoji.name === red_emoji){
						await reaction.message.guild.members.cache.get(user.id).roles.add(red_role);
						currentMember = reaction.user.name;
						currentRole = "red_role";
					}
					if(reaction.emoji.name === orange_emoji){
						await reaction.message.guild.members.cache.get(user.id).roles.add(orange_role);
					}
					if(reaction.emoji.name === yellow_emoji){
						await reaction.message.guild.members.cache.get(user.id).roles.add(yellow_role);
					}
					if(reaction.emoji.name === green_emoji){
						await reaction.message.guild.members.cache.get(user.id).roles.add(green_role);
					}
					if(reaction.emoji.name === blue_emoji){
						await reaction.message.guild.members.cache.get(user.id).roles.add(blue_role);
					}
					if(reaction.emoji.name === purple_emoji){
						await reaction.message.guild.members.cache.get(user.id).roles.add(purple_role);
					}
					if(reaction.emoji.name === brown_emoji){
						await reaction.message.guild.members.cache.get(user.id).roles.add(brown_role);
					}
					console.log("Added " + currentRole + " to " + currentMember + " in " + currentChannel);
				}catch(error){
					console.log(error);
				}
			}
			//if not that channel...
			else{
				return;
			}
		});	 //end messageReactionAdd

		// client.on('messageReactionRemove', async (reaction, user) => {
		client.on('messageReactionRemove',async (potentialPartialReaction, potentialPartialUser) => {
			const reaction = await potentialPartialReaction.fetch();
			const user = await potentialPartialUser.fetch();
			//event checks
			if(reaction.message.partial) await reaction.message.fetch();
			if(reaction.partial) await reaction.fetch();
			if(user.bot) return; //do nothing
			if(!reaction.message.guild) return; //check if reaction is in guild and do nothing if not

			//check only in specific channel
			if(reaction.message.channel.id === config.role_channel_cyber || reaction.message.channel.id === config.role_channel_ff){
				try{
					if(reaction.emoji.name === red_emoji){
						await reaction.message.guild.members.cache.get(user.id).roles.remove(red_role);
					}
					if(reaction.emoji.name === orange_emoji){
						await reaction.message.guild.members.cache.get(user.id).roles.remove(orange_role);
					}
					if(reaction.emoji.name === yellow_emoji){
						await reaction.message.guild.members.cache.get(user.id).roles.remove(yellow_role);
					}
					if(reaction.emoji.name === green_emoji){
						await reaction.message.guild.members.cache.get(user.id).roles.remove(green_role);
					}
					if(reaction.emoji.name === blue_emoji){
						await reaction.message.guild.members.cache.get(user.id).roles.remove(blue_role);
					}
					if(reaction.emoji.name === purple_emoji){
						await reaction.message.guild.members.cache.get(user.id).roles.remove(purple_role);
					}
					if(reaction.emoji.name === brown_emoji){
						await reaction.message.guild.members.cache.get(user.id).roles.remove(brown_role);
					}
				}catch(error){
					console.log(error);
				}
			}
			//if not that channel...
			else{
				return;
			}
		});	 //end messageReactionRemove
		
	},	//end execute	
}	//end export
