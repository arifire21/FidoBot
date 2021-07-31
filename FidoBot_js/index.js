const fs = require('fs');
const axios = require('axios'); //for updating "listening" message
const config = require('./config.json');
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
	client.user.setPresence({ activity: { name: 'Companion to the Follow Fido app!' }, status: 'online' });
	// client.user.setPresence({ activity: { name: 'TESTING COMMANDS' }, status: 'dnd' });
	
	//TODO: Check how to delete old guild-specifc commands. The old "bork" still shows up in guild2
		//(also will be useful when real commands start getting used)
	client.api.applications(client.user.id).commands.post({
		data: {
			name: 'bork',
			description: "reply w a message. Args: none"
		},
		data: {
			name: 'typetest',
			description: "test typing duration. Args: none"
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

client.login(config.token);
