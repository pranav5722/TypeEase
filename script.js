
const referenceParagraphElement = document.getElementById('referenceParagraph');
const textAreaElement = document.getElementById('textArea');
const timerElement = document.getElementById('timer');
const startButton = document.getElementById('startButton');
const quitButton = document.getElementById('quitButton');
const restartButton = document.getElementById('restartButton');
const resultsElement = document.getElementById('results');

const paragraphs = [
    "The quick brown fox jumps over the lazy dog.",
    "A journey of a thousand miles begins with a single step.",
    "To be or not to be, that is the question.",
    "All that glitters is not gold.",
    "The pen is mightier than the sword.",
    "She sells sea shells by the sea shore.",
    "How much wood would a woodchuck chuck if a woodchuck could chuck wood?",
    "I scream, you scream, we all scream for ice cream.",
    "Peter Piper picked a peck of pickled peppers.",
    "Fuzzy Wuzzy was a bear, Fuzzy Wuzzy had no hair."
];

let currentParagraph = '';
let timer;
let timeLeft = 60.00;
let totalWords = 0;
let correctWords = 0;
let incorrectWords = 0;
let sessionWords = 0;
let sessionCorrectWords = 0;
let sessionIncorrectWords = 0;

function startTest() {
    resetTest();
    startButton.disabled = true;
    quitButton.disabled = false;
    restartButton.disabled = false;
    textAreaElement.disabled = false;
    textAreaElement.value = '';
    textAreaElement.focus();
    currentParagraph = getRandomParagraph();
    referenceParagraphElement.textContent = currentParagraph;
    timerElement.style.display = 'flex';
    startTimer();
}

function quitTest() {
    clearInterval(timer);
    textAreaElement.disabled = true;
    displayResults();
    referenceParagraphElement.textContent = 'Press "Start" to begin the typing test.';
    startButton.disabled = false;
    quitButton.disabled = true;
    restartButton.disabled = true;
    timerElement.style.display = 'none';
}

function restartTest() {
    resetTest();
    startTest();
}

function resetTest() {
    clearInterval(timer);
    timeLeft = 60.00;
    totalWords = 0;
    correctWords = 0;
    incorrectWords = 0;
    sessionWords = 0;
    sessionCorrectWords = 0;
    sessionIncorrectWords = 0;
    referenceParagraphElement.textContent = 'Press "Start" to begin the typing test.';
    textAreaElement.disabled = true;
    textAreaElement.value = '';
    timerElement.textContent = '60.00';
    resultsElement.textContent = '';
    startButton.disabled = false;
    quitButton.disabled = true;
    restartButton.disabled = true;
    timerElement.style.display = 'none';
}

function startTimer() {
    timer = setInterval(() => {
        if (timeLeft <= 0.01) {
            clearInterval(timer);
            timerElement.textContent = '0.00';
            displayResults();
            textAreaElement.disabled = true;
        } else {
            timeLeft -= 0.01;
            timerElement.textContent = timeLeft.toFixed(2);
        }
    }, 10);
}

function getRandomParagraph() {
    const index = Math.floor(Math.random() * paragraphs.length);
    return paragraphs[index];
}

function displayResults() {
    const wpm = ((sessionCorrectWords / (60 - timeLeft / 60)) * 60).toFixed(2);
    resultsElement.innerHTML = `Total Words: ${sessionWords}<br>
                                Words Per Minute (WPM): ${wpm}`;
}

textAreaElement.addEventListener('input', () => {
    const typedText = textAreaElement.value;
    const referenceWords = currentParagraph.split(' ');
    const typedWords = typedText.trim().split(' ');

    totalWords = typedWords.length;
    correctWords = 0;
    incorrectWords = 0;

    referenceWords.forEach((word, index) => {
        const typedWord = typedWords[index] || '';
        if (word === typedWord) {
            correctWords++;
        } else {
            incorrectWords++;
        }
    });

    if (typedText.trim() === currentParagraph) {
        sessionWords += totalWords;
        sessionCorrectWords += correctWords;
        sessionIncorrectWords += incorrectWords;
        textAreaElement.value = '';
        currentParagraph = getRandomParagraph();
        referenceParagraphElement.textContent = currentParagraph;
    }
});

startButton.addEventListener('click', startTest);
quitButton.addEventListener('click', quitTest);
restartButton.addEventListener('click', restartTest);
