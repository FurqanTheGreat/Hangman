// hangman.js

// Create an array of words
var words = [
    "elephant",
    "giraffe",
    "kangaroo",
    "cheetah",
    "penguin"
];

// Pick a random word
var word = words[Math.floor(Math.random() * words.length)];

// Set up the answer array
var answerArray = [];
for (var i = 0; i < word.length; i++) {
    answerArray[i] = "_";
}

var remainingLetters = word.length;
var guessesLeft = 6; // Number of incorrect guesses before losing

// Canvas setup
var canvas = document.getElementById('hangmanCanvas');
var context = canvas.getContext('2d');

function drawHangman(guesses) {
    context.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas

    // Base
    if (guesses <= 5) {
        context.beginPath();
        context.moveTo(10, 390);
        context.lineTo(390, 390);
        context.stroke();
    }

    // Pole
    if (guesses <= 4) {
        context.beginPath();
        context.moveTo(100, 390);
        context.lineTo(100, 50);
        context.stroke();
    }

    // Beam
    if (guesses <= 3) {
        context.beginPath();
        context.moveTo(100, 50);
        context.lineTo(300, 50);
        context.stroke();
    }

    // Rope
    if (guesses <= 2) {
        context.beginPath();
        context.moveTo(300, 50);
        context.lineTo(300, 100);
        context.stroke();
    }

    // Head
    if (guesses <= 1) {
        context.beginPath();
        context.arc(300, 140, 40, 0, Math.PI * 2, true);
        context.stroke();
    }

    // Body
    if (guesses <= 0) {
        context.beginPath();
        context.moveTo(300, 180);
        context.lineTo(300, 280);
        context.stroke();

        // Arms
        context.beginPath();
        context.moveTo(300, 210);
        context.lineTo(250, 240);
        context.moveTo(300, 210);
        context.lineTo(350, 240);
        context.stroke();

        // Legs
        context.beginPath();
        context.moveTo(300, 280);
        context.lineTo(250, 320);
        context.moveTo(300, 280);
        context.lineTo(350, 320);
        context.stroke();
    }
}

function showPrompt() {
    return new Promise((resolve, reject) => {
        const overlay = document.getElementById('customPromptOverlay');
        const input = document.getElementById('promptInput');
        const okButton = document.getElementById('promptOkButton');
        const cancelButton = document.getElementById('promptCancelButton');

        overlay.style.display = 'flex';
        input.value = '';

        okButton.onclick = function() {
            const value = input.value.trim();
            if (value.length === 1) {
                overlay.style.display = 'none';
                resolve(value);
            } else {
                alert('Please enter a single letter.');
            }
        };

        cancelButton.onclick = function() {
            overlay.style.display = 'none';
            reject();
        };
    });
}

async function gameLoop() {
    drawHangman(guessesLeft);
    
    while (remainingLetters > 0 && guessesLeft > 0) {
        alert(answerArray.join(" ") + "\nGuesses left: " + guessesLeft);

        try {
            var guess = await showPrompt();
            guess = guess.toLowerCase();

            if (guess.length !== 1) {
                alert("Please enter a single letter.");
            } else {
                var correctGuess = false;
                for (var j = 0; j < word.length; j++) {
                    if (word[j] === guess) {
                        answerArray[j] = guess;
                        remainingLetters--;
                        correctGuess = true;
                    }
                }

                if (!correctGuess) {
                    guessesLeft--;
                    drawHangman(guessesLeft);
                }
            }
        } catch (error) {
            break;
        }
    }

    if (remainingLetters === 0) {
        alert("Good job! The answer was " + word);
    } else if (guessesLeft === 0) {
        alert("Sorry, you've run out of guesses. The answer was " + word);
    } else {
        alert("The answer was " + word);
    }
}

gameLoop();
