'use strict';

(function () {
	var WIZARD_NAMES = [
		'Иван',
		'Хуан Себастьян',
		'Мария',
		'Кристоф',
		'Виктор',
		'Юлия',
		'Люпита',
		'Вашингтон'
	];
	var WIZARD_SURNAMES = [
		'да Марья',
		'Верон',
		'Мирабелла',
		'Вальц',
		'Онопко',
		'Топольницкая',
		'Нионго',
		'Ирвинг'
	];

	var getRandomElement = function (array) {
		return array[Math.floor(Math.random() * array.length)];
	};

	var getSomeRandomElemets = function (array, amountOfElements) {
		var newArray = [];
		var arrayLength = array.length;
		var _arrayIndex;

		for (var i = 0; i < arrayLength; i += 1) {
			if (newArray.length < amountOfElements) {
				_arrayIndex = (Math.floor(Math.random() * array.length));
				newArray.push(array.splice(_arrayIndex, 1)[0]);
			} else {
				break;
			}
		}

		return newArray;
	};

	var getRandomName = function () {
		var name = getRandomElement(WIZARD_NAMES);
		var surname = getRandomElement(WIZARD_SURNAMES);

		if (Math.round(Math.random())) {
			return surname + ' ' + name;
		}

		return name + ' ' + surname;
	};

	window.random = {
		getRandomElement: getRandomElement,
		getSomeRandomElemets: getSomeRandomElemets,
		getRandomName: getRandomName
	};
})();
