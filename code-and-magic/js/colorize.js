'use strict';

(function () {
	var COAT_COLORS = [
		'rgb(101, 137, 164)',
		'rgb(241, 43, 107)',
		'rgb(146, 100, 161)',
		'rgb(56, 159, 117)',
		'rgb(215, 210, 55)',
		'rgb(0, 0, 0)'
	];
	var EYES_COLORS = [
		'black',
		'red',
		'blue',
		'yellow',
		'green'
	];
	var FIREBALL_COLORS = [
		'#ee4830',
		'#30a8ee',
		'#5ce6c0',
		'#e848d5',
		'#e6e848'
	];

	var getCoatColor = function () {
		return window.random.getRandomElement(COAT_COLORS);
	};

	var getEyesColor = function () {
		return window.random.getRandomElement(EYES_COLORS);
	};

	var getFireballColor = function () {
		return window.random.getRandomElement(FIREBALL_COLORS);
	};

	var getCoatInitialColor = function () {
		return COAT_COLORS[0];
	};

	var getEyesInitialColor = function () {
		return EYES_COLORS[0];
	};

	var getFireballInitialColor = function () {
		return FIREBALL_COLORS[0];
	};

	window.colorize = {
		getCoatColor: getCoatColor,
		getEyesColor: getEyesColor,
		getFireballColor: getFireballColor,
		getCoatInitialColor: getCoatInitialColor,
		getEyesInitialColor: getEyesInitialColor,
		getFireballInitialColor: getFireballInitialColor
	};
})();
