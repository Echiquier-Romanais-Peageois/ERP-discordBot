import Discord from "discord.js";

import t from "bot/intl";
import { commands } from "./index";

const helpCommand = {
  command: "aide",
  handler: help,
  help: "commands.help.help",
  isAdmin: false,
};

export const generateHelpMessage = (isAdmin?: boolean) => {
  const availableCommands = [
    helpCommand,
    ...commands.filter((command) => command && (isAdmin || !command.isAdmin)),
  ];

  return new Discord.MessageEmbed()
    .setColor("#FFFFFF")
    .setTitle(t({ id: "commands.help.title" }))
    .setAuthor(
      "ERP Bot",
      "https://images.prismic.io/lichess/5cfd2630-2a8f-4fa9-8f78-04c2d9f0e5fe_lichess-box-1024.png?auto=compress,format"
    )
    .addFields(
      availableCommands.map((command) => ({
        name: command.command,
        value: `${t({ id: command.help })}${command.isAdmin ? " (admin)" : ""}`,
      }))!
    )
    .setTimestamp();
};

export function help(
  message: Discord.Message,
  args?: string[],
  isAdmin?: boolean
): void {
  message.channel.send(generateHelpMessage(isAdmin));
}

export default helpCommand;
