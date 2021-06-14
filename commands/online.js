//import des lib
const Discord = require('discord.js');
const config = require('../config.json')
const fetch = require('node-fetch');
const { StringStream } = require("scramjet");
const EmbedErrorClear = require('../Embed/EmbedErrorClear');

module.exports = async function (msg, args) {
  let userOfTeam = []
  let userOnline = []
  let i = 0;
  teamId = 'erp-echiquier-romanais-peageois';
  url = `https://lichess.org/api/team/${teamId}/users`;
  const stream = StringStream.from(async () => (await fetch(url)).body).JSONParse();
  for await (const item of stream) {
    i++;
    const { username, online } = item;

    userOfTeam[i] = username;
    if (online === true) {
      userOnline[i] = "\:green_circle:"
    }
    else {
      userOnline[i] = "\:red_circle:"
    }

  }

  msg.channel.send(new Discord.MessageEmbed()
    .setColor('#FFFFFF')
    .setTitle('User of the Team Online')
    .setAuthor(config.botName, 'https://images.prismic.io/lichess/5cfd2630-2a8f-4fa9-8f78-04c2d9f0e5fe_lichess-box-1024.png?auto=compress,format')
    .setThumbnail('https://images.prismic.io/lichess/5cfd2630-2a8f-4fa9-8f78-04c2d9f0e5fe_lichess-box-1024.png?auto=compress,format')
    .addFields(
      { name: 'Online', value: userOnline, inline: true },
      { name: 'User', value: userOfTeam, inline: true },
    )
    .setTimestamp()
  )
}
