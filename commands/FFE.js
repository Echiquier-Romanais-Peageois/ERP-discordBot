//import des lib
const Discord = require('discord.js')
const config = require('../config.json')
const fetch = require('node-fetch')
module.exports = async function (msg, args) {
    let url = 'http://admin.echecs.asso.fr/GetData.aspx?Action=joueursduclub&ClubId=531'
    let response = await fetch(url)
    let json = await response.xml
    console.log(json)
}