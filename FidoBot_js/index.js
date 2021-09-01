const fs = require('fs');
const axios = require('axios'); //for updating "listening" message
const config = require('./config.json');
const testVisibility = require('./follow-fido integration/test_visibility');
const Discord = require('discord.js');
const client = new Discord.Client({partials: ["MESSAGE", "CHANNEL", "REACTION"]});
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	// set a new item in the Collection
	// with the key as the command name and the value as the exported module
	client.commands.set(command.name, command);
}

client.once('ready', () => {
	console.log('FidoBot-- js version! Ready!');
	//client.user.setPresence({ activity: { name: 'Companion to the Follow Fido app!' }, status: 'online' });
	client.user.setPresence({ activity: { name: 'TESTING COMMANDS' }, status: 'dnd' });
	
	//TODO: Check how to delete old guild-specifc commands. The old "bork" still shows up in guild2
		//(also will be useful when real commands start getting used)
	client.api.applications(client.user.id).guilds('808460437188247594').commands.post({
		data: {
			name: 'bork',
			description: "args: none"
		},
		data: {
			name: 'typetest',
			description: "args: none"
		},
		data: {
			name: 'visibilitytest',
			description: "args: none"
		},
		data: {
			name: 'dummyauth',
			description: "temp"
		}
	});

	client.ws.on('INTERACTION_CREATE', async interaction => {
		const command = interaction.data.name.toLowerCase();
		const args = interaction.data.options;
		if(command == 'bork'){
			client.api.interactions(interaction.id, interaction.token).callback.post({
				data: {
					type: 4,
					data: {
						content: "First slash command! Integration with the Follow Fido app is coming soon!"
					}
				}
			});
		}

		if(command == 'typetest'){
			client.api.interactions(interaction.id, interaction.token).callback.post({
				data: {
					type: 5,
				}
			});

			axios.patch(`https://discord.com/api/v8/webhooks/${config.appid}/${interaction.token}/messages/@original`,
				{ content: 'Test for future authentication stuff!' });
		}

		if(command == 'visibilitytest'){
			let newStr = testVisibility.testMethod();
			console.log(newStr);
			client.api.interactions(interaction.id, interaction.token).callback.post({
				data: {
					type: 4,
					data: {
						content: newStr,
						ephemeral: true,
					}
				}
			});
		}

		if(command == 'dummyauth'){


			client.api.interactions(interaction.id, interaction.token).callback.post({
				data: {
					type: 5,
					ephemeral: true,
					options: [{
						name: '@user',
						type: 'USER',
						description: 'The user to auth id',
						required: true,
					}],
				}
			});

			if(interaction.member.id != options[1].id){
				interaction.reply('Owner and argument do not match');
			}else{
			axios.patch(`https://discord.com/api/v8/webhooks/${config.appid}/${interaction.token}/messages/@original`,
				{ content: 'Login!' });
			}
		}

	});
}); //end ready

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
//for non-slash commands
client.on('message', message => {
	if (!message.content.startsWith(config.prefix) || message.author.bot) return;

	const args = message.content.slice(config.prefix.length).trim().split(/ +/);
	const command = args.shift().toLowerCase();

	if (!client.commands.has(command)) return;

	try {
		if(command === 'colorroles'){
			client.commands.get('colorroles').execute(message, args, Discord, client);
		}
		else{
		client.commands.get(command).execute(message, args);
		}
	} catch (error) {
		console.error(error);
		message.reply('There was an error trying to execute that command!');
	}
});

//for interaction
function getUserFromMention(mention) {
	if (!mention) return;

	if (mention.startsWith('<@') && mention.endsWith('>')) {
		mention = mention.slice(2, -1);

		return client.users.cache.get(mention);
	}
}

client.login(config.token);
