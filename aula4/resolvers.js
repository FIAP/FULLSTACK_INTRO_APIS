const matches = {
    "2": {
      id: 2,
      championshipId: 674,
      championshipName: "Série B 19",
      hour: "20:00",
      stadium: "Arena Pantanal",
      homeTeam: {
        name: "Cuiabá",
        shield: "https://s3-sa-east-1.amazonaws.com/logos.footstast.net/88x88/cuiaba.png",
        initials: "CUI"
      },
      awayTeam: {
        name: "Sport",
        shield: "https://s3-sa-east-1.amazonaws.com/logos.footstast.net/88x88/sport.png",
        initials: "SPT"
      },
      homeScore: 0,
      awayScore: 0,
      status: "PartidaNaoIniciada",
      penalties: false,
      homePenaltyScore: 0,
      awayPenaltyScore: 0
    }
  };
  
  const resolvers = {
    Query: {
      match: (parent, args) => matches[args.id],
      matches: (parent, args) => Object.values(matches).filter(match => match.championshipId === args.championshipId)
    },
    Mutation: {
      updateScore: (parent, args) => {
        const match = matches[args.matchId];
        if (match) {
          match.homeScore = args.homeScore;
          match.awayScore = args.awayScore;
        }
        return match;
      },
      updateStatus: (parent, args) => {
        const match = matches[args.matchId];
        if (match) {
          match.status = args.status;
        }
        return match;
      }
    }
  };
  
  module.exports = resolvers;
  