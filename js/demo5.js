/**
 * demo5.js
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
const shuffleArray = arr => arr.sort(() => Math.random() - 0.5);

const formItems = Array.from(document.querySelectorAll('.form__item'));
formItems.forEach((item) => {
    const inputEl = item.querySelector('.form__input');
    if ( inputEl ) {
        const label = item.querySelector('.form__label');
        const placeholder = item.querySelector('.form__placeholder');
        charming(label);
        const labelLetters = Array.from(label.querySelectorAll('span'));

        charming(placeholder);
        const placeholderLetters = Array.from(placeholder.querySelectorAll('span'));
        const lettersTotal = placeholderLetters.length;
        const lettersPosArr = shuffleArray(Array.from(Array(lettersTotal).keys()));
        let currentVisible = lettersTotal;

        // whatever we do, start at [distanceThreshold.max]px from the element and end at [distanceThreshold.min]px from the element.
        const distanceThreshold = {min: 0, max: 50};

        new Nearby(inputEl, {
            onProgress: (distance) => {
                const point = lineEq(lettersTotal, 0, distanceThreshold.max, distanceThreshold.min, distance);
                const visible = Math.max(0,Math.min(lettersTotal,Math.floor(point)));
                if ( currentVisible != visible ) {
                    // hide placeholder and show label.
                    if ( visible < currentVisible ) {
                        for (let i = 0, len = lettersPosArr.length - visible; i < len; ++i) {
                            const letter = placeholderLetters[lettersPosArr[i]];
                            if ( letter.dataset.state != 'hidden' ) {
                                letter.dataset.state = 'hidden';
                                TweenMax.to(letter, 0.5, {
                                    //ease: 'Back.easeIn',
                                    ease: 'Expo.easeOut',
                                    y: '-200%',
                                    opacity: 0
                                });

                                TweenMax.to(labelLetters[lettersPosArr[i]], 0.5, {
                                    //ease: 'Back.easeOut',
                                    //delay: 0.4,
                                    ease: 'Expo.easeOut',
                                    y: '0%',
                                    startAt: {y: '200%'},
                                    opacity: 1
                                });
                            }
                        }
                    }
                    // hide label and show placeholder. (only if input doesn't have a value).
                    else if (inputEl.value.length === 0) {
                        for (let i = lettersTotal-1, len = lettersTotal- (lettersPosArr.length - visible); i >= lettersTotal-len; --i) {
                            const letter = placeholderLetters[lettersPosArr[i]];
                            if ( letter.dataset.state === 'hidden' ) {
                                letter.dataset.state = '';
                                TweenMax.to(letter, 0.2, {
                                    ease: 'Circ.easeOut',
                                    y: '0%',
                                    //overwrite: 'all',
                                    opacity: 1
                                });

                                TweenMax.to(labelLetters[lettersPosArr[i]], 1, {
                                    ease: 'Circ.easeOut',
                                    y: '200%',
                                    //overwrite: 'all',
                                    opacity: 0
                                });
                            }
                        }
                    }
        
                    if( visible <= 0 ) {
                        inputEl.focus();
                    }
        
                    currentVisible = visible;

                }
            }
        });

        inputEl.addEventListener('input', () => {
            if ( inputEl.value.length !== 0 ) {
                placeholder.style.opacity = 0;
            }
            else {
                placeholder.style.opacity = 1;
            }
        });
    }
});