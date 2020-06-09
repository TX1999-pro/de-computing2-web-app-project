const questionBank = [
    {
        question: "The Plaka is the oldest quarter of which city?",
        options:["Athens", "Prague", "Rome", "Vienna"],
        answer: 1
    },
    {
        question: "What is an axolotl?",
        options:["A nerve in the brain", "A multi-axled vehicle",
        "A type of mortice lock", "A species of salamander"],
        answer: 4
    },
    {
        question: "The Panama Canal was officially opened by which US president?",
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
        question: "After Adam, Eve, Cain and Abel who is the next person mentioned in the Bible?",
        options:["Enoch", "Jubal", "Lamech", "Zillah"],
        answer: 1
    }

];

const questionText = document.querySelector(".question-text");
const optionBox = document.querySelector(".option-box");
const questionIndex = 0;
let thisQuestion = questionBank[questionIndex]
/* function createOptions() {
    for(let i = 0, i < thisQuestion.options.length; i++ ){
        const option = document.createElement("div");
        option.innerHTML = item;
        option.classList.add("option");
        option.id = i;
        option.setAttribute("onclick", "check(this)");
        optionBox.appendChild(option);
    }
} */

function createOptions() {
    questionBank[questionIndex].options.forEach(function(item, i){
        const option = document.createElement("div");
        option.innerHTML = item;
        option.classList.add("option");
        option.id = i;
        option.setAttribute("onclick", "check(this)");
        optionBox.appendChild(option);
    });
}

function check(element) {
    const id= element.id;
    if (id === questionBank[questionIndex].answer) {
        element.classList.add("correct");
    }
    else {
        element.classList.add("wrong");
    }
}
function load() {
    questionText.innerHTML = questionBank[questionIndex].question;
    console.log(questionBank[questionIndex].question);
    createOptions();
}

/* window.onload = () => {
    questionText.innerHTML = questionBank[questionIndex].question;
    console.log(questionBank[questionIndex].question);
    createOptions();
} */

window.addEventListener("DOMContentLoaded", function(){
     questionText.innerHTML = questionBank[questionIndex].question;
    console.log(questionBank[questionIndex].question);
    createOptions();
});

