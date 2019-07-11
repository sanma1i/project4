/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * app.js */
let game;
//Event listener for the button to start new game
$("#btn__reset").on('click', function () {
    game = new Game();
    game.startGame();
});

//Event listener for onscreen keybord buttons
$('#qwerty .key').on('click', function (event) {
 game.handleInteraction(event) 
});

    if (Event.className === 'key') {
     game.handleInteraction(e)
    };




