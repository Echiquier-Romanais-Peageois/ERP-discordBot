import Discord from "discord.js";
import dotenv from "dotenv";
import http from "http";
import { subDays, isBefore } from "date-fns";

import t from "bot/intl";
import { connectToDatabase } from "bot/db/mongo";
import { User } from "bot/db/mongo";

import help, { generateHelpMessage } from "bot/commands/help";
import commands from "bot/commands";

dotenv.config();

// Connect to to discord
const client = new Discord.Client();

client.on("ready", async () => {
  console.log("✅ Successfully logged into client.");
});

const isMemberAdmin = (member?: Discord.GuildMember) =>
  member?.roles.cache.some((role) => role.name === "Administrateur");

const handleMessage = (message: Discord.Message | Discord.PartialMessage) => {
  if (!message.content) return;

  const isAdmin = isMemberAdmin(message.member ?? undefined);

  // Sending a message to the bot prints out the help message
  const user = message.mentions.users.first();
  if (user?.bot) {
    help.handler(message as Discord.Message, [], isAdmin);
    return;
  }

  // Check for the prefix
  if (message.content.indexOf(process.env.COMMAND_PREFIX || "!") !== 0) return;

  const args = message.content.slice(1).trim().split(/ +/g);
  const command = args.shift()?.toLowerCase();

  // The help command has to be treated separately to avoid cycling dependencies
  if (command === help.command) {
    help.handler(message as Discord.Message, args, isAdmin);
    return;
  }

  // Handle all other commands
  const handler = commands.find((c) => c?.command === command)?.handler;
  if (handler) handler(message as Discord.Message, args, isAdmin);
};

const handlePresence = async (
  _prev: Discord.Presence | undefined,
  presence: Discord.Presence
) => {
  if (!presence.user || presence.user?.bot) return;
  if (presence.status === "online") {
    const isAdmin = isMemberAdmin(presence.member ?? undefined);

    const dbUser = await User.findOne({
      idDiscord: presence.userID,
    });

    const now = new Date();
    const dontRemindBefore = subDays(now, 14);

    // A user is now online, check if they've registered either their lichess or FFE account
    if (!dbUser || (!dbUser.pseudoLichess && !dbUser.licenceFFE)) {
      if (!dbUser) {
        // Send a welcome message to new users
        presence.user.send(
          t({ id: "reminders.signup" }, { user: presence.user.username })
        );

        presence.user.send(generateHelpMessage(isAdmin));

        // Create an account for this user, and store the time that we sent this message
        User.create({
          idDiscord: presence.user.id,
          pseudoDiscord: presence.user.username,
          lastSignupRequest: new Date(),
        });
      } else if (
        !dbUser.lastSignupRequest ||
        isBefore(new Date(dbUser.lastSignupRequest), dontRemindBefore)
      ) {
        // After a while we remind users to sign up
        presence.user.send(
          t({ id: "reminders.signupRecall" }, { user: presence.user.username })
        );

        presence.user.send(generateHelpMessage(isAdmin));
        dbUser.lastSignupRequest = new Date();
        dbUser.save();
      }
    }
  }
};

client.on("message", handleMessage);
client.on("messageUpdate", (oldMessage, newMessage) =>
  handleMessage(newMessage)
);

client.on("presenceUpdate", handlePresence);

// Connect to the database, then log into Discord
connectToDatabase(() => {
  client.login(process.env.BOT_TOKEN);
});

// To make Scalingo happy that the app has booted, we need to create a web server
http
  .createServer(function (req, res) {
    res.write("ERP Bot Running!");
    res.end();
  })
  .listen(process.env.PORT);
