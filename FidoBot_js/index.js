const fs = require('fs');
const config = require('./config.json');
const Discord = require('discord.js');
const client = new Discord.Client();
client.commands = new Discord.Collection();
const axios = require('axios');

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
	
	//test for global cmd
	client.api.applications(client.user.id).guilds(config.guild1).commands.post({
		data: {
			name: 'bork',
			description: "reply w a message"
		},
		data: {
			name: 'typetest',
			description: "test typing duration"
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
			// client
			client.api.interactions(interaction.id, interaction.token).callback.post({
				data: {
					type: 5,
				}
			});

			axios.patch(`https://discord.com/api/v8/webhooks/${config.appid}/${interaction.token}/messages/@original`, { content: 'New content' });

		}
	});
});

// const editInteraction = async (client, interaction, response) => {
//     // Set the data as embed if reponse is an embed object else as content
//     const data = typeof response === 'object' ? { embeds: [ response ] } : { content: response };
//     // Get the channel object by channel id:
//     const channel = await client.channels.resolve(interaction.channel_id);
//     // Edit the original interaction response:
//     return axios
//         .patch(`https://discord.com/api/v8/webhooks/${appId}/${interaction.token}/messages/@original`, data)
//         .then((answer) => {
//             // Return the message object:
//             return channel.messages.fetch(answer.data.id)
//         })
// };

//for non-slash commands
client.on('message', message => {
	if (!message.content.startsWith(config.prefix) || message.author.bot) return;

	const args = message.content.slice(config.prefix.length).trim().split(/ +/);
	const command = args.shift().toLowerCase();

	if (!client.commands.has(command)) return;

	try {
		client.commands.get(command).execute(message, args);
	} catch (error) {
		console.error(error);
		message.reply('there was an error trying to execute that command!');
	}
});


client.login(config.token);