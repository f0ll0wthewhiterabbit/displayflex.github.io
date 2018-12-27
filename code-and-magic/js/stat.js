'use strict';

(function () {
	var CLOUD_WIDTH = 420;
	var CLOUD_HEIGHT = 270;
	var CLOUD_X = 100;
	var CLOUD_Y = 10;
	var CLOUD_COLOR = '#fff';
	var SHADOW_COLOR = 'rgba(0, 0, 0, 0.7)';
	var SHADOW_OFFSET = 10;
	var FONT = '16px PT Mono';
	var FONT_COLOR = '#000';
	var BAR_CHART_WIDTH = 40;
	var BAR_CHART_OFFSET = 50;
	var GRAPH_HEIGHT = 150;

	var drawBackground = function (ctx, x, y, width, height, color) {
		var offsetX = 20;
		var offsetY = 10;

		ctx.fillStyle = color;
		ctx.strokeStyle = color;
		ctx.beginPath();
		ctx.moveTo(x, y);
		ctx.lineTo(x + width / 2 + offsetY, y + offsetY);
		ctx.lineTo(x + width, y);
		ctx.lineTo(x + width - offsetX, y + height / 2);
		ctx.lineTo(x + width, y + height);
		ctx.lineTo(x + width / 2 + offsetX, y + height - offsetY);
		ctx.lineTo(x, y + height);
		ctx.lineTo(x + offsetX, y + height / 2);
		ctx.lineTo(x, y);
		ctx.closePath();
		ctx.stroke();
		ctx.fill();
	};

	var getMaxElement = function (array) {
		var maxValue = 0;

		for (var i = 0; i < array.length; i += 1) {
			if (maxValue < array[i]) {
				maxValue = array[i];
			}
		}

		return maxValue;
	};

	window.renderStatistics = function (ctx, names, times) {
		var graphX = 155;
		var graphY = 90;
		var saturation;
		var barChartColor;
		var barChartX;
		var barChartY;
		var barChartHeight;
		var time;
		var maxTime = getMaxElement(times);

		drawBackground(ctx, CLOUD_X + SHADOW_OFFSET, CLOUD_Y + SHADOW_OFFSET, CLOUD_WIDTH, CLOUD_HEIGHT, SHADOW_COLOR);
		drawBackground(ctx, CLOUD_X, CLOUD_Y, CLOUD_WIDTH, CLOUD_HEIGHT, CLOUD_COLOR);

		ctx.fillStyle = FONT_COLOR;
		ctx.font = FONT;
		ctx.textBaseline = 'hanging';
		ctx.fillText('Ура вы победили!', 135, 30);
		ctx.fillText('Список результатов:', 135, 50);


		for (var i = 0; i < times.length; i += 1) {
			saturation = Math.floor(Math.random() * 100);
			barChartX = graphX + i * (BAR_CHART_WIDTH + BAR_CHART_OFFSET);
			barChartHeight = times[i] * GRAPH_HEIGHT / maxTime;
			barChartY = GRAPH_HEIGHT - barChartHeight + graphY;
			time = Math.round(times[i]);

			if (names[i] === 'Вы') {
				barChartColor = 'rgba(255, 0, 0, 1)';
			} else {
				barChartColor = 'hsl(240, ' + saturation + '%, 50%)';
			}

			ctx.fillStyle = barChartColor;
			ctx.fillRect(barChartX, barChartY, BAR_CHART_WIDTH, barChartHeight);

			ctx.fillStyle = FONT_COLOR;
			ctx.textBaseline = 'alphabetic';
			ctx.fillText(time, barChartX, barChartY - 10);
			ctx.textBaseline = 'hanging';
			ctx.fillText(names[i], barChartX, graphY + GRAPH_HEIGHT + 10);
		}
	};
})();
