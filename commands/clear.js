//clear this command will delete beteew 1 and 99 message in a channel.
//import lib
const Discord = require('discord.js')
const error = require('../Embed/EmbedErrorClear.js')

//export of module
module.exports = function (msg, args) {

    console.log(Object.keys(args).length)
    if (args >=1 && args <= 99 && Object.keys(args).length === 1) {
        async function clear() {
            msg.delete();
            const fetched = await msg.channel.messages.fetch({ limit: args });
            msg.channel.bulkDelete(fetched);
        }
        clear();
    }
    //Errore message 
    else {
        msg.channel.send(error)
    }
};