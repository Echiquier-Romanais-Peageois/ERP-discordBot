import Discord from "discord.js";

import { fetchFFEData } from "bot/api/ffe";
import { User } from "bot/db/mongo";

const configFFE = async (
  message: Discord.Message,
  licence: string,
  forUser: Discord.User,
  isAdmin: boolean
) => {
  try {
    const lcLicence = licence.toLowerCase();
    const members = await fetchFFEData();

    const member = members.find((u) => u.id.toLowerCase() === lcLicence);
    if (!member) {
      message.reply("Désole, nous ne trouvons pas ce numéro de licence...");
      return;
    }

    const idDiscord = forUser.id;
    const storedUsers = await User.find().exec();
    const dbUser = storedUsers.find((user) => user.idDiscord === idDiscord);
    const otherUser = storedUsers.find(
      (user) =>
        user.idDiscord !== idDiscord &&
        user.licenceFFE?.toLowerCase() === lcLicence
    );

    if (otherUser) {
      if (!isAdmin) {
        message.reply(
          `Désole, ce numéro est déjà assigné à ${otherUser.pseudoDiscord}`
        );
        return;
      }

      otherUser.licenceFFE = undefined;
      await otherUser.save();
    }

    try {
      if (!dbUser) {
        await User.create({
          idDiscord: forUser.id,
          pseudoDiscord: forUser.username,
          licenceFFE: member.id,
          firstNameFFE: member.firstName,
          lastNameFFE: member.lastName,
        });
      } else {
        await User.updateOne(
          {
            idDiscord: forUser.id,
          },
          {
            $set: {
              pseudoDiscord: forUser.username,
              licenceFFE: member.id,
              firstNameFFE: member.firstName,
              lastNameFFE: member.lastName,
            },
          }
        );
      }
      console.log(1);
      message.reply("Merci, c'est noté !");
    } catch (e) {
      console.log(e);
      message.reply(
        "Désole, je ne peux pas contacter notre base en ce moment !"
      );
      return;
    }
  } catch (e) {
    console.log(e);
    message.reply(
      "Désole, je ne peux pas contacter le serveur FFE en ce moment !"
    );
    return;
  }
};

export default configFFE;
