import Discord from 'discord.js';

import { fetchTeam } from '../api/lichess';
import { User } from '../mongo';
import normalizeForSearch from '../utils/normalize-for-search';

const list = async (message: Discord.Message, args: string[]) => {
  try {
    const storedUsers = await User.find().exec();
  
    const discordPseudos = storedUsers.map((user) => user.pseudoDiscord ?? '-');
    const lichessPseudos = storedUsers.map((user) => user.pseudoLichess ?? '-');
    const names = storedUsers.map((user) => user.firstNameFFE ? `${user.firstNameFFE} ${user.lastNameFFE}` : '-');
    
    message.channel.send(new Discord.MessageEmbed()
      .setColor('#FFFFFF')
      .setTitle("Voici ceux qui se sont déclaré(é)s :")
      .setAuthor("ERP Bot", 'https://images.prismic.io/lichess/5cfd2630-2a8f-4fa9-8f78-04c2d9f0e5fe_lichess-box-1024.png?auto=compress,format')
      .addFields(
        { name: 'Pseudo Discord', value: discordPseudos, inline: true },
        { name: 'Pseudo Lichess', value: lichessPseudos, inline: true },
        { name: 'Nom', value: names, inline: true },
      )
      .setTimestamp()
    )
  }
  catch (e) {
    console.log(e)
    message.reply("Désole, je ne peux pas contacter notre base en ce moment !")
    return;
  }
};

export default {
  command: 'liste',
  handler: list,
  help: "Lister les membres Discord avec leurs nom/pseudo",
};