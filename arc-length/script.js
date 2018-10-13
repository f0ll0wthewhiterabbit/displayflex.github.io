let arcLengthWidth = document.querySelector('.arc-length__width');
let arcLengthHeight = document.querySelector('.arc-length__height');
let arcLengthCalculateBtn = document.querySelector('.arc-length__calculate-btn');
let arcLengthResult = document.querySelector('.arc-length__result');

let circleRadiusLength = document.querySelector('.circle-radius__length');
let circleRadiusCalculateBtn = document.querySelector('.circle-radius__calculate-btn');
let circleRadiusResult = document.querySelector('.circle-radius__result');

arcLengthCalculateBtn.addEventListener('click', function(e) {
	e.preventDefault();
	arcLengthResult.innerHTML = "";

	let arcLengthWidthValue = +arcLengthWidth.value;
	let arcLengthHeightValue = +arcLengthHeight.value;

	let chord = Math.sqrt(Math.pow(arcLengthHeightValue, 2) + Math.pow(arcLengthWidthValue/2, 2));

	let arcLength = (2 * chord) + (1/3 * (2 * chord - arcLengthWidthValue));
	arcLength = Math.round(arcLength * 10) / 10;

	// let radius = (arcLengthHeightValue / 2) + (Math.pow(arcLengthWidthValue, 2) / (8 * arcLengthHeightValue));

	arcLengthResult.innerHTML += "Ширина = " + arcLengthWidthValue + " см <br>";
	arcLengthResult.innerHTML += "Высота = " + arcLengthHeightValue + " см <br>";
	arcLengthResult.innerHTML += "<b>Длина дуги = " + arcLength + " см <b><br>";
	arcLengthResult.innerHTML += "<small>(по формуле Гюйгенса)</small><br>";
});

circleRadiusCalculateBtn.addEventListener('click', function(e) {
	e.preventDefault();
	circleRadiusResult.innerHTML = "";

	let circleRadiusLengthValue = +circleRadiusLength.value;

	let diameter = (circleRadiusLengthValue / (2 * Math.PI)) * 2;
	diameter = Math.round(diameter * 10) / 10;

	circleRadiusResult.innerHTML += "Длина окружности = " + circleRadiusLengthValue + " см <br>";
	circleRadiusResult.innerHTML += "<b>Диаметр окружности = " + diameter + " см <b><br>";
});


