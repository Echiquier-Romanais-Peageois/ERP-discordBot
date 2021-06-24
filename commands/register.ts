import Discord from 'discord.js';

import { fetchTeam } from '../api/lichess';
import { User } from '../mongo';

import configLichess from '../utils/config-lichess';
import configFFE from '../utils/config-ffe';

const register = async (message: Discord.Message, args: string[], isAdmin?: boolean) => {
  if (isAdmin) {
    const user = message.mentions.users.first();
    const forConfig = args[1]?.toLowerCase();
    if (args.length !== 3 || !user || !['lichess', 'ffe'].includes(forConfig)) {
      message.reply(`Faites « !register @<discord pseudo> lichess <lichess pseudo> » ou « !!register @<discord pseudo> FFE <numéro de license> »`);
      return;
    }

    if (forConfig === 'lichess') {
      configLichess(message, args[2], user, true);
    } else if (forConfig === 'ffe') {
      configFFE(message, args[2], user, true);
    }
  } else {  
    message.reply("Cette commande et pour les admins, utilise plutot « !jesuis lichess <pseudo> » ou « !jesuis FFE <numéro de license> »");
  }
};

export default {
  command: 'register',
  handler: register,
  help: "Rattacher un pseudo Discord à ses comptes lichess et FFE",
  isAdmin: true,
};

