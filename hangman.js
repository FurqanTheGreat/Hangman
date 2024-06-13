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
 var guessesLeft = 5;
 // The game loop
 while (remainingLetters > 0 && guessesLeft > 0) {
 // Show the player their progress
 alert(answerArray.join(" ") + "\nGuesses left: " + guessesLeft);
 // Get a guess from the player
 var guess = prompt("Guess a letter, or click Cancel to stop playing. Hint: It's an animal.");
 if (guess === null) {
 // Exit the game loop
 break;
 } else if (guess.length !== 1) {
 alert("Please enter a single letter.");
 } else {
 // Update the game state with the guess
 guess = guess.toLowerCase();
 var correctGuess = false;
 for (var j = 0; j < word.length; j++) {
 if (word[j] === guess) {
 answerArray[j] = guess;
 remainingLetters--;
 var correctGuess = true;
 } 
 }
 }
 // If the guess was incorrect, decrement guesses left
 if (!correctGuess) {
    guessesLeft--;
}
 // The end of the game loop
 }
 // Show the answer and congratulate or commiserate with the player
if (guess === null) {
    alert("The answer was " + word)
} else if (remainingLetters === 0) {
    alert("Good job! The answer was " + word);
} else if (guessesLeft === 0) {
    alert("Sorry, you've run out of guesses. The answer was " + word);
}
 