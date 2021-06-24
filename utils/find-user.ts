import Discord from "discord.js";

import { User } from "../mongo";
import normalizeForSearch from "../utils/normalize-for-search";

const findUser = async (message: Discord.Message, text: string) => {
  const storedUsers = await User.find().exec();

  // For text searches
  const searchTerm = normalizeForSearch(text);

  // For mention searches
  const userTerm = message.mentions.users.first();

  const user = storedUsers.find((user) => {
    const searches = [user.pseudoDiscord, user.pseudoLichess];

    if (
      searches.find(
        (testString) =>
          testString && normalizeForSearch(testString) === searchTerm
      )
    )
      return true;

    if (userTerm?.username === user.pseudoDiscord) return true;

    return false;
  });

  return user;
};

export default findUser;
