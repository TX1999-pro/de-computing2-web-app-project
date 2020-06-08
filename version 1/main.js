import quizUI from "./quizUI.js";


const questions = [
    {
        question: "How old is TX?",
        answers: [
            {text: "4", correct: false},
            {text: "21", correct: true},
            {text: "Forever 18!", correct: true}
        ]
    },
    {
        question: "Who is your daddy?",
        answers: [
            {text: "A", correct: true},
            {text: "B", correct: false},
            {text: "C", correct: false}
        ]
    },
    {
        question: "Is computing fun?",
        answers: [
            {text: "Yes", correct: false},
            {text: "No", correct: true}
        ]
    }

];

window.addEventListener("DOMContentLoaded", function () {
    quizUI.init(questions);
});