var loginLink = document.querySelector(".user-block__login");
var popup = document.querySelector(".modal-content");
var close = document.querySelector(".modal-content__close");
var login = popup.querySelector("[name=login]");
var password = popup.querySelector("[name=password]");
var form = popup.querySelector(".login-form");
var storage = localStorage.getItem("login");

loginLink.addEventListener('click', function(event) {
	event.preventDefault();
	popup.classList.add("modal-content--show");

	if (storage) {
		login.value = storage;
		password.focus();
	} else {
		login.focus();
	}
});

close.addEventListener('click', function(event) {
	event.preventDefault();
	popup.classList.remove("modal-content--show");
	popup.classList.remove("modal-error");
});

form.addEventListener('submit', function(event) {
	if (!login.value || !password.value) {
		event.preventDefault();
		popup.classList.add("modal-error");
		popup.classList.remove("modal-error");
		void popup.offsetWidth; //для того что бы удаление класса не происходило до анимации
		popup.classList.add("modal-error");
	} else {
		localStorage.setItem(login, login.value);
	}
});

window.addEventListener('keydown', function() {
	if (event.keyCode === 27) {
		if (popup.classList.contains("modal-content--show")) {
			popup.classList.remove("modal-content--show");
			popup.classList.remove("modal-error");
		}
	}
});
