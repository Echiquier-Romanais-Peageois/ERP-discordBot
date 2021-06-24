import Discord from 'discord.js';

import { fetchTeam } from '../api/lichess';
import { User } from '../mongo';

const configLichess = async (message: Discord.Message, pseudoLichess: string, forUser: Discord.User, isAdmin: boolean) => {
  try {
    const lcPseudo = pseudoLichess.toLowerCase();
    const lichessUsers = await fetchTeam();
    const lichessUser = lichessUsers.find(u => u.username.toLowerCase() === lcPseudo)
    if (!lichessUser) {
      message.reply("Désole, ce pseudo ne fait pas encore parti de notre équipe...")
      return;
    }

    const idDiscord = forUser.id;
    const storedUsers = await User.find().exec();
    const dbUser = storedUsers.find((user) => user.idDiscord === idDiscord);
    const otherUser = storedUsers.find((user) => user.idDiscord !== idDiscord && user.pseudoLichess?.toLowerCase() === lcPseudo);

    if (otherUser) {
      if (!isAdmin) {
        message.reply(`Désole, ce pseudo est déjà assigné à ${otherUser.pseudoDiscord}`);
        return;
      }

      otherUser.pseudoLichess = undefined;
      await otherUser.save()
    }

    try {
      if (!dbUser) {
        await User.create({
          idDiscord: forUser.id,
          pseudoDiscord: forUser.username,
          pseudoLichess: lichessUser.username,
        });
      } else {
        await User.updateOne({
          idDiscord: forUser.id,
        }, {
          $set: {
            pseudoDiscord: forUser.username,
            pseudoLichess: lichessUser.username,
          }
        });
      }
      console.log(1)
      message.reply("Merci, c'est noté !")
    }
    catch (e) {
      console.log(e)
      message.reply("Désole, je ne peux pas contacter notre base en ce moment !")
      return;
    }
  }
  catch (e) {
    console.log(e)
    message.reply("Désole, je ne peux pas contacter le serveur lichess en ce moment !")
    return;
  }
};

export default configLichess;
