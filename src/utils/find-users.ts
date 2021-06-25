import { User } from "bot/db/mongo";
import normalizeForSearch from "bot/utils/normalize-for-search";

const findUsers = async (text: string) => {
  return await User.find({
    search: { $regex: normalizeForSearch(text) },
  }).exec();
};

export default findUsers;
