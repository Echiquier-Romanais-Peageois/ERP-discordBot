import Discord from "discord.js";

import t from "bot/intl";
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
      message.reply(t({ id: "config.ffe.unknown" }));
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
          t(
            { id: "config.ffe.alreadyAssigned" },
            { user: otherUser.pseudoDiscord }
          )
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
        dbUser.pseudoDiscord = forUser.username;
        dbUser.licenceFFE = member.id;
        dbUser.firstNameFFE = member.firstName;
        dbUser.lastNameFFE = member.lastName;
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
    message.reply(t({ id: "errors.ffe" }));
    return;
  }
};

export default configFFE;
