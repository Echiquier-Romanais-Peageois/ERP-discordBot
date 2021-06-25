import Discord from "discord.js";

import t from "bot/intl";
import findUsers from "bot/utils/find-users";
import displayMatches from "bot/utils/display-matches";

const search = async (message: Discord.Message, args: string[]) => {
  if (args.length !== 1) {
    message.reply(t({ id: "commands.search.hint" }));
    return;
  }

  try {
    const users = await findUsers(args[0]);

    if (users.length === 0) {
      message.reply(t({ id: "commands.search.unknown" }));
    } else {
      displayMatches(message, t({ id: "commands.search.title" }), users);
    }
  } catch (e) {
    console.log(e);
    message.reply(t({ id: "errors.mongo" }));
    return;
  }
};

export default {
  command: "cqui",
  handler: search,
  help: "commands.search.help",
};
