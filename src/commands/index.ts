import Discord from "discord.js";

import lichess from "./lichess";
import iam from "./iam";
import register from "./register";
import search from "./search";
import reset from "./reset";
import list from "./list";
import play from "./play";
import remove from "./remove";

export type Command = {
  command: string;
  handler: (
    message: Discord.Message,
    args: string[],
    isAdmin?: boolean
  ) => void;
  help: string;
  isAdmin?: boolean;
};

export const commands: Command[] = [
  iam,
  list,
  search,
  lichess,
  play,
  register,
  remove,
  reset,
];

export default commands;
