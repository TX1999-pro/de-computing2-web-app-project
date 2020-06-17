import F from "./function.js";
import Ajax from "./ajax.js";
import leaderboard from "./leaderboard.js";

const UI = Object.create(null);


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
const endRequest = el("end-request");
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

UI.init = function() {

    document.getElementById("user-num").innerHTML = userNumber + "th";
    quizInit();
    setTimeout(loadHomeBox, 1500);


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
        show(quizBox);
        show(endRequest);
    });


    nextQuestionBtn.addEventListener("click", nextQuestion);

    seeResultBtn.addEventListener("click", () => {
        quizResults();
        unshow(quizBox);
        show(quizOverBox);
        show(endRequest);
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
                    questionBank = F.shuffle(loadedQuestions);
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
                questionBank = F.shuffle(loadedQuestions);
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
            option.addEventListener("click", () => checkAnswer(option));
            optionBox.appendChild(option);
        });
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

    function clearOptionBox() {
        optionBox.innerHTML = "";
        unshow(answerDescription);
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

    function quizOver() {
        unshow(nextQuestionBtn);
        show(seeResultBtn);
        /* console.log("quiz over!") */
    }

    /* username and score info */

    const username = el("username");
    const saveScoreBtn = el("saveScoreBtn");
    const highScores = [];
    const leaderBoard = el("leaderboard")
    const highScoresList = el("high-score-list");

    username.addEventListener("keyup", () => {
        // prevent empty input being sent
        saveScoreBtn.disabled = !username.value;
    });

    username.onkeydown = function(event){
        if (event.key !== "Enter" || event.shiftKey) {
            return; // do nothing special
        }
        submitScore();
        event.preventDefault();
    };

    function submitScore(){
        const request = {
            "username": username.value,
            "score": score,
            "time": "to be implemented"
        };
        console.log("the request created is");
        console.log(request);
        const response = Ajax.query(request);
        console.log("the response from ajax query is ");
        console.log(response);
        response.then(function(obj){
            leaderboard.update(obj);
        })
    }
    /* saveScoreBtn.addEventListener("click", (event) => {
        console.log("clicked the save button!");
        if (event.key !== "enter" || event.shiftKey) {
            return; // do nothing special
        }
        const request = JSON.stringify({
            "username": username.value
        });

        console.log(request);
        event.preventDefault();
    }); */

    /* highScoresList.innerHTML = highScores.map(
        score => {
            return `<li class="high-score"> ${score.name} - ${score.score}</li>`;
        }
    ).join(""); */



}

export default Object.freeze(UI);

/*


*/