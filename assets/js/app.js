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

        setTimeout(() => {
            this.cardsShuffle();
            this.countdownTimer = this.startCountdownTimer();
            this.busy = false;
        }, 500);
        this.hideCards();
        this.timer.innerText = this.timeRem;
        this.ticker.innerText = this.clicksTotal;
    }

    hideCards() {
        this.cardsArray.forEach(card => {
            card.classList.remove('visible');
            card.classList.remove('matched');
        })
    }

    cardFlip(card) {
        if (this.yesCardFlip(card)) {
            this.clicksTotal++;
            this.ticker.innerText = this.clicksTotal;
            card.classList.add('visible');

            //if statement
        }
    }

    startCountdownTimer() {
        return setInterval(() => {
            this.timeRem--;
            this.timer.innerText = this.timeRem;
            if (this.timeRem === 0)
                this.gameOver();
        }, 1000);
    }

    gameOver() {
        clearInterval(this.countdownTimer);
        document.getElementById('text-GameOver').classList.add('visible');
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
    let game = new LoveMatched(5, cards);

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