/**
 * demo1.js
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

const gallery = document.querySelector('.gallery');
const prevEl = gallery.querySelector('.gallery__item--prev');
const nextEl = gallery.querySelector('.gallery__item--next');
const currentEl = gallery.querySelector('.gallery__item--current');
// whatever we do, start at [distanceThreshold.max]px from the element and end at [distanceThreshold.min]px from the element.
const distanceThreshold = {min: 0, max: 200};
// translate goes from -80% to -60% (prevEl) and from 80% to 60% (nextEl)
const translateIntervalPrev = {from: -80, to: -65};
const translateIntervalNext = {from: 80, to: 65};
const translateIntervalCurrent = {from: 0, to: 5};
const opacityInterval = {from: 0.2, to: 1};

let onprev;
let onnext;

new Nearby(prevEl, {
    onProgress: (distance) => {
        onprev = distance <= distanceThreshold.max && distance >= distanceThreshold.min;

        if ( !onnext ) {
            const tx = lineEq(translateIntervalPrev.from, translateIntervalPrev.to, distanceThreshold.max, distanceThreshold.min, distance);
            const o = lineEq(opacityInterval.from, opacityInterval.to, distanceThreshold.max, distanceThreshold.min, distance);
            
            TweenMax.to(prevEl, 1, {
                x: Math.min(Math.max(translateIntervalPrev.from,tx),translateIntervalPrev.to)+'%',
                ease: Power4.easeOut
            });
            TweenMax.to(prevEl, .5, {
                opacity: Math.max(o,opacityInterval.from),
                ease: Expo.easeOut
            });

            // also animate current and nextEl..
            const txCurr = lineEq(translateIntervalCurrent.from, translateIntervalCurrent.to, distanceThreshold.max, distanceThreshold.min, distance);
            const oCurr = lineEq(opacityInterval.to, opacityInterval.from, distanceThreshold.max, distanceThreshold.min, distance);
            TweenMax.to(currentEl, 1, {
                x: Math.min(Math.max(translateIntervalCurrent.from,txCurr),translateIntervalCurrent.to)+'%',
                ease: Power4.easeOut
            });
            TweenMax.to(currentEl, .5, {
                opacity: Math.max(oCurr,opacityInterval.from),
                ease: Expo.easeOut
            });
            
            const txNext = lineEq(translateIntervalNext.from, translateIntervalNext.from+10, distanceThreshold.max, distanceThreshold.min, distance);
            TweenMax.to(nextEl, 1, {
                x: Math.min(Math.max(translateIntervalNext.from,txNext),translateIntervalNext.from+10)+'%',
                ease: Power4.easeOut
            });
        }
    }
});

new Nearby(nextEl, {
    onProgress: (distance) => {
        onnext = distance <= distanceThreshold.max && distance >= distanceThreshold.min;

        if ( !onprev ) {
            const tx = lineEq(translateIntervalNext.from, translateIntervalNext.to, distanceThreshold.max, distanceThreshold.min, distance);
            const o = lineEq(opacityInterval.from, opacityInterval.to, distanceThreshold.max, distanceThreshold.min, distance);     
            TweenMax.to(nextEl, 1, {
                x: Math.min(Math.max(translateIntervalNext.to,tx),translateIntervalNext.from)+'%',
                ease: Power4.easeOut
            });
            TweenMax.to(nextEl, .5, {
                opacity: Math.max(o,opacityInterval.from),
                ease: Expo.easeOut
            });

            // also animate current and prevEl..
            const txCurr = lineEq(translateIntervalCurrent.from, -1*translateIntervalCurrent.to, distanceThreshold.max, distanceThreshold.min, distance);
            const oCurr = lineEq(opacityInterval.to, opacityInterval.from, distanceThreshold.max, distanceThreshold.min, distance);
            TweenMax.to(currentEl, 1, {
                x: Math.max(Math.min(translateIntervalCurrent.from,txCurr),-1*translateIntervalCurrent.to)+'%',
                ease: Power4.easeOut
            });
            TweenMax.to(currentEl, .5, {
                opacity: Math.max(oCurr,opacityInterval.from),
                ease: Expo.easeOut
            });
        
            const txPrev = lineEq(translateIntervalPrev.from, translateIntervalPrev.from-10, distanceThreshold.max, distanceThreshold.min, distance);
            TweenMax.to(prevEl, 1, {
                x: Math.max(Math.min(translateIntervalPrev.from,txPrev),translateIntervalPrev.from-10)+'%',
                ease: Power4.easeOut
            });
        }
    }
});

const expandEl = gallery.querySelector('.gallery__item-enter');
const imgEl = currentEl.querySelector('.gallery__item-img');
const distanceScaleThreshold = {min: 0, max: 50};
const scaleIntervalImg = {from: 1, to: 1.05};
const scaleIntervalExpand = {from: 1, to: 3};

new Nearby(expandEl, {
    onProgress: (distance) => {
        const sImg = lineEq(scaleIntervalImg.from, scaleIntervalImg.to, distanceScaleThreshold.max, distanceScaleThreshold.min, distance);
        TweenMax.to(imgEl, 1.2, {
            scale: Math.min(Math.max(scaleIntervalImg.from,sImg),scaleIntervalImg.to),
            ease: Power4.easeOut
        });

        const sExpand = lineEq(scaleIntervalExpand.from, scaleIntervalExpand.to, distanceScaleThreshold.max, distanceScaleThreshold.min, distance);
        TweenMax.to(expandEl, 1.2, {
            scale: Math.min(Math.max(scaleIntervalExpand.from,sExpand),scaleIntervalExpand.to),
            ease: Power4.easeOut
        });
    }
});

// Preload all the images in the page..
imagesLoaded(document.querySelectorAll('.gallery__item'), {background: true}, () => document.body.classList.remove('loading'));