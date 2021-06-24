import Discord from 'discord.js';

import { fetchTeam } from '../api/lichess';
import { User } from '../mongo';

const reset = async (message: Discord.Message, args: string[], isAdmin?: boolean) => {
  if (!isAdmin) return;
  await User.remove({});

  message.reply("Fait.");
};

export default {
  command: 'reset',
  handler: reset,
  help: "Resetter la base"
};
