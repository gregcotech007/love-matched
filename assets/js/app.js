/**
 * @constructs LoveMatched
 * @param timeTotal, cards
 */
class LoveMatched {
	constructor(timeTotal, cards) {
		this.cardsArray = cards;
		this.timeTotal = timeTotal;
		this.timeRem_ = timeTotal;
		this.timer = document.getElementById('timeRem');
		this.ticker = document.getElementById('flipCount');
	}

/** @function
 * @name gameStart
 * @this gameStart#checkCard
 * @this gameStart#clicksTotal
 * @this gameStart#timeRem
 * @this gameStart#timeTotal
 * @this gameStart#cardsMatched
 * @this gameStart#cardsShuffle
 * @this gameStart#countdownTimer
 * @this gameStart#startCountdownTimer
 * @this gameStart#hideCards
 */
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

/** @function
 * @name hideCards
 * @name cardFlip
 */
	hideCards() {
		this.cardsArray.forEach(card => {
			card.classList.remove('visible');
			card.classList.remove('matched');
		});
	}

	cardFlip(card) {
		if (this.yesCardFlip(card)) {
			this.clicksTotal++;
			this.ticker.innerText = this.clicksTotal;
			card.classList.add('visible');
			if (this.checkCard)
				this.checkCardMatched(card);
			else
				this.checkCard = card;
		}
	}

/** @function
 * @name checkCardMatched
 */
	checkCardMatched(card) {
		if (this.checkCardType(card) === this.checkCardType(this.checkCard))
			this.cardMatched(card, this.checkCard);
		else
			this.cardMismatched(card, this.checkCard);
		this.checkCard = null;
	}

/** @function
 * @name cardMatched
 */
	cardMatched(card1, card2) {
		this.cardsMatched.push(card1);
		this.cardsMatched.push(card2);
		card1.classList.add('matched');
		card2.classList.add('matched');
		if (this.cardsMatched.length === this.cardsArray.length)
			this.winner();
	}

/** @function
 * @name cardMismatched
 */
	cardMismatched(card1, card2) {
		this.busy = true;
		setTimeout(() => {
			card1.classList.remove('visible');
			card2.classList.remove('visible');
			this.busy = false;
		}, 1000);
	}
	
/** @function
 * @name checkCardType
 * @name startCountdownTimer
 * @returns {string}
 */
	checkCardType(card) {
		return document.getElementsByClassName(card.children[1].classList[2]);
	}

/** @function
 * @name checkCardType
 * @name startCountdownTimer
 * @returns {number}
 */
	startCountdownTimer() {
		return setInterval(() => {
			this.timeRem--;
			this.timer.innerText = this.timeRem;
			if (this.timeRem === 0)
				this.gameOver();
		}, 1000);
	}

/** @function
 * @name gameOver
 */
	gameOver() {
		clearInterval(this.countdownTimer);
		document.getElementById('text-GameOver').classList.add('visible');
	}

/** @function
 * @name winner
 */
	winner() {
		clearInterval(this.countdownTimer);
		document.getElementById('text-winner').classList.add('visible');
	}

/** @function
 * @name cardsShuffle
 * @author Fisher Yates
 */
	cardsShuffle() {
		for (let i = this.cardsArray.length - 1; i > 0; i--) {
			let cardRandom = Math.floor(Math.random() * (i + 1));
			this.cardsArray[cardRandom].style.order = i;
			this.cardsArray[i].style.order = cardRandom;
		}
	}

/** @function
 * @name yesCardFlip
 */
	yesCardFlip(card) {
		return !this.busy && !this.cardsMatched.includes(card) && card != this.checkCard;
	}
}

/** @function
 * @name ready
 */
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
		});
	});
}

/** @type {DOMContentLoaded} */
document.addEventListener('DOMContentLoaded', ready());
