const el = (id) => document.getElementById(id);
const DQS = (el) => document.querySelector(el);

const startQuizBtn = el("start-quiz-btn");
const questionText = el("question-text");
const optionBox = el("option-box");
const answerDescription = el("answer-description");
const nextQuestionBtn = el("next-question-btn");
const seeResultBtn = el("see-results-btn");
const currentQuestionNum = DQS(".current-question-num");
const correctAnswer = DQS(".correct-answers");
const remainingTime = DQS(".remaining-time");
const timeUpText = DQS(".time-up-text");
const quizHomeBox = el("quiz-home-box");
const quizBox = el("quiz-box");
const quizOverBox = DQS(".quiz-over-box");
const goToHomeBtn = el("go-home-btn");
const startAgainBtn = el("start-again-quiz-btn");
const loader = el("loader");
/* const demoQuizBtn = el("demo-quiz-btn"); */

let questionBank = [];
let score = 0;
let questionIndex = 0;
let attempt = 0;
let interval = [];
let mostRecentScore = 0;
let userNumber = 10;

const show = (el) => el.classList.add("show");
const hide = (el) => el.classList.add("hide");
const unshow = (el) => el.classList.remove("show");
const unhide = (el) => el.classList.remove("hide");

function shuffle(arr) {
    let ctr = arr.length;
    let temp;
    let index;
    // while there are elements in the arrary
    while (ctr > 0) {
        // Pick a random index
        index = Math.floor(Math.random() * ctr);
        // Decrease ctr by 1
        ctr--;
        // Swap the last element with it
        temp = arr[ctr];
        arr[ctr] = arr[index];
        arr[index] = temp;
    }
    return arr;
}

window.addEventListener("DOMContentLoaded", function() {
    document.getElementById("user-num").innerHTML = userNumber + "th";
    quizInit();
    setTimeout(loadHomeBox, 1500);

});

function loadHomeBox() {
    hide(loader);
    show(quizHomeBox);
}
/* demoQuizBtn.addEventListener("click", () => {
    demoQuestion_init();
    loadQuestion();
    unshow(quizHomeBox);
    show(quizBox);
}); */

startQuizBtn.addEventListener("click", () => {
    loadQuestion();
    unshow(quizHomeBox);
    unshow(seeResultBtn);
    show(quizBox);
});


nextQuestionBtn.addEventListener("click", nextQuestion);

seeResultBtn.addEventListener("click", () => {
    quizResults();
    unshow(quizBox);
    show(quizOverBox);
});

startAgainBtn.addEventListener("click", () => {

    quizInit();
    nextQuestion();
    show(quizBox);
    unshow(quizOverBox);
    unshow(seeResultBtn);
});

goToHomeBtn.addEventListener("click", () => {
    unshow(quizOverBox);
    unhide(loader);
    quizInit();
    setTimeout(loadHomeBox,     1500);
});

function quizInit() {
    userNumber++;
    document.getElementById("user-num").innerHTML = userNumber + "th";
    score = 0;
    questionIndex = 0;
    attempt = 0;
    interval = [];
    // informs user he is the xth one loading this web
    /*
    fetch("https://opentdb.com/api.php?amount=10&category=9&difficulty=easy")
        .then(res => {
            return res.json();
        })
        .then(loadedQuestions => {
                questionBank = shuffle(loadedQuestions);
                questionBank = questionBank.results.map(loadedQuestions => {
                        const formattedQuestion = {
                            question: loadedQuestions.question
                        };

                        const answerOptions = [
                            ...loadedQuestions.incorrect_answers];
                        formattedQuestion.answer =
                            Math.floor(Math.random() * 3) + 1;
                        answerOptions.splice(
                            formattedQuestion.answer - 1,
                            0,
                            loadedQuestions.correct_answer
                        );
                        formattedQuestion.options = answerOptions;
                        //console.log(questionBank); 
                        return formattedQuestion;
                    });

                })
                .catch(err => {
                    console.error(err);
                });
            */
    // catch any error in the debug console**
    // handle catch case for a promise so when smth went wrong
    // I know what to do
    fetch("demoQuestions.json")
        .then(res => {
            return res.json();
        }).then(loadedQuestions => {
            questionBank = shuffle(loadedQuestions);
            // console.log(questionBank);
        })
        .catch(err => 
        {
            console.error(err);
            // catch any error in the debug console**
            // handle catch case for a promise so when smth went wrong
            // I know what to do
        });
};

function loadQuestion() {
    const q = Math.floor(Math.random() * questionBank.length);
    questionText.innerHTML = questionBank[questionIndex].question;
    /* console.log(questionBank[questionIndex].question); */
    createOptions();
    timerStart();
    scoreBoard();
    currentQuestionNum.innerHTML = (questionIndex + 1) + " / " +
        questionBank.length;
}

function createOptions() {
    clearOptionBox();
    questionBank[questionIndex].options.forEach(function(item, i) {
        const option = document.createElement("button");
        option.innerHTML = item;
        option.classList.add("option");
        option.id = i + 1;
        option.setAttribute("onclick", "checkAnswer(this)");
        optionBox.appendChild(option);
    });
}

function clearOptionBox() {
    optionBox.innerHTML = "";
    unshow(answerDescription);
}

function checkAnswer(element) {
    timerStop();
    const id = element.id;
    /* console.log("the answer is " + questionBank[questionIndex].answer); */
    if (id == questionBank[questionIndex].answer) {
        element.classList.add("correct");
        score++;
        scoreBoard();
    } else {
        element.classList.add("wrong");
        // then show the right option
        showCorrectAnswer();
    }
    disableSelection();
    showAnswerDescription();
    questionIndex++;
    attempt++;
    if (questionIndex < questionBank.length) {
        show(nextQuestionBtn);
    } else {
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
    for (const child of optionBox.children) {
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
        if (timeLimit < 6) {
            remainingTime.classList.add("less-time");
        }
        if (timeLimit == 0) {
            clearInterval(interval);
            timeIsUp();
        }
    }, 1000);
}

function timerStop() {
    clearInterval(interval);
}

function timeIsUp() {
    // show time's up text when timer counts down to zero
    timeUpText.classList.add("show")
        // show correct answer when time is up
    for (let i = 0; i < optionBox.children.length; i++) {
        if (optionBox.children[i].id == questionBank[questionIndex].answer) {
            optionBox.children[i].classList.add("show-correct");
        }
    }
    disableSelection();
    showAnswerDescription();
    show(nextQuestionBtn)
    showCorrectAnswer();
    questionIndex++
}

function showCorrectAnswer() {
    for (let i = 0; i < optionBox.children.length; i++) {
        if (optionBox.children[i].id == questionBank[questionIndex].answer) {
            optionBox.children[i].classList.add("show-correct");
        }
    }
}

function quizResults() {
    DQS(".total-questions").innerHTML = questionBank.length;
    DQS(".total-attempts").innerHTML = attempt;
    DQS(".total-correct").innerHTML = score;
    DQS(".total-wrong").innerHTML = attempt - score;
    const percentage = (score / questionBank.length) * 100;
    DQS(".percentage").innerHTML = percentage.toFixed(2) + "%";

}


/* function demoQuestion_init() {
    // this will load demo questions from a json file
    score = 0;
    questionIndex = 0;
    attempt = 0;
    interval = [];
    fetch("./demoQuestions.json")
        .then(res => {
            return res.json();
        }).then(loadedQuestions => {
            questionBank = loadedQuestions;
        })
        .catch(err => {
        console.error(err);
    // catch any error in the debug console**
    // handle catch case for a promise so when smth went wrong
    // I know what to do
        });
}; */

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
    highScores.sort((a, b) => b.score - a.score)
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