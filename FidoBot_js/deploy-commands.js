const { SlashCommandBuilder } = require('@discordjs/builders');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const fs = require('fs');
const { clientId, guildId, guildId2, token } = require('./config.json');

const commands = [];
const commandFiles = fs.readdirSync('./v13_commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./v13_commands/${file}`);
	commands.push(command.data.toJSON());
}

const rest = new REST({ version: '9' }).setToken(token);

(async () => {
	try {

		await rest.put(
			Routes.applicationGuildCommands(clientId, guildId),
			{ body: commands },
		);

		console.log('Successfully registered application commands in guild1.');

		// await rest.put(
		// 	Routes.applicationGuildCommands(clientId, guildId2),
		// 	{ body: commands },
		// );
		// console.log('Successfully registered application commands in guild2.');
	} catch (error) {
		console.error(error);
	}
})();
