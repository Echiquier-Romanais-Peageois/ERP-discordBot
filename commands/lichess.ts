import Discord from "discord.js";

import { fetchTeam } from "../api/lichess";
import { User } from "../mongo";

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
        .setTitle("L'équipe en ligne")
        .setAuthor(
          "ERP Bot",
          "https://images.prismic.io/lichess/5cfd2630-2a8f-4fa9-8f78-04c2d9f0e5fe_lichess-box-1024.png?auto=compress,format"
        )
        .addFields(
          { name: "Actif", value: status, inline: true },
          { name: "User", value: usernames, inline: true },
          { name: "Pseudo Discord", value: discordPseudos, inline: true }
        )
        .setTimestamp()
    );
  } catch (e) {
    message.reply(
      "Désole, je ne peux pas contacter le serveur lichess en ce moment !"
    );
    return;
  }
};

export default {
  command: "lichess",
  handler: lichess,
  help: "Lister les members notre équipe lichess",
};
