const Discord = require('discord.js');
const { Mongoose, get } = require('mongoose');
const mongo = require('../mongo')
const memberSchema = require('../schemas/Member-schemas')
module.exports = async function (msg, args, idDiscord, pseudoDiscord, pseudoLichess, licenceFFE, firstNameFFE, firstNameFFE) {
  return await mongo().then(async Mongoose => {
    try {
      idDiscord = msg.author.id
      pseudoDiscord = msg.author.username
      for (i = 0; i < userOfTeam.length; i++) {
        if (Object.keys(args)[0] === getLichessTeamUser()) {
          pseudoLichess = Object.keys(args)[0]
        }
      }
      await new memberSchema({
        idDiscord,
        pseudoDiscord,
        pseudoLichess
      })
    }
    finally {
      Mongoose.connection.close()
    }
  });

}
async function getLichessTeamUser() {
  let userOfTeam = []
  teamId = 'erp-echiquier-romanais-peageois';
  url = `https://lichess.org/api/team/${teamId}/users`;
  const stream = StringStream.from(async () => (await fetch(url)).body).JSONParse();
  for await (const item of stream) {
    i++;
    const { username } = item;
    userOfTeam[i] = username;

    return userOfTeam[i]
  }
}

