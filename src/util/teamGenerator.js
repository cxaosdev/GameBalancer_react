export const generateTeamsAlgorithm = (players) => {
  const sortedPlayers = [...players].sort((a, b) => b.pts - a.pts);
  let team1 = [];
  let team2 = [];
  let team1Pts = 0;
  let team2Pts = 0;

  sortedPlayers.forEach((player) => {
    if (team1.length < 5 && (team1Pts <= team2Pts || team2.length >= 5)) {
      team1.push(player);
      team1Pts += player.pts;
    } else if (team2.length < 5) {
      team2.push(player);
      team2Pts += player.pts;
    }
  });

  return { team1, team1Pts, team2, team2Pts };
};
