const questions = [
    {
        question: "Which is the largest animal in the world?",
        answers : [
            {text: "Shark", correct: false},
            {text: "Blue Whale", correct: true},
            {text: "Elephant", correct: false},
            {text: "Giraffe", correct: false},
        ]
    },
    {
        question: "In which city did the Olympic games originate?",
        answers : [
            {text: "Istanbul", correct: false},
            {text: "London", correct: false},
            {text: "Stockholm", correct: false},
            {text: "Athens", correct: true},
        ]
    },
    {
        question: "Where is the Great Pyramid of Giza located?",
        answers : [
            {text: "Egypt", correct: true},
            {text: "Germany", correct: false},
            {text: "China", correct: false},
            {text: "Brazil", correct: false},
        ]
    },
    {
        question: "What do bees produce?",
        answers : [
            {text: "Pepper", correct: false},
            {text: "Salt", correct: false},
            {text: "Water", correct: false},
            {text: "Honey", correct: true},
        ]
    },

];

const questionElement = document.getElementById("question");
const nextButton = document.getElementById("next-btn");
const answerButtons = document.getElementById("answer-buttons");

// console.log("questionElement", questionElement);
// console.log("nextButton", nextButton);
// console.log("answerButton", answerButton);

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML ="Next";
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach( answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add ("btn");
        answerButtons.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function    resetState () {
    nextButton.style.display = "none";
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
        
    }
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("incorrect");
    }

    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add ("correct");       
        }
        button.disabled = true ;
    });
    nextButton.style.display = "block"; 

}

function showScore() {
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length} ! ` ;
    nextButton.innerHTML = "Play again";
    nextButton.style.display = "block";
}

function handleNextButton() {
    currentQuestionIndex ++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
    
}

nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length) {
        handleNextButton();
    } else{
        startQuiz();
    }
});

startQuiz();


