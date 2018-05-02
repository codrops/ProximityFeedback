/**
 * demo2.js
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

const validateEmail = (email) => {
    var re = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    return re.test(String(email).toLowerCase());
}

const form = document.querySelector('.form');
const submitBttn = form.querySelector('.form__button');
const requiredElems = Array.from(form.querySelectorAll('input[required]'));

// whatever we do, start at [distanceThreshold.max]px from the element and end at [distanceThreshold.min]px from the element.
const distanceThreshold = {min: 0, max: 75};
const opacityInterval = {from: 0, to: 1};

new Nearby(submitBttn, {
    onProgress: (distance) => {
        const o = lineEq(opacityInterval.from, opacityInterval.to, distanceThreshold.max, distanceThreshold.min, distance);

        requiredElems.forEach((el) => {
            if ( !el.value || el.type === 'email' && !validateEmail(el.value) ) {
                inputErrorEl = el.nextElementSibling;
                TweenMax.to(inputErrorEl, .3, {
                    opacity: Math.max(o,opacityInterval.from)
                });
            }
        });
    }
});