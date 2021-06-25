import Discord from "discord.js";

import t from "bot/intl";
import configLichess from "bot/utils/config-lichess";
import configFFE from "bot/utils/config-ffe";

const iam = async (message: Discord.Message, args: string[]) => {
  const forConfig = args[0]?.toLowerCase();
  if (args.length !== 2 || !["lichess", "ffe"].includes(forConfig)) {
    message.reply(t({ id: "commands.iam.hint" }));
    return;
  }

  if (forConfig === "lichess")
    configLichess(message, args[1], message.author, false);
  if (forConfig === "ffe") configFFE(message, args[1], message.author, false);
};

export default {
  command: "jesuis",
  handler: iam,
  help: "commands.iam.help",
};
