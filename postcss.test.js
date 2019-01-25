'use strict';
 
var fs = require('fs');
var postcss = require('postcss');
var pxToViewport = require('postcss-px-to-viewport');
var css = fs.readFileSync('test.css', 'utf8');
var options = {
	viewportWidth: 750,
	viewportHeight: 1334,
	unitPrecision: 5,
	viewportUnit: 'vw',
	selectorBlackList: [/^-ignore$/],
	minPixelValue: 1,
	mediaQuery: false,
    keepComment: 'yes',
};
var processedCss = postcss(pxToViewport(options)).process(css).css;
 
fs.writeFile('test-viewport.css', processedCss, function (err) {
  if (err) {
    throw err;
  }
  console.log('File with viewport units written.');
});