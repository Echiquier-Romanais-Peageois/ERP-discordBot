/**
 * @author Ollivier chris
 * @version 1.0.0
 * Ce ficher permet de verifier que l'input de l'utilisateur est bien une command 
 * Si oui il execute la command 
 * Si non il retourne un error
 */
//inport de tout les commands
const profile = require("./commands/profileCommand/profile.js")
const clear = require("./commands/clear.js")
const register = require("./commands/registerCommand/register.js")
const help = require("./commands/help.js")
const online = require("./commands/online.js")
const listcommands = {help, clear, register, online, profile };

module.exports = async function (msg) {
  if (msg.channel.id == "847032386062647296" && msg.content.charAt(0) === "!") {
    let tokens = msg.content.split(" ");
    let commandFalse = 0;
    let command = tokens.shift();
    let commandTrue = command.substring(1);
    commandTrue.toString();
    for (i = 0; i <= Object.keys(listcommands).length;) {
      if (commandTrue === Object.keys(listcommands)[i]) {
        command = command.substring(1);
        listcommands[command](msg, tokens);
        break
      }

      else {
        commandFalse++;
        if (commandFalse === Object.keys(listcommands).length) {
          msg.reply(msg.content," that is not a command")
        }
      }
      i++
    }

  }
};