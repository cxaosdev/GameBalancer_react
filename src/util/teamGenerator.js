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

  // 각 포지션에 플레이어를 할당
  const playersByPosition = positions.reduce((acc, position) => {
    acc[position] = players.filter((player) =>
      (player.selectedLanes || []).includes(position),
    );
    return acc;
  }, {});

  // 부족한 포지션이 있는지 확인
  const missingPositions = positions.filter(
    (position) => playersByPosition[position].length === 0,
  );

  if (missingPositions.length > 0) {
    return { missingPositions }; // 부족한 포지션 반환
  }

  // 각 포지션에서 플레이어를 배치할 때 점수를 고려해 팀 나누기
  const team1 = [];
  const team2 = [];
  let team1Pts = 0;
  let team2Pts = 0;

  positions.forEach((position) => {
    const playersForPosition = playersByPosition[position];

    // 포지션에 할당된 플레이어들을 점수를 기준으로 정렬 (높은 점수 순)
    playersForPosition.sort((a, b) => b.pts - a.pts);

    // 팀의 점수 차이가 최소가 되도록 배분
    playersForPosition.forEach((player) => {
      if (team1Pts <= team2Pts) {
        team1.push(player);
        team1Pts += player.pts;
      } else {
        team2.push(player);
        team2Pts += player.pts;
      }
    });
  });

  // 팀1, 팀2를 포지션 순서대로 정렬하여 반환
  return {
    team1,
    team1Pts,
    team2,
    team2Pts,
    missingPositions: [], // 부족한 포지션이 없으면 빈 배열
  };
};
