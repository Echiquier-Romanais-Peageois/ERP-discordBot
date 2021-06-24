import Discord from "discord.js";

import t from "../intl";
import { User } from "../mongo";

const list = async (message: Discord.Message) => {
  try {
    const storedUsers = await User.find().exec();

    const discordPseudos = storedUsers.map((user) => user.pseudoDiscord ?? "-");
    const lichessPseudos = storedUsers.map((user) => user.pseudoLichess ?? "-");
    const names = storedUsers.map((user) =>
      user.firstNameFFE ? `${user.firstNameFFE} ${user.lastNameFFE}` : "-"
    );

    message.channel.send(
      new Discord.MessageEmbed()
        .setColor("#FFFFFF")
        .setTitle(t({ id: "commands.list.title" }))
        .setAuthor(
          "ERP Bot",
          "https://images.prismic.io/lichess/5cfd2630-2a8f-4fa9-8f78-04c2d9f0e5fe_lichess-box-1024.png?auto=compress,format"
        )
        .addFields(
          {
            name: t({ id: "commands.list.discord" }),
            value: discordPseudos,
            inline: true,
          },
          {
            name: t({ id: "commands.list.lichess" }),
            value: lichessPseudos,
            inline: true,
          },
          { name: t({ id: "commands.list.name" }), value: names, inline: true }
        )
        .setTimestamp()
    );
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
