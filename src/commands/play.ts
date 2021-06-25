import Discord from "discord.js";

import t from "bot/intl";
import findUsers from "bot/utils/find-users";
import displayMatches from "bot/utils/display-matches";

const play = async (message: Discord.Message, args: string[]) => {
  if (args.length !== 1) {
    message.reply(t({ id: "commands.play.hint" }));
    return;
  }

  const users = await findUsers(args[0]);

  if (users.length > 1) {
    displayMatches(message, t({ id: "request.multiple" }), users);
    return;
  }

  if (users.length === 0 || !users[0]!.pseudoLichess) {
    message.reply(t({ id: "commands.play.unknown" }));
    return;
  }

  message.reply(
    t(
      { id: "commands.play.visit" },
      { link: `https://lichess.org/?user=${users[0]!.pseudoLichess}#friend` }
    )
  );
};

export default {
  command: "partie",
  handler: play,
  help: "commands.play.help",
};
