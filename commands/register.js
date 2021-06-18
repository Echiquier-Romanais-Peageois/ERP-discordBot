const Discord = require('discord.js');
const { Mongoose, get } = require('mongoose');
const mongo = require('../mongo')
const memberSchema = require('../schemas/memberSchemas')

module.exports = async function (msg, args) {
  return await mongo().then(async Mongoose => {
    try {
      idDiscord = msg.author.id
      pseudoDiscord = msg.author.username
      for (i = 0; i < userOfTeam.length; i++) {
        if (Object.keys(args)[0] === getLichessTeamUser()) {
          pseudoLichess = Object.keys(args)[0]
        }

      }
      console.log('Inserting a document')
      await new memberSchema({
        idDiscord,
        pseudoDiscord,
        pseudoLichess,
        licenceFFE,
        firstNameFFE,
        lastNameFFE
      }).save
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
async function getlicenceFFE() {
  let clubId = '531'
  let urlOfClub = `http://admin.echecs.asso.fr/GetData.aspx?Action=joueursduclub&ClubId= ${clubId}`
  let responseUrlOfClub = await fetch(urlOfClub)
  let text = await responseUrlOfClub.text()
  let textSplited = text.split(";")
  textSplited.shift();
  userFFE = textSplited;

  return userFFE

}
/**
 * @todo que les info usefull
 * @param {*} userFFE 
 */
async function getNameFFE(userFFE) {
  for (i = 0; i < userFFE.length; i++) {
    let urlForUser = `http://admin.echecs.asso.fr/GetData.aspx?Action=joueur&NrFFE=${userFFE[i]}`
    let responseUrlForUser = await fetch(urlForUser)
    let text2 = await responseUrlForUser.text()
    console.log(text2)

  }
}