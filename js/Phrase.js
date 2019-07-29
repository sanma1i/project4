/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Phrase.js */

class Phrase {
    $phrase = $('#phrase ul');
    constructor(phrase) { 
    //Converts the phrase to lowercase    
        this.phrase = phrase.toLowerCase();
    }
    //Adds letter placeholder to display when the game starts
    addPhraseToDisplay() {
        this.$phrase.empty();
        for (let i = 0; i < this.phrase.length; i++) {
            let letter = this.phrase[i];
            let hiddenLetter = $(`<li class = "hide letter ${letter}" > ${letter}</li>`);
           this.$phrase.append(hiddenLetter);
        }
    };
    //Checks if letter selected matches a letter in phrase
    checkLetter(guessedLetter) {
        for (let i = 0; i < this.phrase.length; i++) {
            let phraseLetter = this.phrase[i];
            if (guessedLetter === phraseLetter) {
                return (true);
            }
        }
        return (false);
    };
    //Reveals the letter on the board that matches the player's selection
    showMatchedLetter(guessedLetter) {
        let $letters = $('#phrase ul .' + guessedLetter);
        $letters.removeClass('hide');
        $letters.addClass('show');
    }
}