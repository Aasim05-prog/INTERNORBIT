const quizData = [
    {
        question: "What is the national animal of India?",
        options: ["Tiger", "Elephant", "Lion", "Peacock"],
        correctAnswer: "Tiger"
    },
    {
        question: "Who was the first Indian to win a Nobel Prize?",
        options: ["Rabindranath Tagore", "C.V. Raman", "Subhas Chandra Bose", "Vikram Sarabhai"],
        correctAnswer: "Rabindranath Tagore"
    },
    {
        question: "Which is the longest river in India?",
        options: ["Ganges", "Yamuna", "Godavari", "Narmada"],
        correctAnswer: "Ganges"
    },
    {
        question: "Who was the captain of the Indian cricket team during the 2011 World Cup?",
        options: ["Sourav Ganguly", "Kapil Dev", "MS Dhoni", "Virat Kohli"],
        correctAnswer: "MS Dhoni"
    },
    {
        question: "Who is known as the 'Iron Man of India'?",
        options: ["Jawaharlal Nehru", "Mahatma Gandhi", "Sardar Vallabhbhai Patel", "Subhas Chandra Bose"],
        correctAnswer: "Sardar Vallabhbhai Patel"
    }
];

let currentQuestionIndex = 0;
let score = 0;
let userAnswers = [];

function loadQuestion() {
    const quizContainer = document.getElementById("quiz");
    const questionData = quizData[currentQuestionIndex];

    const questionContainer = document.getElementById("question-container");
    questionContainer.innerHTML = `
        <div class="question">
            <p>${questionData.question}</p>
            ${questionData.options.map((option) => {
                return `
                    <label>
                        <input type="radio" name="answer" value="${option}">
                        ${option}
                    </label>
                `;
            }).join('')}
        </div>
    `;

    const progress = document.getElementById("progress");
    progress.innerHTML = `Attempted: ${getAttemptedQuestions()} / ${quizData.length} | Remaining: ${quizData.length - getAttemptedQuestions()}`;

    const previousAnswer = userAnswers[currentQuestionIndex];
    if (previousAnswer) {
        const checkedRadio = document.querySelector(`input[name="answer"][value="${previousAnswer}"]`);
        if (checkedRadio) {
            checkedRadio.checked = true;
        }
    }

    document.getElementById("back-btn").style.display = currentQuestionIndex === 0 ? "none" : "inline-block";
}

function getAttemptedQuestions() {
    return userAnswers.filter(answer => answer !== null).length;
}

function checkAnswer() {
    const selectedOption = document.querySelector('input[name="answer"]:checked');
    if (selectedOption && selectedOption.value === quizData[currentQuestionIndex].correctAnswer) {
        score++;
    }
    userAnswers[currentQuestionIndex] = selectedOption ? selectedOption.value : null;
}

function nextQuestion() {
    checkAnswer();
    currentQuestionIndex++;
    if (currentQuestionIndex < quizData.length) {
        loadQuestion();
    } 
    else {
        showResults();
    }
}

function prevQuestion() {
    checkAnswer();
    currentQuestionIndex--;
    loadQuestion();
}

function showResults() {
    const resultContainer = document.getElementById("result");
    let message = "";
    let color = "";
    if (score >= 2) {
        message = "Congratulations! Great Job!";
        color = "#28a745"; 
    } 
    else if (score === 1) {
        message = "Better Luck Next Time!";
        color = "#ffc107"; 
    } 
    else {
        message = "Oops! Try again!";
        color = "#dc3545"; 
    }

    resultContainer.innerHTML = `
        <h3 style="color: ${color};">${message}</h3>
        <p>Your score: ${score} / ${quizData.length}</p>
        <button id="repeat-btn">Repeat Quiz</button>
    `;

    document.getElementById("quiz").style.display = "none";
    document.getElementById("result").style.display = "block";
    document.getElementById("next-btn").style.display = "none";
    document.getElementById("back-btn").style.display = "none";
    document.getElementById("submit-btn").style.display = "none";
    document.getElementById("repeat-btn").addEventListener("click", function() {
        currentQuestionIndex = 0;
        score = 0;
        userAnswers = [];
        document.getElementById("result").style.display = "none";
        document.getElementById("quiz").style.display = "block";
        document.getElementById("next-btn").style.display = "inline-block";
        document.getElementById("submit-btn").style.display = "inline-block";
        loadQuestion();
    });
}

function handleSubmit() {
    if (getAttemptedQuestions() === quizData.length) {
        checkAnswer();
        showResults();
    } 
    else {
        alert("Please answer all the questions before submitting.");
    }
}

document.getElementById("start-btn").addEventListener("click", () => {
    document.getElementById("intro-screen").style.display = "none";
    document.getElementById("quiz").style.display = "block";
    document.getElementById("submit-btn").style.display = "inline-block";
    document.getElementById("next-btn").style.display = "inline-block";
    loadQuestion();
});

document.getElementById("submit-btn").addEventListener("click", handleSubmit);

document.getElementById("next-btn").addEventListener("click", nextQuestion);

document.getElementById("back-btn").addEventListener("click", prevQuestion);
