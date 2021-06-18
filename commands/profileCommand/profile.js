const info = require('./memberInfo.js')
module.exports = async function (msg, args) {
    const target = msg.mentions.users.first() || msg.author
    const targetId = target.id

    const idDiscord = '735532114950488155'//targetId

    const memberinfo = await info.getData(idDiscord)
    for (i = 0; data.lenght;i++) {
        console.log(memberinfo[i])
    }
}