import Discord from 'discord.js';
import dotenv from 'dotenv';
import http from 'http';

import { connectToDatabase } from './mongo';

import commands from './commands';

dotenv.config();

// Connect to to discord
const client = new Discord.Client()

client.on('ready', async () => {
  console.log("✅ Successfully logged into client.");
})

const handleMessage = (message: Discord.Message | Discord.PartialMessage) => {
  if (!message.content) return;
  if (message.content.indexOf("!") !== 0) return;
  
  const isAdmin = message.member?.roles.cache.some((role) => role.name === "Administrateur");

  const args = message.content.slice(1).trim().split(/ +/g);
  const command = args.shift()?.toLowerCase();

  const handler = commands.find((c) => c.command === command)?.handler;
  if (handler) handler(message as Discord.Message, args, isAdmin);
}

client.on('message', handleMessage);
client.on('messageUpdate', (oldMessage, newMessage) => handleMessage(newMessage));

// Connect to the database, then log into Discord
connectToDatabase(() => {
  client.login(process.env.BOT_TOKEN);
})

// To make Scalingo happy that the app has booted, we need to create a web server
http.createServer(function (req, res) {
  res.write('ERP Bot Running!'); 
  res.end(); 
}).listen(process.env.PORT); 
