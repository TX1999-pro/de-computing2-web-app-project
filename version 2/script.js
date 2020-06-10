const DQS = (el) => document.querySelector(el);
const startQuizBtn = DQS(".start-quiz-btn");
const questionText = DQS(".question-text");
const optionBox = DQS(".option-box");
const answerDescription = DQS(".answer-description");
const nextQuestionBtn = DQS(".next-question-btn");
const seeResultBtn = DQS(".see-results-btn");
const currentQuestionNum = DQS(".current-question-num");
const correctAnswer = DQS(".correct-answers");
const remainingTime = DQS(".remaining-time");
const timeUpText = DQS(".time-up-text");
const quizHomeBox = DQS(".quiz-home-box");
const quizBox = DQS(".quiz-box");
const quizOverBox = DQS(".quiz-over-box");
const goToHomeBtn = DQS(".go-home-btn");
const startAgainBtn = DQS(".start-again-quiz-btn");

let questionBank = [];
let score=0;
let questionIndex = 0;
let attempt = 0;
let interval = [];
let mostRecentScore = 0;

const show = (el) => el.classList.add("show");
const hide = (el) => el.classList.add("hide");
const unshow = (el) => el.classList.remove("show");
const unhide = (el) => el.classList.remove("hide");


window.addEventListener("DOMContentLoaded", function(){
    // fetch question from .json file
    quizInit();
    hide(quizBox);

    //return a promise
    fetch("questions.json")
    .then(res => {
        return res.json();
    }).then(loadedQuestions => {
        console.log(loadedQuestions);
        questionBank = loadedQuestions;
    })
    .catch(err => {
        console.error(err);
    });

});

startQuizBtn.addEventListener("click",() => {
    hide(quizHomeBox);
    unshow(seeResultBtn);
    unhide(quizBox);
    show(quizBox);
    loadQuestion();
});


nextQuestionBtn.addEventListener("click", nextQuestion);

seeResultBtn.addEventListener("click",() => {
    hide(quizBox)
    show(quizOverBox);
    quizResults();
});

goToHomeBtn.addEventListener("click",() => {
    unshow(quizOverBox);
    hide(quizOverBox);
    unhide(quizHomeBox);
    quizInit();
});


startAgainBtn.addEventListener("click",() => {
    quizBox.style.display = "block";
    unshow(quizOverBox);
    unshow(seeResultBtn);
    quizInit();
    nextQuestion();
});

function loadQuestion() {
    questionText.innerHTML = questionBank[questionIndex].question;
    /* console.log(questionBank[questionIndex].question); */
    createOptions();
    timerStart();
    scoreBoard();
    currentQuestionNum.innerHTML = (questionIndex+1) + " / "
     + questionBank.length;
}

function createOptions() {
    clearOptionBox();
    questionBank[questionIndex].options.forEach(function(item, i){
        const option = document.createElement("div");
        option.innerHTML = item;
        option.classList.add("option");
        option.id = i+1;
        option.setAttribute("onclick", "checkAnswer(this)");
        optionBox.appendChild(option);
    });
}

function clearOptionBox() {
    optionBox.innerHTML = "";
    answerDescription.classList.remove("show");
}

function checkAnswer(element) {
    timerStop ();
    const id= element.id;
    /* console.log("the answer is " + questionBank[questionIndex].answer); */
    if (id == questionBank[questionIndex].answer) {
        element.classList.add("correct");
        score++;
        scoreBoard();
    }
    else {
        element.classList.add("wrong");
        // then show the right option
        showCorrectAnswer();
    }
    disableSelection();
    showAnswerDescription();
    questionIndex++;
    attempt++;
    if (questionIndex < questionBank.length) {
        showNextQuestionBtn();
    }
    else {
        quizOver();
    }
}

function nextQuestion() {
        loadQuestion();
        unshow(answerDescription);
        unshow(nextQuestionBtn);
        unshow(timeUpText);
}

function disableSelection() {
    for(const child of optionBox.children) {
        child.classList.add("already-answered")
    }

    /* Note:
    How to use forEach to implement the iteration>
    e.g. optionBox.children.forEach(function(child){
        child.classList.add("already-answered");
    })
    Error Message appeared: forEach is not a function */
}

function showAnswerDescription() {
    const description = questionBank[questionIndex].description
    if (typeof description !== "undefined") {
        show(answerDescription);
        answerDescription.innerHTML = description;
    }
}

function showNextQuestionBtn() {
    show(nextQuestionBtn);
}

function scoreBoard() {
    correctAnswer.innerHTML = score;
}

/* REMEBER: use callback to achieve timer function */
function timerStart() {
    let timeLimit = 10;
    remainingTime.innerHTML = timeLimit;
    remainingTime.classList.remove("less-time")
    interval = setInterval(() => {
        timeLimit--;
        remainingTime.innerHTML = timeLimit;
        if (timeLimit < 6 ) {
            remainingTime.classList.add("less-time");
        }
        if (timeLimit == 0 ){
                clearInterval(interval);
                timeIsUp();
        }
    },1000);
}

function timerStop() {
    clearInterval(interval);
}

function timeIsUp() {
    // show time's up text when timer counts down to zero
    timeUpText.classList.add("show")
    // show correct answer when time is up
    for(let i=0; i < optionBox.children.length; i++){
        if(optionBox.children[i].id == questionBank[questionIndex].answer){
            optionBox.children[i].classList.add("show-correct");
        }
    }
    disableSelection();
    showAnswerDescription();
    showNextQuestionBtn();
    showCorrectAnswer();
    questionIndex++
}

function showCorrectAnswer(){
    for(let i=0; i < optionBox.children.length; i++){
        if(optionBox.children[i].id == questionBank[questionIndex].answer){
            optionBox.children[i].classList.add("show-correct");
        }
    }
}

function quizResults(){
    DQS(".total-questions").innerHTML = questionBank.length;
    DQS(".total-attempts").innerHTML = attempt;
    DQS(".total-correct").innerHTML = score;
    DQS(".total-wrong").innerHTML = attempt - score;
    const percentage = (score/questionBank.length)*100;
    DQS(".percentage").innerHTML = percentage.toFixed(2) +"%";

}

function quizInit() {
    score=0;
    questionIndex = 0;
    attempt = 0;
    interval = [];
}

function quizOver() {
    unshow(nextQuestionBtn);
    show(seeResultBtn);
    /* mostRecentScore = score; */
    /* console.log("quiz over!") */
    localStorage.setItem("MostRecentScore", score);
}

/* username and score info */

const username = document.getElementById("username");
const saveScoreBtn = document.getElementById("saveScoreBtn");
username.addEventListener("keyup", () => {
    saveScoreBtn.disabled = !username.value;
});




const maxHighestScoreNum = 5;

saveHighScore = (e) => {
    e.preventDefault();
    console.log("clicked the save button!");
    mostRecentScore = localStorage.getItem("mostRecentScore");
    const newScore = {
        score: mostRecentScore,
        name: username.value
    };
    highScores.push(newScore);
    /* sort the highscore list */
    /* Method adapted from James Q Quick on Youtube. Thanks James! */
    highScores.sort((a,b) => b.score - a.score)
    highScores.splice(5);
    localStorage.setItem("highScores", JSON.stringify(highScores));
}


const highScores = JSON.parse(localStorage.getItem("highScores")) || [];
const highScoresList = document.getElementById("high-score-list");

highScoresList.innerHTML = highScores.map(
    score => {
        return `<li class="high-score"> ${score.name} - ${score.score}</li>`;
    }
).join("");

highScoresList
