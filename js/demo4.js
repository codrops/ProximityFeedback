/**
 * demo4.js
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

const menuEl = document.querySelector('.menu__inner');
const menuCtrl = document.querySelector('.menu__button-wrap');
const distanceThreshold = {min: 0, max: 100};
const translationInterval = {from: 0, to: -100};

const opacityInterval = {from: 0, to: 1};

new Nearby(menuCtrl, {
    onProgress: (distance) => {
        const tx = lineEq(translationInterval.from, translationInterval.to, distanceThreshold.max, distanceThreshold.min, distance);
        TweenMax.to(menuEl, .8, {
            ease: 'Expo.easeOut',
            x: `${Math.max(Math.min(translationInterval.from,tx),translationInterval.to)}%`
        });

        const o = lineEq(opacityInterval.from, opacityInterval.to, distanceThreshold.max, distanceThreshold.min, distance);
        TweenMax.to(menuEl, .5, {
            ease: 'Expo.easeOut',
            opacity: Math.max(o,opacityInterval.from)
        });
    }
});