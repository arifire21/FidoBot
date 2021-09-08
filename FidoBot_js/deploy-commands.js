const { SlashCommandBuilder } = require('@discordjs/builders');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const fs = require('fs');
const { clientId, guildId, token } = require('./config.json');

const commands = [];
const commandFiles = fs.readdirSync('./v13_commands').filter(file => file.endsWith('.js'));
// const commands = [
// 	new SlashCommandBuilder().setName('ping').setDescription('Replies with pong!'),
// ]
// 	.map(command => command.toJSON());


for (const file of commandFiles) {
	const command = require(`./v13_commands/${file}`);
	commands.push(command.data.toJSON());
}

const rest = new REST({ version: '9' }).setToken(token);

(async () => {
	try {

	// const comms = await rest.get(
	// 	Routes.applicationGuildCommands(process.env.clientId, process.env.guildId)
	// 	);
	// 	for (const t of comms){
	// 	await rest.delete(
	// 		Routes.applicationGuildCommand(process.env.clientId, process.env.guildId, t.id)
	// 	);
	// 	console.log(t.id);
	// 	}

		await rest.put(
			Routes.applicationGuildCommands(clientId, guildId),
			{ body: commands },
		);

		console.log('Successfully registered application commands.');
	} catch (error) {
		console.error(error);
	}
})();
