'use strict';

(function () {
	var UserDialogInitial = {
		TOP: '80px',
		LEFT: '50%'
	};

	var userDialog = document.querySelector('.setup');
	var setupOpen = document.querySelector('.setup-open');
	var setupClose = userDialog.querySelector('.setup-close');
	var dialogHandle = userDialog.querySelector('.upload');

	var popupEscPressHandler = function (evt) {
		if (evt.target.className !== 'setup-user-name') {
			window.util.isEscEvent(evt, closePopup);
		}
	};

	var openPopup = function () {
		userDialog.style.left = UserDialogInitial.LEFT;
		userDialog.style.top = UserDialogInitial.TOP;
		userDialog.querySelector('.setup-similar').classList.remove('hidden');
		userDialog.classList.remove('hidden');
		document.addEventListener('keydown', popupEscPressHandler);
	};

	var closePopup = function () {
		userDialog.classList.add('hidden');
		document.removeEventListener('keydown', popupEscPressHandler);
	};

	setupOpen.addEventListener('click', function () {
		openPopup();
	});

	setupOpen.addEventListener('keydown', function (evt) {
		window.util.isEnterEvent(evt, openPopup);
	});

	setupClose.addEventListener('click', function () {
		closePopup();
	});

	setupClose.addEventListener('keydown', function (evt) {
		window.util.isEnterEvent(evt, closePopup);
	});

	var setupUserPicMouseDownHandler = function (evt) {
		evt.preventDefault();

		var dragged = false;

		var startCoords = {
			x: evt.clientX,
			y: evt.clientY
		};

		var mouseMoveHandler = function (moveEvt) {
			moveEvt.preventDefault();

			dragged = true;

			var shift = {
				x: startCoords.x - moveEvt.clientX,
				y: startCoords.y - moveEvt.clientY,
			};

			startCoords = {
				x: moveEvt.clientX,
				y: moveEvt.clientY,
			};

			userDialog.style.left = (userDialog.offsetLeft - shift.x) + 'px';
			userDialog.style.top = (userDialog.offsetTop - shift.y) + 'px';
		};

		var mouseUpHandler = function (upEvt) {
			upEvt.preventDefault();

			document.removeEventListener('mousemove', mouseMoveHandler);
			document.removeEventListener('mouseup', mouseUpHandler);

			if (dragged) {
				var clickPreventDefaultHandler = function (dragEvt) {
					dragEvt.preventDefault();
					dialogHandle.removeEventListener('click', clickPreventDefaultHandler);
				};

				dialogHandle.addEventListener('click', clickPreventDefaultHandler);
			}
		};

		document.addEventListener('mousemove', mouseMoveHandler);
		document.addEventListener('mouseup', mouseUpHandler);
	};

	dialogHandle.addEventListener('mousedown', setupUserPicMouseDownHandler);

	window.dialog = {
		close: closePopup
	};
})();
