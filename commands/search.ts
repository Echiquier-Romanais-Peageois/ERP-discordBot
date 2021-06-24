import Discord from "discord.js";

import t from "../intl";
import { User } from "../mongo";
import normalizeForSearch from "../utils/normalize-for-search";

const search = async (message: Discord.Message, args: string[]) => {
  if (args.length !== 1) {
    message.reply(t({ id: "commands.search.hint" }));
    return;
  }

  try {
    const storedUsers = await User.find().exec();
    const searchTerm = normalizeForSearch(args[0]);

    const results = storedUsers.filter((user) => {
      if (
        user.pseudoDiscord &&
        normalizeForSearch(user.pseudoDiscord).indexOf(searchTerm) >= 0
      )
        return true;
      if (
        user.pseudoLichess &&
        normalizeForSearch(user.pseudoLichess)?.indexOf(searchTerm) >= 0
      )
        return true;
      if (
        user.firstNameFFE &&
        normalizeForSearch(user.firstNameFFE).indexOf(searchTerm) >= 0
      )
        return true;
      if (
        user.lastNameFFE &&
        normalizeForSearch(user.lastNameFFE).indexOf(searchTerm) >= 0
      )
        return true;

      return false;
    });

    if (results.length === 0) {
      message.reply(t({ id: "commands.search.unknown" }));
    } else {
      const discordPseudos = results.map((user) => user.pseudoDiscord ?? "-");
      const lichessPseudos = results.map((user) => user.pseudoLichess ?? "-");
      const names = results.map((user) =>
        user.firstNameFFE ? `${user.firstNameFFE} ${user.lastNameFFE}` : "-"
      );

      message.channel.send(
        new Discord.MessageEmbed()
          .setColor("#FFFFFF")
          .setTitle(t({ id: "commands.search.title" }))
          .setAuthor(
            "ERP Bot",
            "https://images.prismic.io/lichess/5cfd2630-2a8f-4fa9-8f78-04c2d9f0e5fe_lichess-box-1024.png?auto=compress,format"
          )
          .addFields(
            {
              name: t({ id: "commands.search.discord" }),
              value: discordPseudos,
              inline: true,
            },
            {
              name: t({ id: "commands.search.lichess" }),
              value: lichessPseudos,
              inline: true,
            },
            {
              name: t({ id: "commands.search.name" }),
              value: names,
              inline: true,
            }
          )
          .setTimestamp()
      );
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
