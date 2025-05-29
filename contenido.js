document.addEventListener('DOMContentLoaded', () => {
    const questions = [
        {
            question: "¿Cuál es el orden de anfibios que incluye ranas y sapos?",
            options: { A: "Caudata", B: "Anura", C: "Gymnophiona" },
            correctAnswer: "B"
        },
        {
            question: "¿Qué tipo de piel tienen los anfibios, que les permite respirar a través de ella?",
            options: { A: "Piel escamosa y seca", B: "Piel húmeda y permeable", C: "Piel con plumas" },
            correctAnswer: "B"
        },
        {
            question: "¿Cuál de estos NO es un anfibio?",
            options: { A: "Salamandra", B: "Serpiente", C: "Tritón" },
            correctAnswer: "B"
        },
        {
            question: "¿En qué etapa del ciclo de vida de una rana suele respirar con branquias?",
            options: { A: "Adulto", B: "Renacuajo", C: "Huevo" },
            correctAnswer: "B"
        },
        {
            question: "¿Qué significa 'anfibio' etimológicamente?",
            options: { A: "Vida en el aire", B: "Doble vida", C: "Vida en el agua" },
            correctAnswer: "B"
        }
    ];

    let currentQuestionIndex = 0;
    let score = 0;
    let selectedOption = null;

    const questionSection = document.getElementById('question-section');
    const resultsSection = document.getElementById('results-section');
    const questionText = document.getElementById('question-text');
    const optionsContainer = document.getElementById('options-container');
    const feedbackMessage = document.getElementById('feedback-message');
    const nextButton = document.getElementById('next-button');
    const questionCounter = document.getElementById('question-counter');
    const progressBar = document.getElementById('progress-bar');
    const finalScoreSpan = document.getElementById('final-score');
    const totalQuestionsSpan = document.getElementById('total-questions');
    const restartButton = document.getElementById('restart-button');

    function loadQuestion() {
        if (currentQuestionIndex < questions.length) {
            const currentQuestion = questions[currentQuestionIndex];
            questionText.textContent = currentQuestion.question;
            optionsContainer.innerHTML = '';
            feedbackMessage.textContent = '';
            feedbackMessage.className = 'feedback-message'; // Reset class
            nextButton.style.display = 'none';
            selectedOption = null;

            // Update question counter
            questionCounter.textContent = `Pregunta ${currentQuestionIndex + 1} de ${questions.length}`;

            // Update progress bar
            const progress = ((currentQuestionIndex) / questions.length) * 100;
            progressBar.style.width = `${progress}%`;


            for (const key in currentQuestion.options) {
                const button = document.createElement('button');
                button.classList.add('option-button');
                button.setAttribute('data-option', key);
                button.textContent = `${key}) ${currentQuestion.options[key]}`;
                button.addEventListener('click', () => selectOption(button, key, currentQuestion.correctAnswer));
                optionsContainer.appendChild(button);
            }
        } else {
            showResults();
        }
    }

    function selectOption(button, selectedKey, correctAnswer) {
        // Disable all buttons once an option is selected
        document.querySelectorAll('.option-button').forEach(btn => {
            btn.disabled = true;
            btn.classList.remove('selected'); // Remove selected from previous attempts
        });

        selectedOption = selectedKey;
        button.classList.add('selected');

        if (selectedKey === correctAnswer) {
            score++;
            feedbackMessage.textContent = "¡Correcto! Bien hecho.";
            feedbackMessage.classList.add('correct-feedback');
            button.classList.add('correct');
        } else {
            feedbackMessage.textContent = `Incorrecto. La respuesta correcta era la opción ${correctAnswer}.`;
            feedbackMessage.classList.add('incorrect-feedback');
            button.classList.add('incorrect');
            // Highlight the correct answer
            document.querySelector(`.option-button[data-option="${correctAnswer}"]`).classList.add('correct');
        }
        nextButton.style.display = 'block';
    }

    function showResults() {
        questionSection.style.display = 'none';
        resultsSection.style.display = 'block';
        finalScoreSpan.textContent = score;
        totalQuestionsSpan.textContent = questions.length;
        // Ensure progress bar is full at the end
        progressBar.style.width = '100%';
    }

    function restartQuiz() {
        currentQuestionIndex = 0;
        score = 0;
        selectedOption = null;
        resultsSection.style.display = 'none';
        questionSection.style.display = 'block';
        loadQuestion();
    }

    // Event Listeners
    nextButton.addEventListener('click', () => {
        currentQuestionIndex++;
        loadQuestion();
    });

    restartButton.addEventListener('click', restartQuiz);

    // Initial load
    loadQuestion();
});
