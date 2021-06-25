import Discord from "discord.js";

import t from "bot/intl";
import { User } from "bot/db/mongo";
import displayMatches from "bot/utils/display-matches";

const list = async (message: Discord.Message) => {
  try {
    const storedUsers = await User.find().exec();
    if (storedUsers.length === 0) return;

    displayMatches(message, t({ id: "commands.list.title" }), storedUsers);
  } catch (e) {
    console.log(e);
    message.reply(t({ id: "errors.mongo" }));
    return;
  }
};

export default {
  command: "liste",
  handler: list,
  help: "commands.list.help",
};
