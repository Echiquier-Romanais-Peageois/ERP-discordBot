import Discord from "discord.js";

import t from "bot/intl";
import { fetchTeam } from "bot/api/lichess";
import { User } from "bot/db/mongo";

const configLichess = async (
  message: Discord.Message,
  pseudoLichess: string,
  forUser: Discord.User,
  isAdmin: boolean
) => {
  try {
    const lcPseudo = pseudoLichess.toLowerCase();
    const lichessUsers = await fetchTeam();
    const lichessUser = lichessUsers.find(
      (u) => u.username.toLowerCase() === lcPseudo
    );

    if (!lichessUser) {
      message.reply(t({ id: "config.lichess.unknown" }));
      return;
    }

    const idDiscord = forUser.id;
    const storedUsers = await User.find().exec();
    const dbUser = storedUsers.find((user) => user.idDiscord === idDiscord);
    const otherUser = storedUsers.find(
      (user) =>
        user.idDiscord !== idDiscord &&
        user.pseudoLichess?.toLowerCase() === lcPseudo
    );

    if (otherUser) {
      if (!isAdmin) {
        message.reply(
          t(
            { id: "config.lichess.alreadyAssigned" },
            { user: otherUser.pseudoDiscord }
          )
        );
        return;
      }

      otherUser.pseudoLichess = undefined;
      await otherUser.save();
    }

    try {
      if (!dbUser) {
        await User.create({
          idDiscord: forUser.id,
          pseudoDiscord: forUser.username,
          pseudoLichess: lichessUser.username,
        });
      } else {
        dbUser.pseudoDiscord = forUser.username;
        dbUser.pseudoLichess = lichessUser.username;
        await dbUser.save();
      }

      message.reply(t({ id: "config.thanks" }));
    } catch (e) {
      console.log(e);
      message.reply(t({ id: "errors.mongo" }));
      return;
    }
  } catch (e) {
    console.log(e);
    message.reply(t({ id: "errors.lichess" }));
    return;
  }
};

export default configLichess;
