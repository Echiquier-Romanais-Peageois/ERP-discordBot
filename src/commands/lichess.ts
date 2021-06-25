import Discord from "discord.js";

import t from "bot/intl";
import { fetchTeam } from "bot/api/lichess";
import { User } from "bot/db/mongo";

const attempt = <T>(promise: Promise<T>) =>
  promise
    .then((data) => data)
    .catch((err) => {
      console.log(err);
      return null;
    });

const lichess = async (message: Discord.Message) => {
  try {
    const team = await fetchTeam();
    const storedUsers = await attempt(User.find().exec());

    const status = team.map((user) =>
      user.online ? ":green_circle:" : ":red_circle:"
    );
    const usernames = team.map((user) => user.username);
    const discordPseudos = team.map(
      (user) =>
        storedUsers?.find(
          (u) => u.pseudoLichess?.toLowerCase() === user.username.toLowerCase()
        )?.pseudoLichess ?? "-"
    );

    message.channel.send(
      new Discord.MessageEmbed()
        .setColor("#FFFFFF")
        .setTitle(t({ id: "commands.lichess.title" }))
        .setAuthor(
          "ERP Bot",
          "https://images.prismic.io/lichess/5cfd2630-2a8f-4fa9-8f78-04c2d9f0e5fe_lichess-box-1024.png?auto=compress,format"
        )
        .addFields(
          {
            name: t({ id: "commands.lichess.active" }),
            value: status,
            inline: true,
          },
          {
            name: t({ id: "commands.lichess.user" }),
            value: usernames,
            inline: true,
          },
          {
            name: t({ id: "commands.lichess.discord" }),
            value: discordPseudos,
            inline: true,
          }
        )
        .setTimestamp()
    );
  } catch (e) {
    message.reply(t({ id: "errors.lichess" }));
    return;
  }
};

export default {
  command: "lichess",
  handler: lichess,
  help: "commands.lichess.help",
};
