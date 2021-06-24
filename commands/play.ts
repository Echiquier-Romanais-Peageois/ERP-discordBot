import Discord from "discord.js";

import t from "../intl";
import findUser from "../utils/find-user";

const play = async (message: Discord.Message, args: string[]) => {
  if (args.length !== 1) {
    message.reply(t({ id: "commands.play.hint" }));
    return;
  }

  const user = await findUser(message, args[0]);
  if (!user?.pseudoLichess) {
    message.reply(t({ id: "commands.play.unknown" }));
    return;
  }

  message.reply(
    t(
      { id: "commands.play.visit" },
      { link: `https://lichess.org/?user=${user?.pseudoLichess}#friend` }
    )
  );
};

export default {
  command: "partie",
  handler: play,
  help: "commands.play.help",
};
