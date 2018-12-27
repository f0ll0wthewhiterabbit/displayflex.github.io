'use strict';

(function () {
	var WIZARD_COUNT = 4;

	var similarListElement = document.querySelector('.setup-similar-list');
	var similarWizardTemplate = document.querySelector('#similar-wizard-template')
		.content
		.querySelector('.setup-similar-item');

	var renderWizard = function (wizard) {
		var wizardElement = similarWizardTemplate.cloneNode(true);

		wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
		wizardElement.querySelector('.wizard-coat').style.fill = wizard.colorCoat;
		wizardElement.querySelector('.wizard-eyes').style.fill = wizard.colorEyes;

		return wizardElement;
	};

	var renderSimilarWizards = function (wizards) {
		// var randomWizards = window.random.getSomeRandomElemets(wizards, WIZARD_COUNT);
		var fragment = document.createDocumentFragment();
		similarListElement.innerHTML = '';

		for (var i = 0; i < WIZARD_COUNT; i++) {
			fragment.appendChild(renderWizard(wizards[i]));
		}

		similarListElement.appendChild(fragment);
	};

	window.render = {
		renderSimilarWizards: renderSimilarWizards
	};
})();
