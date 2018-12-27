'use strict';

(function () {
	var wizards = [];

	var coatColor;
	var eyesColor;
	var fireballColor;

	window.setup.wizard.coatChangeHandler = function (color) {
		coatColor = color;
		window.debounce(updateWizards);
	};

	window.setup.wizard.eyesChangeHandler = function (color) {
		eyesColor = color;
		window.debounce(updateWizards);
	};

	window.setup.wizard.fireballChangeHandler = function (color) {
		fireballColor = color;
		window.debounce(updateWizards);
	};

	var getRank = function (wizard) {
		var rank = 0;

		if (wizard.colorCoat === coatColor && wizard.colorEyes === eyesColor) {
			rank += 3;
		}

		if (wizard.colorCoat === coatColor) {
			rank += 2;
		}

		if (wizard.colorEyes === eyesColor) {
			rank += 1;
		}

		if (wizard.colorFireball === fireballColor) {
			rank += 0.5;
		}

		return rank;
	};

	var compareNames = function (left, right) {
		if (left > right) {
			return 1;
		} else if (left < right) {
			return -1;
		} else {
			return 0;
		}
	};

	var updateWizards = function () {
		wizards.sort(function (left, right) {
			var rankDiff = getRank(right) - getRank(left);
			if (rankDiff === 0) {
				rankDiff = compareNames(left.name, right.name);
			}

			return rankDiff;
		});

		window.render.renderSimilarWizards(wizards);
	};

	var loadSuccessHandler = function (data) {
		wizards = data;
		window.setup.setWizardInitialValues();
		updateWizards();
	};

	var loadErrorHandler = function (errorMessage) {
		window.util.renderErrorMessage(errorMessage);
	};

	window.backend.load(loadSuccessHandler, loadErrorHandler);
})();
