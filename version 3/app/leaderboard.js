const el = (id) => document.getElementById(id);
const cloneTemplate = (id) => document.importNode(el(id).content, true);

const leaderboard = Object.create(null);

const maxHighestScoreNum = 6;
const scoreList = el("score-list");
const usernameList = el("username-list");
let highScores =[];


leaderboard.update = function(obj) {
    /**this function will update the leaderboard and style it*/
    const newScore = {
        "username": obj.username,
        "score": obj.score,
    };
    // it will clear whatever has been displayed on the score list
    //leaderboard.refreshBoard();
    // update highScores
    leaderboard.saveHighScore(newScore);
    // for debugging
    console.log("updating leaderboard...");
    console.log(obj);
    leaderboard.display();
    console.log("results updated");
/*
    highScoresList.innerHTML = highScores.map(
        score => {
            return `<li class="high-score"> ${score.username} - ${score.score}</li>`;
        }
    ).join(""); */
};

/* leaderboard.refreshBoard = function() {
    // remove all the <li> child element but keep the templete
    while (highScoresList.childNodes.length>2) {
        highScoresList.removeChild(highScoresList.lastChild);
    }
}; */

leaderboard.saveHighScore = function(newScore){
    highScores.push(newScore);
    // sort the highscore list
    // Method adapted from James Q Quick on Youtube. Thanks James!
    highScores.sort((a, b) => b.score - a.score);
    highScores.splice(maxHighestScoreNum);
};


leaderboard.display = function () {

    usernameList.innerHTML = highScores.map(
        result => {
            return `<li class="high-score"> ${result.username}</li>`;
        }
    ).join("");
    scoreList.innerHTML = highScores.map(
        result => {
            return `<li class="high-score"> ${result.score}</li>`;
        }
    ).join("");

    /*
    // This would add one list element from templete by the styling is difficult
    // so I did not adopt this method in the end :(
    highScores.forEach(function (result) {
        const scoreTemplate = cloneTemplate("score-listing");
        const diplayedResult = scoreTemplate.querySelector("[name=result]");
        diplayedResult.textContent =
        `${newScore.username}        ${newScore.score}        ${newScore.time}`;
        highScoresList.appendChild(scoreTemplate);
    }); */
};

export default Object.freeze(leaderboard);