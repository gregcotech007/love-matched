class LoveMatched {
    constructor(timeTotal, cards) {
        this.cardsArray = cards;
        this.timeTotal = timeTotal;
        this.timeRem = timeTotal;
        this.timer = document.getElementById('timeRem');
        this.ticker = document.getElementById('flipCount');
    }
    gameStart() {
        this.checkCard = null;
        this.clicksTotal = 0;
        this.timeRem = this.timeTotal;
        this.cardsMatched = [];
        this.busy = true;

        
    }

    cardFlip(card) {
        if (this.yesCardFlip(card)) {
            this.clicksTotal++;
            this.ticker.innerText = this.clicksTotal;
            card.classList.add('visible');

            //if statement
        }
    }
    // Fisher Yates Shuffle Algorithm
    cardsShuffle() {
        for (let i = this.cardsArray.length -1; i > 0; i--) {
            let cardRandom = Math.floor(Math.random() * (i+1));
            this.cardsArray[cardRandom].style.order = i;
            this.cardsArray[i].style.order = cardRandom;
        }
    }

    yesCardFlip(card) {
        return true;
        //return !this.busy && !this.matchedCards.includes(card) && card != this.cardToCheck;
    }
}

function ready() {
    let overlays = Array.from(document.getElementsByClassName('text-overlay'));
    let cards = Array.from(document.getElementsByClassName('card'));
    let game = new LoveMatched(90, cards);

    overlays.forEach(overlay => {
        overlay.addEventListener('click', () => {
            overlay.classList.remove('visible');
            game.gameStart();
        });
    });
    cards.forEach(card => {
        card.addEventListener('click', () => {
            game.cardFlip(card);
        })
    })
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', ready());
}
else {
    ready();
}