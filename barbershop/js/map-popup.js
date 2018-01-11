var mapOpen = document.querySelector(".js-open-map");
var mapPopup = document.querySelector(".modal-content-map");
var mapClose = document.querySelector(".modal-map__close");
var mapLinkFooter = document.querySelector(".footer-contacts__link");

mapOpen.addEventListener('click', function(event) {
	event.preventDefault();
	mapPopup.classList.add("modal-map--show");
});

mapClose.addEventListener('click', function(event) {
	event.preventDefault();
	mapPopup.classList.remove("modal-map--show");
});

window.addEventListener('keydown', function() {
	if (event.keyCode === 27) {
		if (mapPopup.classList.contains("modal-map--show")) {
			mapPopup.classList.remove("modal-map--show");
		}
	}
});

mapLinkFooter.addEventListener('click', function(event){
	event.preventDefault();
	mapPopup.classList.add("modal-map--show");
});
