'use strict';

(function () {
	var setupForm = document.querySelector('.setup-wizard-form');
	var setupPlayer = setupForm.querySelector('.setup-player');
	var wizardCoat = setupPlayer.querySelector('.wizard-coat');
	var wizardEyes = setupPlayer.querySelector('.wizard-eyes');
	var fireball = setupPlayer.querySelector('.setup-fireball-wrap');
	var wizardCoatInput = setupPlayer.querySelector('input[name=coat-color]');
	var wizardEyesInput = setupPlayer.querySelector('input[name=eyes-color]');
	var fireballInput = fireball.querySelector('input[name=fireball-color]');
	var userNameInput = setupForm.querySelector('.setup-user-name');

	var wizard = {
		coatChangeHandler: function (color) {
			return color;
		},

		eyesChangeHandler: function (color) {
			return color;
		},

		fireballChangeHandler: function (color) {
			return color;
		}
	};

	var setCoat = function (color) {
		wizardCoat.style.fill = color;
		wizardCoatInput.value = color;
		wizard.coatChangeHandler(color);
	};

	var setEyes = function (color) {
		wizardEyes.style.fill = color;
		wizardEyesInput.value = color;
		wizard.eyesChangeHandler(color);
	};

	var setFireball = function (color) {
		fireball.style.backgroundColor = color;
		fireballInput.value = color;
		wizard.fireballChangeHandler(color);
	};

	var setWizardInitialValues = function () {
		setCoat(window.colorize.getCoatInitialColor());
		setEyes(window.colorize.getEyesInitialColor());
		setFireball(window.colorize.getFireballInitialColor());
	};

	var wizardCoatClickHandler = function () {
		setCoat(window.colorize.getCoatColor());
	};

	var wizardEyesClickHandler = function () {
		setEyes(window.colorize.getEyesColor());
	};

	var fireballClickHandler = function () {
		setFireball(window.colorize.getFireballColor());
	};

	var userNameInputInvalidHandler = function () {
		if (userNameInput.validity.tooShort) {
			userNameInput.setCustomValidity('Имя должно состоять из 2-х символов');
		} else if (userNameInput.validity.tooLong) {
			userNameInput.setCustomValidity('Имя не должно превышать 25-ти символов');
		} else if (userNameInput.validity.valueMissing) {
			userNameInput.setCustomValidity('Обязательное поле');
		} else {
			userNameInput.setCustomValidity('');
		}
	};

	var saveSuccessHandler = function () {
		window.dialog.close();
	};

	var saveErrorHandler = function (errorMessage) {
		window.util.renderErrorMessage(errorMessage);
	};

	var setupFormSubmitHandler = function (evt) {
		evt.preventDefault();
		var wizardCopy = document.querySelector('svg').cloneNode(true);

		wizardCopy.querySelector('#wizard-coat').style.fill = wizardCoat.style.fill;
		wizardCopy.querySelector('#wizard-eyes').style.fill = wizardEyes.style.fill;

		var wizardBase64Right = window.svg2base64(wizardCopy);

		wizardCopy.querySelector('#wizard').setAttribute('transform', 'translate(62, 0) scale(-1, 1)');
		var wizardBase64Left = window.svg2base64(wizardCopy);

		window.restartGame(wizardBase64Right, wizardBase64Left);
		window.backend.save(new FormData(setupForm), saveSuccessHandler, saveErrorHandler);
	};

	wizardCoat.addEventListener('click', wizardCoatClickHandler);
	wizardEyes.addEventListener('click', wizardEyesClickHandler);
	fireball.addEventListener('click', fireballClickHandler);
	userNameInput.addEventListener('invalid', userNameInputInvalidHandler);
	setupForm.addEventListener('submit', setupFormSubmitHandler);

	window.setup = {
		wizard: wizard,
		setWizardInitialValues: setWizardInitialValues
	};
})();
