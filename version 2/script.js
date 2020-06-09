const questionBank = [
    {
        question: "The Plaka is the oldest quarter of which city?",
        options:["Athens", "Prague", "Rome", "Vienna"],
        answer: 1,
        description: "Fun fact: Athens once had a wonderful civilisation."
    },
    {
        question: "What is an axolotl?",
        options:["A nerve in the brain", "A multi-axled vehicle",
        "A type of mortice lock", "A species of salamander"],
        answer: 4,
        description: "So what is salamander then :P"
    },
    {
        question: "The Panama Canal was officially "+
        "opened by which US president?",
        options:["Calvin Coolidge", "Herbert Hoover",
        "Theodore Roosevelt", "Woodrow Wilson"],
        answer: 4,
        description: "France began work on the canal in 1881, but stopped "+
        "because of engineering problems and a high worker mortality rate. "+
        "The United States took over the project in 1904 and opened the canal "+
        "on August 15, 1914. "
    },
    {
        question: "What is a kudzu?",
        options:["Antelope", "Bird", "Jewish settlement", "Climbing plant"],
        answer: 4,
        description: "Today, kudzu is used to treat alcoholism and to reduce " +
        "symptoms of alcohol hangover, including headache, " +
        "upset stomach, dizziness, and vomiting. ..."
    },
    {
        question: "After Adam, Eve, Cain and Abel who is the next person " +
        "mentioned in the Bible?",
        options:["Enoch", "Jubal", "Lamech", "Zillah"],
        answer: 1,
        description:"He was of the Antediluvian period in the Hebrew Bible."
    }

];

const DQS = (el) => document.querySelector(el);
const questionText = DQS(".question-text");
const optionBox = DQS(".option-box");
const answerDescription = DQS(".answer-description");
const nextQuestionBtn = DQS(".next-question-btn");
const seeResultBtn = DQS(".see-results-btn");
const currentQuestionNum = DQS(".current-question-num");
const correctAnswer = DQS(".correct-answers");
const remainingTime = DQS(".remaining-time");
const timeUpText = DQS(".time-up-text");

let score=0;
let questionIndex = 0;
let interval = [];

const hide = (el) => el.classList.remove("show");
const show = (el) => el.classList.add("show");


window.addEventListener("DOMContentLoaded", loadQuestion());
nextQuestionBtn.addEventListener("click", nextQuestion);

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
    if (questionIndex < questionBank.length) {
        showNextQuestionBtn();
    }
    else {
        quizOver();
    }
}

function nextQuestion() {
    if (questionIndex < questionBank.length) {
        loadQuestion();
        hide(answerDescription);
        hide(nextQuestionBtn);
        hide(timeUpText);
    }
    else {
        quizOver();
    }
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


function quizOver() {
    hide(nextQuestionBtn);
    show(seeResultBtn);
    /* console.log("quiz over!") */

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