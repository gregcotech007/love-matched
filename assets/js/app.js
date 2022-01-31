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