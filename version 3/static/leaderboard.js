const leaderboard = Object.create(null);
const maxHighestScoreNum = 5;

leaderboard.update = function(username, score, highScores) {
        const newScore = {
            score: score,
            name: username
        };
        highScores.push(newScore);
        // sort the highscore list
        // Method adapted from James Q Quick on Youtube. Thanks James!
        highScores.sort((a, b) => b.score - a.score)
        highScores.splice(maxHighestScoreNum);
}

export default Object.freeze(leaderboard);