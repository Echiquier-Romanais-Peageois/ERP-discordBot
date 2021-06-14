const config = require('./config.json')
const Discord = require('discord.js')
const client = new Discord.Client()
const commandHandler = require("./commands");
const mongo = require('./mongo');

client.on('ready', async() => {
    console.log("✅ Successfully logged into client.");

    await mongo().then((mongoose) => {
        try {
            console.log('✅ Successfully connected to mongodb')
        }
        finally {
            mongoose.connection.close()
        }
    })
})


client.on("message", commandHandler);
client.login(config.discordtoken);