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

  // 각 포지션별 플레이어 분류 및 높은 점수 순으로 정렬
  const playersByPosition = positions.reduce((acc, position) => {
    acc[position] = players
      .filter((player) => (player.selectedLanes || []).includes(position))
      .sort((a, b) => b.pts - a.pts);
    return acc;
  }, {});

  // 포지션에 플레이어가 없는 경우 확인
  const missingPositions = positions.filter(
    (position) => playersByPosition[position].length === 0,
  );

  // 포지션에 2명 미만의 플레이어가 있는 경우 확인
  const insufficientPositions = positions.filter(
    (position) => playersByPosition[position].length < 2,
  );

  if (missingPositions.length > 0) {
    return { missingPositions }; // 포지션이 부족할 경우 반환
  }

  if (insufficientPositions.length > 0) {
    return { insufficientPositions }; // 포지션별 플레이어가 2명 미만일 경우 반환
  }

  let optimalTeams = null;
  let minDifference = Infinity;

  // 포지션별로 한 번 할당된 플레이어는 중복되지 않도록 추적
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
        };
      }
      return;
    }

    const position = positions[positionIndex];
    const playersForPosition = playersByPosition[position];

    // 각 포지션에서 팀 1과 팀 2에 중복되지 않게 다른 플레이어를 할당
    for (let i = 0; i < playersForPosition.length; i++) {
      const playerForTeam1 = playersForPosition[i];
      if (usedPlayers.has(playerForTeam1)) continue; // 이미 사용된 플레이어는 건너뜀

      for (let j = 0; j < playersForPosition.length; j++) {
        if (i === j) continue; // 같은 플레이어가 두 팀에 배정되지 않도록 건너뜀
        const playerForTeam2 = playersForPosition[j];
        if (usedPlayers.has(playerForTeam2)) continue; // 이미 사용된 플레이어는 건너뜀

        // 현재 포지션에서 선택한 플레이어들을 사용된 목록에 추가
        usedPlayers.add(playerForTeam1);
        usedPlayers.add(playerForTeam2);

        generateTeams(
          positionIndex + 1,
          [...team1, playerForTeam1],
          [...team2, playerForTeam2],
          team1Pts + playerForTeam1.pts,
          team2Pts + playerForTeam2.pts,
          new Set([...usedPlayers]), // 새로운 Set을 사용하여 상태를 복사
        );

        // 백트래킹: 다음 조합을 위해 사용한 플레이어 제거
        usedPlayers.delete(playerForTeam1);
        usedPlayers.delete(playerForTeam2);
      }
    }
  };

  generateTeams(0, [], [], 0, 0, new Set());

  // 각 팀을 포지션 순서대로 정렬
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
    missingPositions: [], // 모든 포지션이 있으면 빈 배열 반환
    insufficientPositions: [], // 모든 포지션에 충분한 플레이어가 있으면 빈 배열 반환
  };
};
