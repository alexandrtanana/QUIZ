document.addEventListener('DOMContentLoaded', () => {
    // Элементы DOM
    const startScreen = document.getElementById('start-screen');
    const quizScreen = document.getElementById('quiz-screen');
    const resultScreen = document.getElementById('result-screen');
    const startBtn = document.getElementById('start-btn');
    const nextBtn = document.getElementById('next-btn');
    const restartBtn = document.getElementById('restart-btn');
    const questionElement = document.getElementById('question');
    const optionsElement = document.getElementById('options');
    const currentQuestionElement = document.getElementById('current');
    const totalQuestionsElement = document.getElementById('total');
    const scoreElement = document.getElementById('score');
    const maxScoreElement = document.getElementById('max-score');
    const resultMessageElement = document.getElementById('result-message');
    const progressElement = document.querySelector('.progress');

    // Вопросы для квиза
    const quizQuestions = [
        {
            question: "Какой язык программирования самый популярный в 2023 году?",
            options: ["Python", "JavaScript", "Java", "C++"],
            correct: 1
        },
        {
            question: "Какая социальная сеть была первой?",
            options: ["Facebook", "MySpace", "SixDegrees", "Twitter"],
            correct: 2
        },
        {
            question: "В каком году был выпущен первый iPhone?",
            options: ["2005", "2007", "2009", "2010"],
            correct: 1
        },
        {
            question: "Какой элемент периодической таблицы имеет символ 'Au'?",
            options: ["Серебро", "Аргон", "Золото", "Алюминий"],
            correct: 2
        },
        {
            question: "Кто написал роман '1984'?",
            options: ["Олдос Хаксли", "Джордж Оруэлл", "Рэй Брэдбери", "Франц Кафка"],
            correct: 1
        }
    ];

    let currentQuestion = 0;
    let score = 0;
    let selectedOption = null;

    // Инициализация квиза
    function initQuiz() {
        totalQuestionsElement.textContent = quizQuestions.length;
        maxScoreElement.textContent = quizQuestions.length;
    }

    // Загрузка вопроса
    function loadQuestion() {
        resetOptions();
        const question = quizQuestions[currentQuestion];
        questionElement.textContent = question.question;
        currentQuestionElement.textContent = currentQuestion + 1;
        
        // Обновление прогрессбара
        progressElement.style.width = `${((currentQuestion) / quizQuestions.length) * 100}%`;
        
        // Добавление вариантов ответов
        question.options.forEach((option, index) => {
            const optionElement = document.createElement('div');
            optionElement.classList.add('option');
            optionElement.textContent = option;
            optionElement.dataset.index = index;
            optionElement.addEventListener('click', selectOption);
            optionsElement.appendChild(optionElement);
        });
    }

    // Выбор варианта ответа
    function selectOption(e) {
        if (selectedOption !== null) return;
        
        const selectedElement = e.target;
        selectedOption = parseInt(selectedElement.dataset.index);
        
        // Подсветка выбранного варианта
        const options = document.querySelectorAll('.option');
        options.forEach(option => option.classList.remove('selected'));
        selectedElement.classList.add('selected');
        
        // Показ кнопки "Далее"
        nextBtn.classList.remove('hidden');
        
        // Проверка ответа и подсветка правильного/неправильного
        const question = quizQuestions[currentQuestion];
        if (selectedOption === question.correct) {
            selectedElement.classList.add('correct');
            score++;
        } else {
            selectedElement.classList.add('incorrect');
            options[question.correct].classList.add('correct');
        }
    }

    // Сброс вариантов ответа
    function resetOptions() {
        optionsElement.innerHTML = '';
        selectedOption = null;
        nextBtn.classList.add('hidden');
    }

    // Следующий вопрос
    function nextQuestion() {
        currentQuestion++;
        
        if (currentQuestion < quizQuestions.length) {
            loadQuestion();
        } else {
            showResults();
        }
    }

    // Показать результаты
    function showResults() {
        quizScreen.classList.remove('active');
        resultScreen.classList.add('active');
        
        scoreElement.textContent = score;
        
        // Сообщение в зависимости от результата
        if (score === quizQuestions.length) {
            resultMessageElement.textContent = "Потрясающе! Ты настоящий эксперт!";
        } else if (score >= quizQuestions.length * 0.7) {
            resultMessageElement.textContent = "Отличный результат! Ты хорошо разбираешься в разных темах!";
        } else if (score >= quizQuestions.length * 0.5) {
            resultMessageElement.textContent = "Неплохой результат! Есть куда стремиться!";
        } else {
            resultMessageElement.textContent = "Попробуй ещё раз! Ты一定能 сделать лучше!";
        }
    }

    // Перезапуск квиза
    function restartQuiz() {
        currentQuestion = 0;
        score = 0;
        selectedOption = null;
        
        resultScreen.classList.remove('active');
        startScreen.classList.add('active');
    }

    // Начало квиза
    function startQuiz() {
        startScreen.classList.remove('active');
        quizScreen.classList.add('active');
        loadQuestion();
    }

    // Назначение обработчиков событий
    startBtn.addEventListener('click', startQuiz);
    nextBtn.addEventListener('click', nextQuestion);
    restartBtn.addEventListener('click', restartQuiz);

    // Инициализация
    initQuiz();
});