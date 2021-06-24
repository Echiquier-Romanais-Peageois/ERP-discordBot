import Discord from 'discord.js';

import { fetchTeam } from '../api/lichess';
import { User } from '../mongo';
import normalizeForSearch from '../utils/normalize-for-search';

const search = async (message: Discord.Message, args: string[]) => {
  if (args.length !== 1) {
    message.reply(`Faites « !cqui <nom / pseudo> »`); 
    return;
  }

  try {
    const storedUsers = await User.find().exec();
    const searchTerm = normalizeForSearch(args[0])!;

    const results = storedUsers.filter((user) => {
      if ((normalizeForSearch(user.pseudoDiscord)?.indexOf(searchTerm) ?? -1) >= 0) return true;
      if ((normalizeForSearch(user.pseudoLichess)?.indexOf(searchTerm) ?? -1) >= 0) return true;
      if ((normalizeForSearch(user.firstNameFFE)?.indexOf(searchTerm) ?? -1) >= 0) return true;
      if ((normalizeForSearch(user.lastNameFFE)?.indexOf(searchTerm) ?? -1) >= 0) return true;

      return false
    })

    if (results.length === 0) {
      message.reply("Je ne sais pas !")
    } else {
      const discordPseudos = results.map((user) => user.pseudoDiscord ?? '-');
      const lichessPseudos = results.map((user) => user.pseudoLichess ?? '-');
      const names = results.map((user) => user.firstNameFFE ? `${user.firstNameFFE} ${user.lastNameFFE}` : '-');
      
      message.channel.send(new Discord.MessageEmbed()
        .setColor('#FFFFFF')
        .setTitle("Voici ce que je trouve :")
        .setAuthor("ERP Bot", 'https://images.prismic.io/lichess/5cfd2630-2a8f-4fa9-8f78-04c2d9f0e5fe_lichess-box-1024.png?auto=compress,format')
        .addFields(
          { name: 'Discord', value: discordPseudos, inline: true },
          { name: 'Lichess', value: lichessPseudos, inline: true },
          { name: 'Nom', value: names, inline: true },
        )
        .setTimestamp()
      )
    }
  }
  catch (e) {
    console.log(e)
    message.reply("Désole, je ne peux pas contacter notre base en ce moment !")
    return;
  }
};

export default {
  command: 'cqui',
  handler: search,
  help: "Rechercher un utilistateur par nom/pseudo",
};