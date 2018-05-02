/**
 * demo3.js
 * http://www.codrops.com
 *
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 * 
 * Copyright 2018, Codrops
 * http://www.codrops.com
 */

/**
 * Equation of a line.
 */
const lineEq = (y2, y1, x2, x1, currentVal) => {
    // y = mx + b 
    var m = (y2 - y1) / (x2 - x1), b = y1 - m * x1;
    return m * currentVal + b;
};
const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const shuffleArray = arr => arr.sort(() => Math.random() - 0.5);

const searchInput = document.querySelector('.search__input');
const searchFeedback = document.querySelector('.search__feedback');
charming(searchFeedback);
const searchFeedbackLetters = Array.from(searchFeedback.querySelectorAll('span'));

const lettersTotal = searchFeedbackLetters.length;
const lettersPosArr = shuffleArray(Array.from(Array(lettersTotal).keys()));
let currentVisible = lettersTotal;

// whatever we do, start at [distanceThreshold.max]px from the element and end at [distanceThreshold.min]px from the element.
const distanceThreshold = {min: 0, max: 200};
const distanceThresholdInputOpacity = {min: 0, max: 100};
const opacityInterval = {from: 0, to:1};

new Nearby(searchInput, {
    onProgress: (distance) => {
        const point = lineEq(lettersTotal, 0, distanceThreshold.max, distanceThreshold.min, distance);
        const visible = Math.max(0,Math.min(lettersTotal,Math.floor(point)));
        if ( currentVisible != visible ) { 
            if ( visible < currentVisible ) {
                for (let i = 0, len = lettersPosArr.length - visible; i < len; ++i) {
                    const letter = searchFeedbackLetters[lettersPosArr[i]];
                    if ( letter.dataset.state != 'hidden' ) {
                        letter.dataset.state = 'hidden';
                        TweenMax.to(letter, 0.5, {
                            ease: 'Expo.easeOut',
                            x: `${getRandomInt(5,20) * (Math.round(Math.random()) || -1)}%`,
                            y: `${getRandomInt(100,300) * (Math.round(Math.random()) || -1)}%`,
                            rotationZ: `${getRandomInt(10,45) * (Math.round(Math.random()) || -1)}%`,
                            opacity: 0
                        });
                    }
                }
            }
            else {
                for (let i = lettersTotal-1, len = lettersTotal- (lettersPosArr.length - visible); i >= lettersTotal-len; --i) {
                    const letter = searchFeedbackLetters[lettersPosArr[i]];
                    if ( letter.dataset.state === 'hidden' ) {
                        letter.dataset.state = '';
                        TweenMax.to(letter, 0.2, {
                            ease: 'Circ.easeOut',
                            x: '0%',
                            y: '0%',
                            rotationZ: 0,
                            opacity: 1
                        });
                    }
                }
            }

            if( visible <= 0 ) {
                searchInput.focus();
            }

            currentVisible = visible;
        }

        const o = lineEq(opacityInterval.from, opacityInterval.to, distanceThresholdInputOpacity.max, distanceThresholdInputOpacity.min, distance);
        TweenMax.to(searchInput, .5, {
            ease: 'Expo.easeOut',
            opacity: Math.max(o,opacityInterval.from)
        });
    }
});