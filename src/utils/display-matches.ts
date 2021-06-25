import Discord from "discord.js";

import t from "bot/intl";
import { IUser } from "bot/db/mongo";

const displayMatches = (
  message: Discord.Message,
  title: string,
  users: IUser[]
) => {
  const discordPseudos = users.map((user) => user.pseudoDiscord ?? "-");
  const lichessPseudos = users.map((user) => user.pseudoLichess ?? "-");
  const names = users.map((user) =>
    user.firstNameFFE ? `${user.firstNameFFE} ${user.lastNameFFE}` : "-"
  );

  message.channel.send(
    new Discord.MessageEmbed()
      .setColor("#FFFFFF")
      .setTitle(title)
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
};

export default displayMatches;
