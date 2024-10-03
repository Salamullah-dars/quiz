let questions = [
    { question: "What is the capital of France?", options: ["Paris", "London", "Berlin", "Madrid"], answer: "Paris" },
    { question: "Which planet is known as the Red Planet?", options: ["Earth", "Mars", "Jupiter", "Saturn"], answer: "Mars" },
    { question: "What is the largest ocean on Earth?", options: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"], answer: "Pacific Ocean" }
];

let currentQuestionIndex = 0;
let score = 0;
let username = '';

function login() {
    username = document.getElementById('username').value;
    if (username) {
        document.getElementById('auth').style.display = 'none';
        document.getElementById('quiz').style.display = 'block';
        loadQuestion();
    } else {
        alert("Please enter your name");
    }
}

function loadQuestion() {
    if (currentQuestionIndex < questions.length) {
        const questionContainer = document.getElementById('question-container');
        questionContainer.innerHTML = `
            <h3>${questions[currentQuestionIndex].question}</h3>
            ${questions[currentQuestionIndex].options.map(option => `
                <label>
                    <input type="radio" name="option" value="${option}"> ${option}
                </label>
            `).join('')}
        `;
    } else {
        showScore();
    }
}

function nextQuestion() {
    const selectedOption = document.querySelector('input[name="option"]:checked');
    if (!selectedOption) {
        alert("Please select an answer");
        return;
    }
    const answer = selectedOption.value;
    if (answer === questions[currentQuestionIndex].answer) {
        score++;
        document.getElementById('feedback').innerText = "Correct!";
    } else {
        document.getElementById('feedback').innerText = `Wrong! The correct answer is ${questions[currentQuestionIndex].answer}.`;
    }

    currentQuestionIndex++;
    document.getElementById('feedback').style.display = 'block';
    document.getElementById('next-button').disabled = true;

    setTimeout(() => {
        document.getElementById('feedback').style.display = 'none';
        document.getElementById('next-button').disabled = false;
        loadQuestion();
    }, 2000);
}

function showScore() {
    document.getElementById('quiz').style.display = 'none';
    document.getElementById('score').innerText = `${username}, your score is: ${score} out of ${questions.length}`;
    document.getElementById('score').style.display = 'block';
    updateLeaderboard();
}

function updateLeaderboard() {
    const leaderboardList = document.getElementById('leaderboard-list');
    const leaderboard = JSON.parse(localStorage.getItem('leaderboard')) || [];
    leaderboard.push({ username, score });
    localStorage.setItem('leaderboard', JSON.stringify(leaderboard));

    leaderboardList.innerHTML = '';
    leaderboard.sort((a, b) => b.score - a.score).forEach(entry => {
        const li = document.createElement('li');
        li.innerText = `${entry.username}: ${entry.score}`;
        leaderboardList.appendChild(li);
    });

    document.getElementById('leaderboard').style.display = 'block';
}
