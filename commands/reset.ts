import Discord from "discord.js";

import t from "../intl";
import { User } from "../mongo";

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
  command: "reset",
  handler: reset,
  help: "commands.reset.help",
  isAdmin: true,
};
