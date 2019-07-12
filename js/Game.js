/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Game.js */
class Game {
    //Max wrong guesses.Onceuser reaches this number, game is over
    totalMissed = 5;
    constructor() {
        //To track the missed guesses by the player, initialy set to 0
        this.missed = 0;
        //Array of 5 phrases to use in the game
        this.phrase = 
        [
            new Phrase("tiger"),
            new Phrase("elephant"),
            new Phrase("monkey"),
            new Phrase("dog"),
            new Phrase("cat")
        ];
        //Phrase that is in play
        this.activePhrase = null;
    }
    /*Hides the start screen.
    Sets the activePhrase property with the chosen phrase.
    Adds that phrase to the board by calling the addPhraseToDisplay() method*/
    startGame() {
       $('#overlay').fadeOut(3000);                                                                                                                                       
       $('#qwerty .key').prop('disabled',false);
       $('#qwerty .key').removeClass('chosen');
       $('#qwerty .key').removeClass('wrong');

        this.activePhrase = this.getRandomPhrase();
        this.activePhrase.addPhraseToDisplay();
        //Reset Lives 
        let $liveHeart = $("#scoreboard li img");
        $liveHeart.attr("src", "images/liveHeart.png");
        $liveHeart.attr("alt", "Heart Icon");
        $liveHeart.removeClass('lost');
        $liveHeart.addClass('tries');
        this.missed = 0;
        }
        
    
    //Randomly picks a phrase from the phrases array and returns it
    getRandomPhrase() {
        let newPhrase = Math.floor(Math.random() * this.phrase.length);
        return(this.phrase[newPhrase]);
    }
    //Checks to see if the button clicked matches a letter in the phrase
    handleInteraction(e) {
            let $letter = $(e.target).text(); 
            $(e.target).prop('disabled', true);         //Disable the selected letter onscreen keyboard button
            if (this.activePhrase.checkLetter($letter)) {
                this.activePhrase.showMatchedLetter($letter);
                $(e.target).addClass('chosen');
               // console.log($(e.target).text());
            }
            else {
                this.removeLife();                  //If the letter doesn't match the letter, remove 'life'
               $(e.target).addClass('wrong');
            }
            if (this.checkForWin()) {
                this.gameOver();
            }
        };
    //Removes lifes when wrong letter is entered
    removeLife() {
        this.missed = this.missed + 1;
        const lostHeart = 'images/lostHeart.png';   //replaces liveHeart'png with lostHeart.png
       //const $availHeart = $('#scoreboard li:not(.lost)').last(); //Does not duplicate the last heart
        //const $availHeartImg = $availHeart.find('img');
        const $lives = $('#scoreboard li');
        let $removeLife = $lives.eq(this.missed);
        let $replaceIMG = $removeLife.children().first();
        $replaceIMG.attr('src', lostHeart);
        $replaceIMG.attr("alt", "Lost Icon");
        $replaceIMG.removeClass('tries');
        $replaceIMG.addClass('lost');
        if (this.missed >= 5)                      //If player has 5 missed guesses,the game is over
        {
            this.gameOver(false);
        }
    };
    
    //Checks if player revealed all the letters in the active phrase
    checkForWin() {
        if ($('.hide').length > 0) {         
         return false; 
        } else {
        return true;
        }
    }
        //Displays original start screen with a 'win' or 'loss' message
        gameOver() {
        const $startScreen = $('#overlay');
        $startScreen.show();
        if (this.checkForWin()) {
            $('#game-over-message').text("Congratulation! You Won!");
            $startScreen.removeClass('start');
            $startScreen.addClass('win');
        }
        else {
            $('#game-over-message').text(`Sorry, the answer was "${this.activePhrase.phrase}".`);
            $startScreen.removeClass('start');
            $startScreen.addClass('lose');
        }

    }
}