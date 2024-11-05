<template>
    <div class="game">
        <div class="card">
            <div v-for="(each, index) in cardData" :key="index" class="card-box" @click="rotate(index)">
                <div class="card-view front" :id="'front'+index">
                    <img :src="each.frontSrc" alt="image-front">
                </div>
                <div class="card-view back" :id="'back'+index">
                    <img :src="each.backSrc" alt="image-back">
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            // Data properties
            cardData: [
                { id: '1', frontSrc: '/images/que_icon.svg', backSrc: '/images/img-1.png' },
                { id: '2', frontSrc: '/images/que_icon.svg', backSrc: '/images/img-2.png' },
                { id: '3', frontSrc: '/images/que_icon.svg', backSrc: '/images/img-3.png' },
                { id: '4', frontSrc: '/images/que_icon.svg', backSrc: '/images/img-4.png' },
                { id: '5', frontSrc: '/images/que_icon.svg', backSrc: '/images/img-5.png' },
                { id: '6', frontSrc: '/images/que_icon.svg', backSrc: '/images/img-6.png' },
                { id: '7', frontSrc: '/images/que_icon.svg', backSrc: '/images/img-7.png' },
                { id: '8', frontSrc: '/images/que_icon.svg', backSrc: '/images/img-8.png' },
                { id: '9', frontSrc: '/images/que_icon.svg', backSrc: '/images/img-1.png' },
                { id: '10', frontSrc: '/images/que_icon.svg', backSrc: '/images/img-2.png' },
                { id: '11', frontSrc: '/images/que_icon.svg', backSrc: '/images/img-3.png' },
                { id: '12', frontSrc: '/images/que_icon.svg', backSrc: '/images/img-4.png' },
                { id: '13', frontSrc: '/images/que_icon.svg', backSrc: '/images/img-5.png' },
                { id: '14', frontSrc: '/images/que_icon.svg', backSrc: '/images/img-6.png' },
                { id: '15', frontSrc: '/images/que_icon.svg', backSrc: '/images/img-7.png' },
                { id: '16', frontSrc: '/images/que_icon.svg', backSrc: '/images/img-8.png' },
            ],
            firstImage: null,
            secondImage: null,
            lockBoard: false,
            matchedPairs: 0,
        }
    },
    mounted() {
        this.shuffleCard();
    },
    methods: {

        // Function of shuffle card
        shuffleCard() {
            for (let i = 0; i < this.cardData.length; i++) {
                const j = Math.floor(Math.random() * (i + 1));
                [this.cardData[i], this.cardData[j]] = [this.cardData[j], this.cardData[i]];
            }
        },

        // Function of rotate
        rotate(index) {
            if (this.lockBoard || index === this.firstImage) return;

            let frontCard = document.querySelector(`#front${index}`);
            let backCard = document.querySelector(`#back${index}`);

            frontCard.style.transform = 'rotateY(-180deg)';
            backCard.style.transform = 'rotateY(0)';

            if (this.firstImage === null) {
                this.firstImage = index;
            } else {
                this.secondImage = index;
                this.matchCard();
            }
        },

        // Function of match card
        matchCard() {
            const cardMatchOne = this.cardData[this.firstImage].backSrc;
            const cardMatchTwo = this.cardData[this.secondImage].backSrc;

            if (cardMatchOne === cardMatchTwo) {
                this.matchedPairs++;
                this.resetBoard();

                // Check if all pairs are matched
                if (this.matchedPairs === this.cardData.length / 2) {
                    setTimeout(() => {
                        this.resetGame();
                    }, 500);
                }
            } else {
                this.shakeCardBox();
                setTimeout(() => {
                    this.flipCard();
                }, 500);
            }
        },

        // Function of reset rotate
        resetRotate() {
            let firstCardFront = document.querySelector(`#front${this.firstImage}`);
            let firstCardBack = document.querySelector(`#back${this.firstImage}`);
            let secondCardFront = document.querySelector(`#front${this.secondImage}`);
            let secondCardBack = document.querySelector(`#back${this.secondImage}`);

            firstCardFront.style.transform = 'rotateY(0)';
            firstCardBack.style.transform = 'rotateY(-180deg)';
            secondCardFront.style.transform = 'rotateY(0)';
            secondCardBack.style.transform = 'rotateY(-180deg)';
        },
        shakeCardBox() {
            let firstCardFront = document.querySelector(`#front${this.firstImage}`);
            let firstCardBack = document.querySelector(`#back${this.firstImage}`);
            let secondCardFront = document.querySelector(`#front${this.secondImage}`);
            let secondCardBack = document.querySelector(`#back${this.secondImage}`);

            firstCardFront.classList.add('card-shake');
            firstCardBack.classList.add('card-shake');
            secondCardFront.classList.add('card-shake');
            secondCardBack.classList.add('card-shake');
        },

        // Function of flip card
        flipCard() {
            this.resetRotate();
            this.resetBoard();
        },

        // Function of reset board
        resetBoard() {
            let firstCardFront = document.querySelector(`#front${this.firstImage}`);
            let firstCardBack = document.querySelector(`#back${this.firstImage}`);
            let secondCardFront = document.querySelector(`#front${this.secondImage}`);
            let secondCardBack = document.querySelector(`#back${this.secondImage}`);

            firstCardFront.classList.remove('card-shake');
            firstCardBack.classList.remove('card-shake');
            secondCardFront.classList.remove('card-shake');
            secondCardBack.classList.remove('card-shake');

            this.firstImage = null;
            this.secondImage = null;
            this.lockBoard = false;
        },

        // Function of reset game
        resetGame() {
            this.cardData.forEach((card, index) => {
                let frontCard = document.querySelector(`#front${index}`);
                let backCard = document.querySelector(`#back${index}`);
                frontCard.style.transform = 'rotateY(0)';
                backCard.style.transform = 'rotateY(-180deg)';
            });
            this.firstImage = null;
            this.secondImage = null;
            this.lockBoard = false;
            this.matchedPairs = 0;
            this.shuffleCard();
        },

    }
}
</script>
