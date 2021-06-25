import Discord from "discord.js";

import t from "bot/intl";
import { User } from "bot/db/mongo";
import findUser from "bot/utils/find-user";

const remove = async (
  message: Discord.Message,
  args: string[],
  isAdmin?: boolean
) => {
  if (!isAdmin) return;

  if (args.length !== 1) {
    message.reply(t({ id: "commands.play.hint" }));
    return;
  }

  const user = await findUser(message, args[0]);
  if (user) {
    await User.deleteOne({ pseudoDiscord: user.pseudoDiscord });
    message.reply(t({ id: "commands.reset.done" }));
    return;
  }

  message.reply(t({ id: "commands.reset.notFound" }));
};

export default {
  command: "remove",
  handler: remove,
  help: "commands.remove.help",
  isAdmin: true,
};
