import Discord from "discord.js";

import configLichess from "../utils/config-lichess";
import configFFE from "../utils/config-ffe";

const jesuis = async (message: Discord.Message, args: string[]) => {
  const forConfig = args[0]?.toLowerCase();
  if (args.length !== 2 || !["lichess", "ffe"].includes(forConfig)) {
    message.reply(
      `Faites « !jesuis lichess <pseudo> » ou « !jesuis FFE <numéro de license> »`
    );
    return;
  }

  if (forConfig === "lichess")
    configLichess(message, args[1], message.author, false);
  if (forConfig === "ffe") configFFE(message, args[1], message.author, false);
};

export default {
  command: "jesuis",
  handler: jesuis,
  help: "Rattacher votre pseudo Discord à vos comptes lichess et FFE",
};
