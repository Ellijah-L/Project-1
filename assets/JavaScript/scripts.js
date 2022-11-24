const startButton = document.getElementById('start-btn');
const nextButton = document.getElementById('next-btn');
const questionContainerElement = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const answerButtonElement = document.getElementById('answer-buttons');

let shuffleQuestions, currentQuestions

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
    currentQuestions++;
    setNextQuestion()
})

function startGame() {
    startButton.classList.add('hide');
    shuffleQuestions = questions.sort(() => Math.random() - .5)
    currentQuestions = 0
    questionContainerElement.classList.remove('hide');
    setNextQuestion()
}

function setNextQuestion() {
    resetState();
    showQuestion(shuffleQuestions[currentQuestions])
}

function showQuestion(question) {
    questionElement.innerText = question.question
    question.answers.forEach(answer => {
        const button = document.createElement('button')
        button.innerText = answer.text
        button.classList.add('btn')
        if (answer.correct) {
            button.dataset.correct = answer.correct
        }
        button.addEventListener('click', selectAnswer)
        answerButtonElement.appendChild(button)
    });
        
    
}

function resetState() {
    clearStatusClass(document.body)
    nextButton.classList.add('hide')
    while (answerButtonElement.firstChild) {
        answerButtonElement.removeChild(answerButtonElement.firstChild)

    }
}


function selectAnswer(e) {
    const selectedButton = e.target
    const correct = selectedButton.dataset.correct
    setStatusClass(document.body, correct)
    Array.from(answerButtonElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct)
    })
    if (shuffleQuestions.length > currentQuestions + 1) {
        nextButton.classList.remove('hide')
    } else {
        startButton.innerText = 'Restart'
        startButton.classList.remove('hide')
    }
    nextButton.classList.remove('hide')
}

function setStatusClass(element, correct) {
    clearStatusClass(element)
    if (correct) {
        element.classList.add('correct')
} else {
    element.classList.add('wrong')
}
}

function clearStatusClass(element) {
    element.classList.remove('correct')
    element.classList.remove('wrong')
}

const questions = [
    {
        question: 'What HTML tag should be used to add links?',
        answers: [
            {text : 'a', correct: true},
            {text : 'i', correct: false},
            {text : 'link', correct: false},
            {text :'script', correct: false},
        ]
    },
    {
    
        question: 'What semantic HTML element can we use to group elements and text that are the main focus of the web page?',
        answers: [
            {text : 'header', correct: true},
            {text : 'div', correct: false},
            {text : 'section', correct: false},
            {text :'main', correct: true},
        ]
    },
    {
        question: 'How many columns does a row hold in Bootstrap?',
        answers: [
            {text :'12', correct: true},
            {text : '8', correct: false},
            {text :'As many as you want', correct: false},
            {text :'Columns hold rows', correct: false},
        ]
    },
    {
        question: 'How do you link a JavaScript file?',
        answers: [
            {text :'Link tags in the head', correct: false},
            {text : 'Script tags in the head', correct: true},
            {text :'Script tags in the body', correct: false},
            {text :'Script tags at the end of the body', correct: false},
        ]
    },
    {
        question: 'What is your favorite genre of music?',
        answers: [
            {text :'what?', correct: true},
            {text : "I can't choose. I enjoy every genre", correct: true},
            {text :'Country', correct: true},
            {text :'Pop', correct: true},
        ]
    },
];