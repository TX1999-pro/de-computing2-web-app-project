const quizUI = Object.create(null);

quizUI.init = function (questions) {
    const shuffledQuestions = questions.sort(() => Math.random() - 0.5);
    let currentQuestionIndex = 0;
    const el = (id) => document.getElementById(id);
    const cloneTemplate = function (id) {
        return document.importNode(el(id).content, true);
    };

    const startButton = el("start-btn");
    const nextButton = el("next-btn");
    const questionContainerEl = el("question-container");
    const questionEl = el("question");
    const answerButtonsEl = el("answer-buttons");

    function startGame() {
        /* console.log("Game Started"); */
        startButton.classList.add("hide");
        questionContainerEl.classList.remove("hide");
        setNextQuestion();
    }

    function setNextQuestion() {
        resetState();
        showQuestion(shuffledQuestions[currentQuestionIndex]);
    }

    function showQuestion(question) {
        questionEl.innerText = question.question;
        question.answers.forEach(function (answer) {
            const button = document.createElement("button");
            button.innerText = answer.text;
            button.classList.add("btn");
            if (answer.correct) {
                button.dataset.correct = answer.correct;
            }
            button.addEventListener("click", selectAnswer);
            answerButtonsEl.appendChild(button);
        });
    }
    startButton.addEventListener("click", startGame);
    nextButton.addEventListener("click", () => {
        currentQuestionIndex ++;
        setNextQuestion();
    });

    function resetState() {
        clearStatusClass(document.body);
        nextButton.classList.add("hide");
        while (answerButtonsEl.firstChild) {
            answerButtonsEl.removeChild(answerButtonsEl.firstChild);
        }
    }

    function setStatusClass(element, correct) {
        if (correct) {
            element.classList.add("correct");
        } else {
            element.classList.add("wrong");
        }
    }

    function clearStatusClass(element) {
        element.classList.remove("correct");
        element.classList.remove("wrong");
    }

    function selectAnswer(e) {
        const selectedButton = e.target;
        const correctness = selectedButton.dataset.correct;
        setStatusClass(document.body, correctness);
        Array.from(answerButtonsEl.children).forEach(function (button) {
            clearStatusClass(button);
            setStatusClass(button, button.dataset.correct);
        });
        if (shuffledQuestions.length > currentQuestionIndex +1) {
            nextButton.classList.remove("hide");
        } else {
            startButton.innerText = "Try again!";
            startButton.classList.remove("hide");
        }
    }
};


export default Object.freeze(quizUI);