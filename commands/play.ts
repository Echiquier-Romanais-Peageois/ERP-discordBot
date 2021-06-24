import Discord from "discord.js";

import t from "../intl";
import { User } from "../mongo";

const play = async (message: Discord.Message) => {
  const user = message.mentions.users.first();
  if (!user) {
    message.reply(t({ id: "commands.play.hint" }));
    return;
  }

  const storedUser = await User.findOne({ idDiscord: user.id });
  if (!storedUser?.pseudoLichess) {
    message.reply(t({ id: "commands.play.unknown" }));
    return;
  }

  message.reply(
    t(
      { id: "commands.play.visit" },
      { link: `https://lichess.org/?user=${storedUser?.pseudoLichess}#friend` }
    )
  );
};

export default {
  command: "partie",
  handler: play,
  help: "commands.play.help",
};
