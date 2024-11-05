<template>

    <!-- game content start -->
    <div class="game">

        <!-- card start -->
        <div class="card">

            <template v-for="(each, index) in cardData" :key="index">

                <!-- card box start -->
                <div class="card-box" @click="rotate(index)">

                    <!-- card view --- front start -->
                    <div class="card-view front" :id="'front'+index">

                        <!-- front image start -->
                        <img :src="each.frontSrc" alt="image-front">
                        <!-- front image end -->

                    </div>
                    <!-- card view --- front end -->

                    <!-- card view --- back start -->
                    <div class="card-view back" :id="'back'+index">

                        <!-- back image start -->
                        <img :src="each.backSrc" alt="image-back">
                        <!-- back image end -->

                    </div>
                    <!-- card view --- back end -->

                </div>
                <!-- card box end -->

            </template>

        </div>
        <!-- card end -->

    </div>
    <!-- game content end -->

</template>

<script>

export default {

    data() {

        return {

            // Data properties start
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
            cardOne: null,
            cardTwo: null,
            lockBoard: false,
            matchedPairs: 0,
            // Data properties end

        }

    },

    mounted() {

        this.shuffleCard();

    },

    methods: {

        // Function of shuffle card start
        shuffleCard() {
            for (let i = 0; i < this.cardData.length; i++) {
                const j = Math.floor(Math.random() * (i + 1));
                [this.cardData[i], this.cardData[j]] = [this.cardData[j], this.cardData[i]];
            }
        },
        // Function of shuffle card end

        // Function of rotate start
        rotate(index) {
            if (this.lockBoard || index === this.cardOne) return;

            let frontCard = document.querySelector(`#front${index}`);
            let backCard = document.querySelector(`#back${index}`);

            frontCard.style.transform = 'rotateY(-180deg)';
            backCard.style.transform = 'rotateY(0)';

            if (this.cardOne === null) {
                this.cardOne = index;
            } else {
                this.cardTwo = index;
                this.matchCard();
            }
        },
        // Function of rotate end

        // Function of match card start
        matchCard() {
            const cardMatchOne = this.cardData[this.cardOne].backSrc;
            const cardMatchTwo = this.cardData[this.cardTwo].backSrc;

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
        // Function of match card end

        // Function of reset rotate start
        resetRotate() {
            let firstCardFront = document.querySelector(`#front${this.cardOne}`);
            let firstCardBack = document.querySelector(`#back${this.cardOne}`);
            let secondCardFront = document.querySelector(`#front${this.cardTwo}`);
            let secondCardBack = document.querySelector(`#back${this.cardTwo}`);

            firstCardFront.style.transform = 'rotateY(0)';
            firstCardBack.style.transform = 'rotateY(-180deg)';
            secondCardFront.style.transform = 'rotateY(0)';
            secondCardBack.style.transform = 'rotateY(-180deg)';
        },
        // Function of reset rotate end

        // Function of shake card box start
        shakeCardBox() {
            let firstCardFront = document.querySelector(`#front${this.cardOne}`);
            let firstCardBack = document.querySelector(`#back${this.cardOne}`);
            let secondCardFront = document.querySelector(`#front${this.cardTwo}`);
            let secondCardBack = document.querySelector(`#back${this.cardTwo}`);

            firstCardFront.classList.add('card-shake');
            firstCardBack.classList.add('card-shake');
            secondCardFront.classList.add('card-shake');
            secondCardBack.classList.add('card-shake');
        },
        // Function of shake card box end

        // Function of flip card start
        flipCard() {
            this.resetRotate();
            this.resetBoard();
        },
        // Function of flip card end

        // Function of reset board start
        resetBoard() {
            let firstCardFront = document.querySelector(`#front${this.cardOne}`);
            let firstCardBack = document.querySelector(`#back${this.cardOne}`);
            let secondCardFront = document.querySelector(`#front${this.cardTwo}`);
            let secondCardBack = document.querySelector(`#back${this.cardTwo}`);

            firstCardFront.classList.remove('card-shake');
            firstCardBack.classList.remove('card-shake');
            secondCardFront.classList.remove('card-shake');
            secondCardBack.classList.remove('card-shake');

            this.cardOne = null;
            this.cardTwo = null;
            this.lockBoard = false;
        },
        // Function of reset board end

        // Function of reset game start
        resetGame() {
            this.cardData.forEach((card, index) => {
                let frontCard = document.querySelector(`#front${index}`);
                let backCard = document.querySelector(`#back${index}`);
                frontCard.style.transform = 'rotateY(0)';
                backCard.style.transform = 'rotateY(-180deg)';
            });
            this.cardOne = null;
            this.cardTwo = null;
            this.lockBoard = false;
            this.matchedPairs = 0;
            this.shuffleCard();
        },
        // Function of reset game end

    }

}
</script>
