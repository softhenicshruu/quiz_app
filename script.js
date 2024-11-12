console.log("Script loaded");

const questions = [
    {
        question:"Who wrote the novel 'Pride and Prejudice'?",
        answers:[
            {text:"A) Jane Austen", correct:"true"},
            {text:"B) Emily Brontë", correct:"false"},
            {text:"C) Charlotte Brontë", correct:"false"},
            {text:"D) George Eliot", correct:"false"},
        ]
    },
    {
        question:"Which novel features the character 'Atticus Finch'?",
        answers:[
            {text:"A) 1984", correct:"false"},
            {text:"B) The Catcher in the Rye", correct:"false"},
            {text:"C) To Kill a Mockingbird", correct:"true"},
            {text:"D) The Great Gatsby", correct:"false"},
        ]
    },
    {
        question:"Who wrote the famous poem 'The Raven'? ",
        answers:[
            {text:"A) William Blake", correct:"false"},
            {text:"B) Emily Dickinson", correct:"false"},
            {text:"C) Edgar Allan Poe", correct:"true"},
            {text:"D) Robert Frost", correct:"false"},
        ]
    },
    {
        question:"In which poem would you find the line 'I wandered lonely as a cloud'?",
        answers:[
            {text:"A) The Waste Land", correct:"false"},
            {text:"B) Daffodils", correct:"true"},
            {text:"C) The Road Not Taken", correct:"false"},
            {text:"D) Ozymandias", correct:"false"},
        ]
    },
    {
        question:"Which Russian author wrote 'War and Peace'?",
        answers:[
            {text:"A) Fyodor Dostoevsky", correct:"false"},
            {text:"B) Leo Tolstoy", correct:"true"},
            {text:"C) Anton Chekhov", correct:"false"},
            {text:"D) Ivan Turgenev", correct:"false"},
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButton = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    console.log ("Quiz starting...");
    currentQuestionIndex=0;
    score=0;
    nextButton.innerHTML="Next";
    nextButton.style.display = "none";
    showQuestion();

}


function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo= currentQuestionIndex +1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer =>{
        const button = document.createElement("button");
        button.innerHTML= answer.text;
        button.classList.add("btn");
        answerButton.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState(){
    nextButton.style.display = "none";
    while(answerButton.firstChild)
        answerButton.removeChild(answerButton.firstChild);
}
function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct ==="true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButton.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `You Scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again"
    nextButton.style.display = "block"

}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    } else{
        startQuiz();
    }
} )


startQuiz();
