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
        answer: 4
    },
    {
        question: "The Panama Canal was officially "+
        "opened by which US president?",
        options:["Calvin Coolidge", "Herbert Hoover",
        "Theodore Roosevelt", "Woodrow Wilson"],
        answer: 4
    },
    {
        question: "What is a kudzu?",
        options:["Antelope", "Bird", "Jewish settlement", "Climbing plant"],
        answer: 1
    },
    {
        question: "After Adam, Eve, Cain and Abel who is the next person " +
        "mentioned in the Bible?",
        options:["Enoch", "Jubal", "Lamech", "Zillah"],
        answer: 1
    }

];

const DQS = (el) => document.querySelector(el);
const questionText = DQS(".question-text");
const optionBox = DQS(".option-box");
const answerDescription = DQS(".answer-description");
const nextQuestionBtn = DQS(".next-question-btn");
let questionIndex = 0;
const currentQuestionNum = DQS(".current-question-num");
const correctAnswer = DQS(".correct-answers");
let score=0;

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
}

function checkAnswer(element) {
    const id= element.id;
    /* console.log("the answer is " + questionBank[questionIndex].answer); */
    if (id == questionBank[questionIndex].answer) {
        element.classList.add("correct");
        score++;
        scoreBoard();
    }
    else {
        element.classList.add("wrong");
    }
    disableSelection();
    showAnswerDescription();
    showNextQuestionBtn();
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
        answerDescription.classList.add("show");
        answerDescription.innerHTML = description;
    }
}

function showNextQuestionBtn() {
    nextQuestionBtn.classList.add("show");
}

function scoreBoard() {
    correctAnswer.innerHTML = score;
}

nextQuestionBtn.addEventListener("click", nextQuestion);

function nextQuestion() {
    questionIndex++
    if (questionIndex+1 < questionBank.length) {
        loadQuestion();
    }
    else {
        console.log("this is the end of the quiz");
    }
}
function loadQuestion() {
    questionText.innerHTML = questionBank[questionIndex].question;
    /* console.log(questionBank[questionIndex].question); */
    createOptions();
    scoreBoard();
    currentQuestionNum.innerHTML = (questionIndex+1) + " / " + questionBank.length;
}
window.addEventListener("DOMContentLoaded", loadQuestion());

