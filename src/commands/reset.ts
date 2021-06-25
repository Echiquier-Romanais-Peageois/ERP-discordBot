import Discord from "discord.js";

import t from "bot/intl";
import { User } from "bot/db/mongo";

const reset = async (
  message: Discord.Message,
  args: string[],
  isAdmin?: boolean
) => {
  if (!isAdmin) return;
  await User.remove({});

  message.reply(t({ id: "commands.reset.done" }));
};

export default {
  command: "resetter-la-base",
  handler: reset,
  help: "commands.reset.help",
  isAdmin: true,
};
