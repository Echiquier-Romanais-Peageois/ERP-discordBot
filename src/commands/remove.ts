import Discord from "discord.js";

import t from "bot/intl";
import { User } from "bot/db/mongo";
import findUsers from "bot/utils/find-users";
import displayMatches from "bot/utils/display-matches";

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

  const users = await findUsers(args[0]);

  if (users.length > 1) {
    displayMatches(message, t({ id: "request.multiple" }), users);
    return;
  }

  if (users.length == 1) {
    await User.deleteOne({ pseudoDiscord: users[0].pseudoDiscord });
    message.reply(t({ id: "commands.reset.done" }));
    return;
  }

  message.reply(t({ id: "commands.reset.notFound" }));
};

export default {
  command: "raz",
  handler: remove,
  help: "commands.remove.help",
  isAdmin: true,
};
