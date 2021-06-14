const clear = require("./commands/clear.js")
const register = require("./commands/register.js")
const help = require("./commands/help.js")
const online = require("./commands/online.js")
const ffe = require("./commands/FFE.js")
const listcommands = {help, clear, register, online, ffe };

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
          msg.reply(" that is not a command")
        }
      }
      i++
    }

  }
};