import Discord from "discord.js";

import t from "bot/intl";
import { User } from "bot/db/mongo";
import normalizeForSearch from "bot/utils/normalize-for-search";

const search = async (message: Discord.Message, args: string[]) => {
  if (args.length !== 1) {
    message.reply(t({ id: "commands.search.hint" }));
    return;
  }

  try {
    const storedUsers = await User.find().exec();

    // For text searches
    const searchTerm = normalizeForSearch(args[0]);

    // For mention searches
    const userTerm = message.mentions.users.first();

    const results = storedUsers.filter((user) => {
      const searches = [
        user.pseudoDiscord,
        user.pseudoLichess,
        user.firstNameFFE,
        user.lastNameFFE,
      ];

      if (
        searches.find(
          (testString) =>
            testString &&
            normalizeForSearch(testString).indexOf(searchTerm) >= 0
        )
      )
        return true;

      if (userTerm?.username === user.pseudoDiscord) return true;

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
