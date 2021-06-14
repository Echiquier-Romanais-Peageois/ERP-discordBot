const Discord = require('discord.js');
const config = require('../config.json')

const embedHelp = new Discord.MessageEmbed()
    .setColor('#FFFFFF')
    .setTitle('Help Command')
    .setAuthor(config.botName, 'https://images.prismic.io/lichess/5cfd2630-2a8f-4fa9-8f78-04c2d9f0e5fe_lichess-box-1024.png?auto=compress,format')
    .setDescription('Some description here')
    .setThumbnail('https://images.prismic.io/lichess/5cfd2630-2a8f-4fa9-8f78-04c2d9f0e5fe_lichess-box-1024.png?auto=compress,format')
    .addFields(
        { name: '!clear <Number>', value: 'delete between 0 and 99 message from the channel.' },
        { name: '!register <String>', value: 'will register your Discord user with your Lichess', },
    )
    .addField('Inline field title', 'Some value here', true)
    .setTimestamp()
    .setFooter('Some footer text here', 'https://images.prismic.io/lichess/5cfd2630-2a8f-4fa9-8f78-04c2d9f0e5fe_lichess-box-1024.png?auto=compress,format')
