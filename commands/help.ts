import Discord from 'discord.js';

import { commands } from './index';

const help = (message: Discord.Message, args: string[], isAdmin?: boolean) => {

	const availableCommands = commands.filter((command) => isAdmin || command.isAdmin);

	message.channel.send(new Discord.MessageEmbed()
		.setColor('#FFFFFF')
		.setTitle('Ce que vous pouvez faire...')
		.setAuthor("ERP Bot", 'https://images.prismic.io/lichess/5cfd2630-2a8f-4fa9-8f78-04c2d9f0e5fe_lichess-box-1024.png?auto=compress,format')
		.addFields(availableCommands.map((command) => ({ name: command.command, value: `${command.help}${command.isAdmin ? ' (admin)' : ''}` })))
		.setTimestamp()
	);
};

export default {
  command: 'aide',
  handler: help,
  help: "Afficher cette aide !"
};
