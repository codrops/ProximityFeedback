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

const distanceThreshold = {min: 0, max: 100};

/**************** Heart Icon ****************/
const iconHeart = document.querySelector('.icon--heart');
const iconHeartButton = iconHeart.parentNode;
const heartbeatInterval = {from: 1, to: 40};
const grayscaleInterval = {from: 1, to: 0};

const tweenHeart = TweenMax.to(iconHeart, 5, {
    yoyoEase: Power2.easeOut,
    repeat: -1,
    yoyo: true,
    scale: 1.3,
    paused: true
});

let stateHeart = 'paused';
new Nearby(iconHeartButton, {
    onProgress: (distance) => {
        const time = lineEq(heartbeatInterval.from, heartbeatInterval.to, distanceThreshold.max, distanceThreshold.min, distance);
        tweenHeart.timeScale(Math.min(Math.max(time,heartbeatInterval.from),heartbeatInterval.to));
        if ( distance < distanceThreshold.max && distance >= distanceThreshold.min && stateHeart !== 'running' ) {
            tweenHeart.play();
            stateHeart = 'running';
        }
        else if ( (distance > distanceThreshold.max || distance < distanceThreshold.min) && stateHeart !== 'paused' ) {
            tweenHeart.pause();
            stateHeart = 'paused';
            TweenMax.to(iconHeart, .2, {
                ease: Power2.easeOut,
                scale: 1,
                onComplete: () => tweenHeart.time(0)
            });
        }

        const bw = lineEq(grayscaleInterval.from, grayscaleInterval.to, distanceThreshold.max, distanceThreshold.min, distance);
        TweenMax.to(iconHeart, 1, {
            ease: Power2.easeOut,
            filter: `grayscale(${Math.min(bw,grayscaleInterval.from)})`
        });
    }
});

/**************** Scroll Icon ****************/
const iconWrapperScroll = document.querySelector('.scroll');
const iconScrollButton = iconWrapperScroll.parentNode;
const scrollWheel = iconWrapperScroll.querySelector('.scroll__wheel');
const scrollInterval = {from: 1, to: 15};

const tweenScroll = TweenMax.to(scrollWheel, 5, {
    repeat: -1,
    yoyo: false,
    y: 32,
    scaleY: 0,
    paused: true
});

let stateScroll = 'paused';
new Nearby(iconScrollButton, {
    onProgress: (distance) => {
        const time = lineEq(scrollInterval.from, scrollInterval.to, distanceThreshold.max, distanceThreshold.min, distance);
        tweenScroll.timeScale(Math.min(Math.max(time,scrollInterval.from),scrollInterval.to));
        
        if ( distance < distanceThreshold.max && distance >= distanceThreshold.min && stateScroll !== 'running' ) {
            tweenScroll.play();
            stateScroll = 'running';
        }
        else if ( (distance > distanceThreshold.max || distance < distanceThreshold.min) && stateScroll !== 'paused' ) {
            tweenScroll.pause();
            stateScroll = 'paused';
            tweenScroll.time(0);
        }
    }
});

/**************** Link1 ("nation") ****************/
const link1 = document.getElementById('link1');
const tooltip1 = link1.querySelector('.tooltip__line');
const linkLineInterval = {from: 0, to: 1};
new Nearby(link1, {
    onProgress: (distance) => {
        const scale = lineEq(linkLineInterval.from, linkLineInterval.to, distanceThreshold.max, distanceThreshold.min, distance);
        TweenMax.to(tooltip1, 0.5, {
            ease: 'Expo.easeOut',
            scaleX: `${Math.max(Math.min(scale,linkLineInterval.to),linkLineInterval.from)}`
        });
    }
});

/**************** Link2 ("wilderness") ****************/
const link2 = document.getElementById('link2');
const tooltipWave = link2.querySelector('.tooltip__wave > span');
const waveInterval = {from: 1, to: 15};

const tweenWave = TweenMax.to(tooltipWave, 15, {
    ease: 'Linear.easeNone',
    repeat: -1,
    yoyo: false,
    x: '50%',
    paused: true
});

let stateWave= 'paused';
new Nearby(link2, {
    onProgress: (distance) => {
        const time = lineEq(waveInterval.from, waveInterval.to, distanceThreshold.max, distanceThreshold.min, distance);
        tweenWave.timeScale(Math.min(Math.max(time,waveInterval.from),waveInterval.to));
        
        if ( distance < distanceThreshold.max && distance >= distanceThreshold.min && stateWave !== 'running' ) {
            tweenWave.play();
            stateWave = 'running';
        }
        else if ( (distance > distanceThreshold.max || distance < distanceThreshold.min) && stateWave !== 'paused' ) {
            tweenWave.pause();
            stateWave = 'paused';
        }
    }
});

/**************** Button ****************/
const bttn = document.querySelector('.iconbutton--border');
const bttnBorder = bttn.querySelector('.iconbutton__border');
const borderInterval = {from: 0.1, to: 1};

const bttnGraphic = bttn.querySelector('.iconbutton__graphic');
const bttnText = bttn.querySelector('.iconbutton__text');
const graphicInterval = {from: 60, to: 0};
const textInterval = {from: 0, to: -20};

new Nearby(bttn, {
    onProgress: (distance) => {
        const border = lineEq(borderInterval.from, borderInterval.to, distanceThreshold.max, distanceThreshold.min, distance);
        TweenMax.to(bttnBorder, 0.5, {
            ease: 'Expo.easeOut',
            opacity: `${Math.max(Math.min(border,borderInterval.to),borderInterval.from)}`
        });

        const tx = lineEq(graphicInterval.from, graphicInterval.to, distanceThreshold.max, distanceThreshold.min, distance);
        TweenMax.to(bttnGraphic, 0.5, {
            ease: 'Expo.easeOut',
            x: `${Math.min(tx,graphicInterval.from)}`
        });

        const txText = lineEq(textInterval.from, textInterval.to, distanceThreshold.max, distanceThreshold.min, distance);
        const bw = lineEq(grayscaleInterval.from, grayscaleInterval.to, distanceThreshold.max, distanceThreshold.min, distance);
        TweenMax.to(bttnText, 0.5, {
            ease: 'Expo.easeOut',
            x: `${Math.min(txText,graphicInterval.to)}`,
            filter: `grayscale(${Math.min(bw,grayscaleInterval.from)})`
        });
    }
});