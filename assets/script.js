const startButton = document.getElementById('start-button');
const quizQuestions = document.getElementById('quiz-questions');
const timer = document.getElementById('timer');
const gameOverScreen = document.getElementById('game-over');
const initialsInput = document.getElementById('initials');
const saveScoreButton = document.getElementById('save-score');
const highScoreSection = document.getElementById('high-scores');
const quizScores = document.getElementById('quiz-scores');
const retakeBtn = document.getElementById('retake');
const clearScoresBtn = document.getElementById('clear-scores');


let timeLeft = 60; 

    // Quiz questions
const questions = [
    {   //q1
        question: 'What does the "DOM" stand for in JavaScript?',
        options: ['Document Object Model', 'Data Object Model', 'Document Oriented Model', 'Domino'],
        correctAnswer: 'Document Object Model',
    },
    {   //q2
        question: 'What is the correct way to declare a JavaScript variable?',
        options: ['var name;', 'variable name;', 'v name;', 'declare name;'],
        correctAnswer: 'var name;',
    },
    {   //q3
        question: 'Which of the following is not a JavaScript data type?',
        options: ['String', 'Boolean', 'Float', 'Undefined'],
        correctAnswer: 'Float',
    },
    {   //q4
        question: 'What is the result of 5 + "5" in JavaScript?',
        options: ['10', '55', '5 + "5"', 'Error'],
        correctAnswer: '55',
    },
    {   //q5
        question: 'What is the purpose of the JavaScript `console.log()` method?',
        options: ['To display a message box', 'To write data to a file', 'To print output to the console', 'To create an alert'],
        correctAnswer: 'To print output to the console',
    },
    {   //q6
        question: 'How do you declare a "Function" in Javascript?',
        options: ['Func()', 'Function functionName', 'function functionName() {}', 'function variableName'],
        correctAnswer: 'function functionName() {}', 
    },
    {   //q7
        question: 'Which answer is boolean?',
        options: ['Ten', '10', '10=boolean', 'var ten=true'],
        correctAnswer: 'var ten=true', 
    },
    {   //q8
        question: 'How would you add a comment in JavaScript?',
        options: ['//', '/', '/.', './'],
        correctAnswer: '//',
    },
    {   //q9
        question: 'Which data structure is used to store a collection of values in JavaScript?',
        options: ['Object', 'Function', 'String', 'Array'],
        correctAnswer: 'Array',
    },
    {   //q10
        question: 'What does an "if" statement in JavaScript do?',
        options: ['Defnines a function', 'Creates a loop', 'Executes a block of code conditionally', 'Declares the variable "if"'],
        correctAnswer: 'Array',
    },
];

let countdown;
let currentQuestionIndex = 0;

// Function to start the quiz
function startQuiz() {
    startButton.style.display = 'none';
    timer.textContent = 'Time: ' + timeLeft + ' seconds';
    displayNextQuestion();
    startTimer();
}

// Function to display the next question
function displayNextQuestion() {
    if (currentQuestionIndex < questions.length) 
    {
        const question = questions[currentQuestionIndex];
        const optionsContainer = document.createElement('div');

        // Display the question text
        quizQuestions.innerHTML = '<p>' + question.question + '</p>';

        // Display answer options
        question.options.forEach((option) => {
            const optionButton = document.createElement('button');
            optionButton.textContent = option;

            // Add an event listener to handle the answer
            optionButton.addEventListener('click', () => {
                answerQuestion(option);
            });

            optionsContainer.appendChild(optionButton);
        });

        quizQuestions.appendChild(optionsContainer);
    } 
    else 
    {
        //set time here
        endGame();
    }
}


// Function to start the timer
function startTimer() {
    countdown = setInterval(function () {
        timeLeft--;
        if (timeLeft === 1 ) {
            timer.textContent = 'Time: ' + timeLeft + ' second';
        }
        else {
            timer.textContent = 'Time: ' + timeLeft + ' seconds';
        }

        if (timeLeft <= 0) {
            clearInterval(countdown);
            endGame();
        }
    }, 1000);
}

// Function to handle when a question is answered
function answerQuestion(selectedOption) {
    const question = questions[currentQuestionIndex];

    if (selectedOption != question.correctAnswer)
    {
        if (timeLeft < 10) 
        {
            timeLeft === 0
        } 
        else 
        {
            timeLeft = timeLeft - 10;
        }
    }
console.log(timeLeft)
    currentQuestionIndex++;
    displayNextQuestion();
}
function questionsAnswered() {
    return currentQuestionIndex === questions.length;
}
function checkQuiz() {
    if (questionsAnswered() || timeLeft <=0) {
        endGame()
    } 
}
// Function to end the game
function endGame() {
    clearInterval(countdown);
    quizQuestions.style.display = 'none';
    gameOverScreen.style.display = 'block';
}

// Event listeners
startButton.addEventListener('click', startQuiz);
saveScoreButton.addEventListener('click', saveScore);
retakeBtn.addEventListener('click', retakeQuiz);
clearScoresBtn.addEventListener('click', clearScores);

function saveScore(){

    var existingScores = JSON.parse(localStorage.getItem("highScores"));
    if(existingScores == null) existingScores = [];
    var score = {
        initials: document.getElementById("initials").value,
        score: timeLeft
    };
    localStorage.setItem("score", JSON.stringify(score));

    existingScores.push(score);
    localStorage.setItem("highScores", JSON.stringify(existingScores));

    existingScores.forEach((score) => {
        const scoresContainer = document.createElement('div');
        scoresContainer.innerHTML = '<p>' + score.initials + ' ' + score.score + '</p>';
        quizScores.appendChild(scoresContainer);
    });

    timer.style.display = 'none';
    gameOverScreen.style.display = 'none';
    highScoreSection.style.display = 'block';
}

function retakeQuiz() {
    location.reload();
}

function clearScores() {
    localStorage.clear();
    quizScores.textContent = "";
} 
