document.addEventListener("DOMContentLoaded", () => {
    const startButton = document.getElementById("start-btn");
    const stopButton = document.getElementById("stop-btn");
    const resumeButton = document.getElementById("resumeBtn");
    const exitButton = document.getElementById("exitBtn");
    const gameBoard = document.getElementById("game-board");
    const timeDisplay = document.getElementById("time");
    const movesDisplay = document.getElementById("moves-count");
    const resultDiv = document.getElementById("result");
    const ratingDiv = document.getElementById("rating");
    const starsDiv = document.getElementById("stars");
    const ratingMessage = document.getElementById("rating-message");
    const restartButton = document.getElementById("restart-btn");

    let cards;
    let timerInterval;
    let flippedCards = [];
    let moves = 0;
    let seconds = 0;
    let isGameRunning = false;
    let cardValues = [];
    let matchedCards = 0;
    let isGamePaused = false; // New variable to track pause state

    const items = [
        { name: "Blue Bird", image: "./img/Blue Bird.png" },
        { name: "Elephant", image: "./img/Elephant.png" },
        { name: "Fish", image: "./img/Fish.png" },
        { name: "Gorilla", image: "./img/Gorilla.png" },
        { name: "Lion", image: "./img/Lion.png" },
        { name: "Orange Fish", image: "./img/Orange Fish.png" },
        { name: "Shark", image: "./img/Shark.png" },
        { name: "Sandal Bird", image: "./img/Sandal Bird.png" }
    ];

    const generateCardValues = () => {
        cardValues = [...items, ...items];
        cardValues.sort(() => Math.random() - 0.5);
    };

    const createCards = () => {
        gameBoard.innerHTML = "";
        generateCardValues();
        cardValues.forEach(value => {
            const cardContainer = document.createElement("div");
            cardContainer.classList.add("card-container");
            cardContainer.setAttribute("data-name", value.name);

            const cardBefore = document.createElement("div");
            cardBefore.classList.add("card-before");
            cardBefore.textContent = "";

            const cardAfter = document.createElement("div");
            cardAfter.classList.add("card-after");

            const cardImage = document.createElement("img");
            cardImage.src = value.image;
            cardAfter.appendChild(cardImage);

            cardContainer.appendChild(cardBefore);
            cardContainer.appendChild(cardAfter);

            gameBoard.appendChild(cardContainer);

            cardContainer.addEventListener("click", () => flipCard(cardContainer));
        });
    };

    const flipCard = (card) => {
        if (flippedCards.length < 2 && !card.classList.contains("flipped") && !card.classList.contains("matched")) {
            card.classList.add("flipped");
            flippedCards.push(card);

            if (flippedCards.length === 2) {
                moves++;
                movesDisplay.textContent = `Moves: ${moves}`;
                checkForMatch();
            }
        }
    };

    const checkForMatch = () => {
        const [firstCard, secondCard] = flippedCards;
        const firstCardValue = firstCard.getAttribute("data-name");
        const secondCardValue = secondCard.getAttribute("data-name");

        if (firstCardValue === secondCardValue) {
            firstCard.classList.add("matched");
            secondCard.classList.add("matched");
            matchedCards++;

            if (matchedCards === cardValues.length / 2) {
                stopGame();
            }

            flippedCards = [];
        } else {
            setTimeout(() => {
                firstCard.classList.remove("flipped");
                secondCard.classList.remove("flipped");
                flippedCards = [];
            }, 1000);
        }
    };

    const startGame = () => {
        moves = 0;
        seconds = 0;
        matchedCards = 0;
        flippedCards = [];
        movesDisplay.textContent = `Moves: 0`;
        timeDisplay.textContent = `Time: 0s`;
        resultDiv.classList.add("hide");
        ratingDiv.classList.add("hide");
        startButton.classList.add("hide");
        stopButton.classList.remove("hide");
        resumeButton.style.display = 'none';
        exitButton.style.display = 'none';

        createCards();
        startTimer();
        isGameRunning = true;
        isGamePaused = false;
    };

    const stopGame = () => {
        clearInterval(timerInterval);
        isGameRunning = false;
        stopButton.classList.add("hide");
        resumeButton.style.display = 'inline';
        exitButton.style.display = 'inline';
    };

    const resumeGame = () => {
        startTimer();
        resumeButton.style.display = 'none';
        exitButton.style.display = 'none';
        stopButton.classList.remove("hide");
        isGamePaused = false;
    };

    const exitGame = () => {
        if (confirm("Are you sure you want to quit the game?")) {
            location.reload(); // Reload the page to exit the game
        }
    };

    const startTimer = () => {
        if (!isGamePaused) {
            timerInterval = setInterval(() => {
                seconds++;
                timeDisplay.textContent = `Time: ${seconds}s`;
            }, 1000);
        }
    };

    startButton.addEventListener("click", startGame);
    stopButton.addEventListener("click", stopGame);
    resumeButton.addEventListener("click", resumeGame);
    exitButton.addEventListener("click", exitGame);

    restartButton.addEventListener("click", () => location.reload());
});
