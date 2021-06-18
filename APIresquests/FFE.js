/**
 * @author Ollivier chris
 * @version 1.0.0
 * Ce ficher permet de recupere les info de l'API de la FFE
 */
//import des lib
 const fetch = require('node-fetch')
 module.exports.getDataFFE = async () => {
     let dataFFE = []
     let clubId = '531'
     let urlOfClub = `http://admin.echecs.asso.fr/GetData.aspx?Action=joueursduclub&ClubId= ${clubId}`
     let responseUrlOfClub = await fetch(urlOfClub)
     let text = await responseUrlOfClub.text()
     let textSplited = text.split(";")
     textSplited.shift();
     userFFE = textSplited;
     console.log(userFFE)
     for (i = 0; i < userFFE.length; i++) {
         let urlForUser = `http://admin.echecs.asso.fr/GetData.aspx?Action=joueur&NrFFE=${userFFE[i]}`
         let responseUrlForUser = await fetch(urlForUser)
         let text2 = await responseUrlForUser.text()
         let textSplited2 = text2.split(";")
         textSplited2.splice(2, 6)
         let userFullName = textSplited2
         console.log(userFullName)
     }
     for (y = 0; y < userFFE.length; y++) {
         dataFFE[userFFE[y], userFullName[y]]
     }
     console.log(dataFFE)
 
 }