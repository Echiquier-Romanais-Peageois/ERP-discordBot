import Discord from "discord.js";

import help from "./help";
import lichess from "./lichess";
import iam from "./iam";
import register from "./register";
import search from "./search";
import reset from "./reset";
import list from "./list";
import play from "./play";

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
  help,
  lichess,
  iam,
  register,
  list,
  search,
  play,
  reset,
];

export default commands;
