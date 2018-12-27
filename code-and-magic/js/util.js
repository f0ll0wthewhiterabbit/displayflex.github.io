'use strict';

(function () {
	var Keycode = {
		ESC: 27,
		ENTER: 13
	};

	var isEscEvent = function (evt, action) {
		if (evt.keyCode === Keycode.ESC) {
			action();
		}
	};

	var isEnterEvent = function (evt, action) {
		if (evt.keyCode === Keycode.ENTER) {
			action();
		}
	};

	var renderErrorMessage = function (errorMessage) {
		var node = document.createElement('div');
		node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red';
		node.style.position = 'absolute';
		node.style.left = 0;
		node.style.right = 0;
		node.style.fontSize = '30px';
		node.textContent = errorMessage;
		document.body.insertAdjacentElement('afterbegin', node);
	};

	window.util = {
		isEscEvent: isEscEvent,
		isEnterEvent: isEnterEvent,
		renderErrorMessage: renderErrorMessage
	};
})();
