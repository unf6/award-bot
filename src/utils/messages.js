const config = require("../config")

module.exports = {
    
    giveaway:
    (config.everyoneMention ? "@everyone\n\n" : "") +
    "🎉 **GIVEAWAY** 🎉",
  giveawayEnded:
    (config.everyoneMention ? "@everyone\n\n" : "") +
    "🎉 **GIVEAWAY ENDED** 🎉",
    inviteToParticipate: "React with 🎉 to participate!",
    dropMessage: "Be the first to react with 🎉 !",
    drawing: "Drawing: {timestamp}",
    winMessage: "Congratulations, {winners}! You won **{this.prize}**!",
    embedFooter: "Giveaways",
    noWinner: "Giveaway cancelled, no valid participations.",
    hostedBy: "Hosted by: {this.hostedBy}",
    winners: "winner(s)",
    endedAt: "Ended at",
  
  };