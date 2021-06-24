import Discord from "discord.js";

import { User } from "../mongo";

const play = async (message: Discord.Message) => {
  const user = message.mentions.users.first();
  if (!user) {
    message.reply(`Faites « !partie @<discord pseudo> »`);
    return;
  }

  const storedUser = await User.findOne({ idDiscord: user.id });
  if (!storedUser?.pseudoLichess) {
    message.reply("Je ne connais pas le pseudo lichess de cette personne");
    return;
  }

  message.reply(
    `Visitez https://lichess.org/?user=${storedUser?.pseudoLichess}#friend`
  );
};

export default {
  command: "partie",
  handler: play,
  help: "Jouer contre un autre membre !",
};
