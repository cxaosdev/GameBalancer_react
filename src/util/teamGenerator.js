export const generateVlrtTeams = (players) => {
  const combinations = (arr, k) => {
    if (k === 0) return [[]];
    if (arr.length === 0) return [];
    const [first, ...rest] = arr;
    const combsWithFirst = combinations(rest, k - 1).map((comb) => [
      first,
      ...comb,
    ]);
    const combsWithoutFirst = combinations(rest, k);
    return [...combsWithFirst, ...combsWithoutFirst];
  };

  const allTeam1Combinations = combinations(players, 5);
  let optimalTeams = null;
  let minDifference = Infinity;

  allTeam1Combinations.forEach((team1) => {
    const team2 = players.filter((player) => !team1.includes(player));
    const team1Pts = team1.reduce((sum, player) => sum + player.pts, 0);
    const team2Pts = team2.reduce((sum, player) => sum + player.pts, 0);
    const difference = Math.abs(team1Pts - team2Pts);

    if (difference < minDifference) {
      minDifference = difference;
      optimalTeams = { team1, team1Pts, team2, team2Pts };
    }
  });

  const sortedTeam1 = optimalTeams.team1.sort((a, b) => b.pts - a.pts);
  const sortedTeam2 = optimalTeams.team2.sort((a, b) => b.pts - a.pts);

  return { ...optimalTeams, team1: sortedTeam1, team2: sortedTeam2 };
};
///////
//////
/////
export const generateLolTeams = (players) => {
  const positions = ["top", "jungle", "mid", "adc", "support"];

  const playersByPosition = positions.reduce((acc, position) => {
    acc[position] = players
      .filter((player) => (player.selectedLanes || []).includes(position))
      .sort((a, b) => b.pts - a.pts);
    return acc;
  }, {});

  for (let position of positions) {
    if (playersByPosition[position].length < 2) {
      return { missingOrInsufficientPositions: [position] };
    }
  }

  let optimalTeams = null;
  let minDifference = Infinity;

  const generateTeams = (
    positionIndex,
    team1,
    team2,
    team1Pts,
    team2Pts,
    usedPlayers,
  ) => {
    if (positionIndex === positions.length) {
      const difference = Math.abs(team1Pts - team2Pts);

      if (difference < minDifference) {
        minDifference = difference;
        optimalTeams = {
          team1: [...team1],
          team2: [...team2],
          team1Pts,
          team2Pts,
          largeDifference: difference > 10,
        };
      }
      return;
    }

    const position = positions[positionIndex];
    const playersForPosition = playersByPosition[position];

    for (let i = 0; i < playersForPosition.length; i++) {
      const playerForTeam1 = playersForPosition[i];
      if (usedPlayers.has(playerForTeam1)) continue;

      for (let j = 0; j < playersForPosition.length; j++) {
        if (i === j) continue;
        const playerForTeam2 = playersForPosition[j];
        if (usedPlayers.has(playerForTeam2)) continue;

        usedPlayers.add(playerForTeam1);
        usedPlayers.add(playerForTeam2);

        generateTeams(
          positionIndex + 1,
          [...team1, playerForTeam1],
          [...team2, playerForTeam2],
          team1Pts + playerForTeam1.pts,
          team2Pts + playerForTeam2.pts,
          usedPlayers,
        );

        usedPlayers.delete(playerForTeam1);
        usedPlayers.delete(playerForTeam2);
      }
    }
  };

  generateTeams(0, [], [], 0, 0, new Set());

  if (!optimalTeams) {
    return {
      team1: [],
      team1Pts: 0,
      team2: [],
      team2Pts: 0,
      largeDifference: false,
      missingOrInsufficientPositions: positions,
    };
  }

  const sortTeamByPosition = (team) => {
    return team.sort(
      (a, b) => positions.indexOf(a.position) - positions.indexOf(b.position),
    );
  };

  return {
    team1: sortTeamByPosition(optimalTeams.team1),
    team1Pts: optimalTeams.team1Pts,
    team2: sortTeamByPosition(optimalTeams.team2),
    team2Pts: optimalTeams.team2Pts,
    largeDifference: optimalTeams.largeDifference,
    missingOrInsufficientPositions: [],
  };
};
