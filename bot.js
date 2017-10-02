var Discord = require('discord.io');
var logger = require('winston');
var auth = require('./auth.json');
var randomMessage;
var games = new Array(
    [],
    [],
    [],
    [],
    [],
    []
);
var lfgChannel;
var playerNum;
// Configure logger settings
logger.remove(logger.transports.Console);
logger.add(logger.transports.Console, {
    colorize: true
});

logger.level = 'debug';
// Initialize Discord Bot
var bot = new Discord.Client({
   token: auth.token,
   autorun: true
});

bot.on('ready', function (evt) {
    logger.info('Connected');
    logger.info('Logged in as: ');
    logger.info(bot.username + ' - (' + bot.id + ')');
});

games[0].splice(0, 1);
games[0].splice(0, 1);

bot.on('message', function (user, userID, channelID, message, evt) {
    // Our bot needs to know if it will execute a command
    // It will listen for messages that will start with `!`
    if (message.substring(0, 1) == '?') {
        if (lfgChannel == undefined) {
            lfgChannel = channelID;
        }
        var args = message.substring(1).split(' ');
        var cmd = args[0];

        args = args.splice(1);
        switch(cmd) {
            case 'LFG':
                if (args[0] === "raid") {
                    if (games[0].indexOf(userID) == -1){
                        bot.sendMessage({
                            to: channelID,
                            message: user + ' is looking to do the raid'
                        });

                        games[0].push(userID);

                    } else {
                        bot.sendMessage({
                            to: channelID,
                            message: '<@' + userID + '>' + " Error: You've already joined this team"
                        });
                    }
                } else if (args[0] === "trials") {
                    bot.sendMessage({
                        to: channelID,
                        message: user + ' is looking for ' + args[1] + ' more to do trials'
                    });

                } else if (args[0] === "crucible") {
                    bot.sendMessage({
                        to: channelID,
                        message: user + ' is looking for ' + args[1] + ' more to play crucible'
                    });

                } else if (args[0] === "strike") {
                    bot.sendMessage({
                        to: channelID,
                        message: user + ' is looking for ' + args[1] + ' more to do strikes'
                    });

                } else if (args[0] === "patrol") {
                    bot.sendMessage({
                        to: channelID,
                        message: user + ' is looking for ' + args[1] + ' more to patrol'
                    });

                } else {
                    bot.sendMessage({
                        to: channelID,
                        message: user + 'Command not recognized'
                    });
                }
            break;

            case 'approach':
                randomMessage = Math.random()*100;

                if (randomMessage <= 50){
                    bot.sendMessage({
                        to: channelID,
                        message: 'Good day'
                    });
                } else if (randomMessage >= 51){
                    bot.sendMessage({
                        to: channelID,
                        message: 'Feed is strictly monitored master Cayde, I cannot engage.'
                    });
                }
            break;

            case 'status':
                if (args[0] === "raid") { //0

                    bot.sendMessage({
                        to: channelID,
                        message: 'Looking to play the raid (' + games[0].length + '/6):'
                    });

                    for(i = 0; i < games[0].length; i++) {
                        playerNum = i + 1;
                        bot.sendMessage({
                            to: channelID,
                            message: playerNum + ') ' + '<' + games[0][i] + '>'
                        });
                    }

                } else if (args[0] === "trials") { //1
                    bot.sendMessage({
                        to: channelID,
                        message: user + ' is looking for ' + args[1] + ' more to do trials'
                    });

                } else if (args[0] === "crucible") { //2
                    bot.sendMessage({
                        to: channelID,
                        message: user + ' is looking for ' + args[1] + ' more to play crucible'
                    });

                } else if (args[0] === "strike") { //3
                    bot.sendMessage({
                        to: channelID,
                        message: user + ' is looking for ' + args[1] + ' more to do strikes'
                    });

                } else if (args[0] === "patrol") { //4
                    bot.sendMessage({
                        to: channelID,
                        message: user + ' is looking for ' + args[1] + ' more to patrol'
                    });

                } else {
                    bot.sendMessage({
                        to: channelID,
                        message: user + 'Command not recognized'
                    });
                }

            break;
         }
     }
});

function remove(array, element) {
    const index = array.indexOf(element);

    if (index !== -1) {
        array.splice(index, 1);
    }
}

setInterval(function() {
    if (games[0].length == 2){
    bot.sendMessage({
        to: lfgChannel,
        message: 'The raid is full! ' + '<@' + games[0][0] + '>' + ', ' + '<@' + games[0][1] + '>' + ' please assemble in orbit!'
    });

    games[0].splice(0, 1);
    games[0].splice(0, 1);

    }

}, 1000);
