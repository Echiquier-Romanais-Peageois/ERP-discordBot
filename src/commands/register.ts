import Discord from "discord.js";

import t from "bot/intl";
import configLichess from "bot/utils/config-lichess";
import configFFE from "bot/utils/config-ffe";

const register = async (
  message: Discord.Message,
  args: string[],
  isAdmin?: boolean
) => {
  if (isAdmin) {
    const user = message.mentions.users.first();
    const forConfig = args[1]?.toLowerCase();
    if (args.length !== 3 || !user || !["lichess", "ffe"].includes(forConfig)) {
      message.reply(t({ id: "commands.register.hint" }));
      return;
    }

    if (forConfig === "lichess") {
      configLichess(message, args[2], user, true);
    } else if (forConfig === "ffe") {
      configFFE(message, args[2], user, true);
    }
  } else {
    message.reply(t({ id: "commands.register.needAdmin" }));
  }
};

export default {
  command: "register",
  handler: register,
  help: "commands.register.help",
  isAdmin: true,
};
