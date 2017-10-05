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
var clearCnt;
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
						case 'remove':
							for (i = 0; i < games.length; i++) {
								clearCnt = games[i];
								for (j = 0; j < clearCnt; j++) {
									games[i].splice(0, 1);
								}
							}
						break;
						case 'LFG':
                if (args[0] === "raid") {
                    if (games[0].indexOf(userID) == -1){
                        bot.sendMessage({
                            to: channelID,
                            message: user + ' is looking to do the raid'
                        });

                        games[0].push(userID);
												games[0].push(user);

                    } else {
                        bot.sendMessage({
                            to: channelID,
                            message: '<@' + userID + '>' + " Error: You've already joined this team"
                        });
                    }

								} else if (args[0] === "trials") {
									if (games[1].indexOf(userID) == -1){
											bot.sendMessage({
													to: channelID,
													message: user + ' is looking to play trials of the nine'
											});

											games[1].push(userID);
											games[1].push(user);

									} else {
										bot.sendMessage({
											to: channelID,
											message: '<@' + userID + '>' + " Error: You've already joined this team"
										});
									}
                } else if (args[0] === "crucible") {
									if (games[2].indexOf(userID) == -1){
											bot.sendMessage({
													to: channelID,
													message: user + ' is looking to play crucible'
											});

											games[2].push(userID);
											games[2].push(user);

									} else {
										bot.sendMessage({
												to: channelID,
												message: '<@' + userID + '>' + " Error: You've already joined this team"
										});
									}
                } else if (args[0] === "strike") {
									if (games[3].indexOf(userID) == -1){
											bot.sendMessage({
													to: channelID,
													message: user + ' is looking to do strikes'
											});

											games[3].push(userID);
											games[3].push(user);

									} else {
										bot.sendMessage({
												to: channelID,
												message: '<@' + userID + '>' + " Error: You've already joined this team"
										});
									}
                } else if (args[0] === "patrol") {
									if (games[4].indexOf(userID) == -1){
											bot.sendMessage({
													to: channelID,
													message: user + ' is looking to patrol around'
											});

											games[4].push(userID);
											games[4].push(user);

									} else {
										bot.sendMessage({
												to: channelID,
												message: '<@' + userID + '>' + " Error: You've already joined this team"
										});
									}
                } else {
                    bot.sendMessage({
                        to: channelID,
                        message: user + ', command not recognized. Format is: ?LFG [activity]'
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
                        message: 'Looking to play the raid (' + (games[0].length)/2 + '/6):'
                    });

										for (j = 0; j < 25; j++){
										}

                    for(i = 1; i < games[0].length; i+=2) {
                        playerNum = i;
                        bot.sendMessage({
                            to: channelID,
                            message: playerNum + ') ' + '' + games[0][i]
                        });
                    }

                } else if (args[0] === "trials") { //1
									bot.sendMessage({
											to: channelID,
											message: 'Looking to do trials of the nine (' + (games[1].length)/2 + '/4):'
									});

									for (j = 0; j < 25; j++){
									}

									for(i = 1; i < games[1].length; i+=2) {
											playerNum = i;
											bot.sendMessage({
													to: channelID,
													message: playerNum + ') ' + '' + games[1][i]
											});
									}

                } else if (args[0] === "crucible") { //2
									bot.sendMessage({
											to: channelID,
											message: 'Looking to play crucible (' + (games[2].length)/2 + '/4):'
									});

									for (j = 0; j < 25; j++){
									}

									for(i = 1; i < games[2].length; i+=2) {
											playerNum = i;
											bot.sendMessage({
													to: channelID,
													message: playerNum + ') ' + '' + games[2][i]
											});
									}

                } else if (args[0] === "strike") { //3
									bot.sendMessage({
											to: channelID,
											message: 'Looking to do strikes (' + (games[3].length)/2 + '/3):'
									});

									for (j = 0; j < 25; j++){
									}

									for(i = 1; i < games[3].length; i+=2) {
											playerNum = i;
											bot.sendMessage({
													to: channelID,
													message: playerNum + ') ' + '' + games[3][i]
											});
									}

                } else if (args[0] === "patrol") { //4
									bot.sendMessage({
											to: channelID,
											message: 'Looking to patrol around (' + (games[4].length)/2 + '/3:'
									});

									for (j = 0; j < 25; j++){
									}

									for(i = 1; i < games[4].length; i+=2) {
											playerNum = i;
											bot.sendMessage({
													to: channelID,
													message: playerNum + ') ' + '' + games[4][i]
											});
									}

                } else {
                    bot.sendMessage({
                        to: channelID,
                        message: user + ', command not recognized. Format is: ?status [activity]'
                    });
                }

            break;
         }
     }
});

setInterval(function() {
	if (games[0].length == 12){
		bot.sendMessage({
			to: lfgChannel,
			message: 'The raid is full!'
		});
		for (i =0; i < games[0].length; i+=2){
			bot.sendMessage({
				to: lfgChannel,
				message: '<@' + games[0][i] + '>'
			});
		}
		bot.sendMessage({
			to: lfgChannel,
			message: 'please assemble in orbit!'
		});
		clearCnt = games[0].length
		for (i = 0; i < clearCnt; i++){
			games[0].splice(0, 1);
		}
	}
}, 1000);

setInterval(function() {
    if (games[1].length == 8){
			bot.sendMessage({
				to: lfgChannel,
				message: 'The trials team is full!'
			});
			for (i =0; i < games[1].length; i+=2){
				bot.sendMessage({
        	to: lfgChannel,
        	message: '<@' + games[1][i] + '>'
    		});
			}
			bot.sendMessage({
				to: lfgChannel,
				message: 'please assemble in orbit!'
			});
			clearCnt = games[1].length
			for (i = 0; i < clearCnt; i++){
    		games[1].splice(0, 1);
			}
    }

}, 1000);

setInterval(function() {
	if (games[2].length == 8){
		bot.sendMessage({
			to: lfgChannel,
			message: 'The crucible team is full!'
		});
		for (i =0; i < games[2].length; i+=2){
			bot.sendMessage({
				to: lfgChannel,
				message: '<@' + games[2][i] + '>'
			});
		}
		bot.sendMessage({
			to: lfgChannel,
			message: 'please assemble in orbit!'
		});
		clearCnt = games[2].length
		for (i = 0; i < clearCnt; i++){
			games[1].splice(0, 1);
		}
	}
}, 1000);

setInterval(function() {
	if (games[3].length == 6){
		bot.sendMessage({
			to: lfgChannel,
			message: 'The strike team is full!'
		});
		for (i =0; i < games[3].length; i+=2){
			bot.sendMessage({
				to: lfgChannel,
				message: '<@' + games[3][i] + '>'
			});
		}
		bot.sendMessage({
			to: lfgChannel,
			message: 'please assemble in orbit!'
		});
		clearCnt = games[3].length
		for (i = 0; i < clearCnt; i++){
			games[3].splice(0, 1);
		}
	}
}, 1000);

setInterval(function() {
	if (games[4].length == 6){
		bot.sendMessage({
			to: lfgChannel,
			message: 'The patrol team is full!'
		});
		for (i =0; i < games[4].length; i+=2){
			bot.sendMessage({
				to: lfgChannel,
				message: '<@' + games[4][i] + '>'
			});
		}
		bot.sendMessage({
			to: lfgChannel,
			message: 'please assemble in orbit!'
		});
		clearCnt = games[4].length
		for (i = 0; i < clearCnt; i++){
			games[4].splice(0, 1);
		}
	}
}, 1000);
