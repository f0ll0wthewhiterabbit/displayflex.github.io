let width = document.querySelector('.width');
let height = document.querySelector('.height');
let calculateButton = document.querySelector('.calculate-button');
let resultArea = document.querySelector('.result');

calculateButton.addEventListener('click', function(e) {
	e.preventDefault();
	resultArea.innerHTML = "";

	let widthValue = +width.value;
	let heightValue = +height.value;

	let chord = Math.sqrt(Math.pow(heightValue, 2) + Math.pow(widthValue/2, 2));

	let arcLength = (2 * chord) + (1/3 * (2 * chord - widthValue));
	arcLength = Math.round(arcLength * 10) / 10;

	// let radius = (heightValue / 2) + (Math.pow(widthValue, 2) / (8 * heightValue));

	resultArea.innerHTML += "Длина = " + widthValue + " см <br>";
	resultArea.innerHTML += "Высота = " + heightValue + " см <br><br>";
	resultArea.innerHTML += "<b>Длина дуги = " + arcLength + " см <b><br>";
	resultArea.innerHTML += "<small>(по формуле Гюйгенса)</small><br>";
});
