(function () {
	'use strict';

	class AbstractView {
		constructor() {
			if (new.target === AbstractView) {
				throw new Error(`Cant instantiate AbstractView, only concrete one`);
			}
		}

		get template() {
			throw new Error(`Template should be defined for view`);
		}

		get element() {
			if (!this._element) {
				this._element = this.render();
				this.bind();
			}

			return this._element;
		}

		render() {
			const wrapper = document.createElement(`div`); // TODO: переделать под DocumentFragment?
			wrapper.innerHTML = this.template.trim();

			return wrapper.childNodes[0];
		}

		bind() {
			// bind handlers if required
		}
	}

	class IntroView extends AbstractView {
		constructor() {
			super();
			this.nextButton = this.element.querySelector(`.intro__asterisk`);
			this.loading = this.element.querySelector(`.intro__loading`);
			this.disableButton();
		}

		get template() {
			return `
			<section class="intro">
				<p class="intro__loading">Loading...</p>
				<button class="intro__asterisk asterisk" type="button"><span class="visually-hidden">Продолжить</span>*</button>
				<p class="intro__motto">
					<sup>*</sup> Это не фото. Это рисунок маслом нидерландского художника-фотореалиста Tjalf Sparnaay.
				</p>
			</section>
		`;
		}

		addAnimation() {
			this.element.classList.add(`intro--animated`);
		}

		disableButton() {
			this.nextButton.style = `display: none`;
		}

		enableButton() {
			this.loading.style = `display: none`;
			this.nextButton.removeAttribute(`style`);
		}

		bind() {
			const nextButton = this.element.querySelector(`.intro__asterisk`);

			nextButton.addEventListener(`click`, (evt) => {
				evt.preventDefault();
				this.onClick();
			});
		}

		onClick() {

		}
	}

	class IntroScreen {
		constructor() {
			this.content = new IntroView();
			this.content.onClick = this.goNext.bind(this);

			this.root = document.createElement(`div`);
			this.root.appendChild(this.content.element);
		}

		get element() {
			return this.root;
		}

		enableButton() {
			this.content.enableButton();
		}

		goNext() {
			this.content.addAnimation();
			Application.showGreeting(true);
		}
	}

	class GreetingView extends AbstractView {
		get template() {
			return `
			<section class="greeting central--blur">
				<img class="greeting__logo" src="img/logo_ph-big.svg" width="201" height="89" alt="Pixel Hunter">
				<div class="greeting__asterisk asterisk"><span class="visually-hidden">Я просто красивая звёздочка</span>*</div>
				<div class="greeting__challenge">
					<h3 class="greeting__challenge-title">Лучшие художники-фотореалисты бросают тебе вызов!</h3>
					<p class="greeting__challenge-text">Правила игры просты:</p>
					<ul class="greeting__challenge-list">
						<li>Нужно отличить рисунок от фотографии и сделать выбор.</li>
						<li>Задача кажется тривиальной, но не думай, что все так просто.</li>
						<li>Фотореализм обманчив и коварен.</li>
						<li>Помни, главное — смотреть очень внимательно.</li>
					</ul>
				</div>
				<button class="greeting__continue" type="button">
					<span class="visually-hidden">Продолжить</span>
					<svg class="icon" width="64" height="64" viewBox="0 0 64 64" fill="#000000">
						<use xlink:href="img/sprite.svg#arrow-right"></use>
					</svg>
				</button>
			</section>
		`;
		}

		bind() {
			const arrowNext = this.element.querySelector(`.greeting__continue`);

			arrowNext.addEventListener(`click`, (evt) => {
				evt.preventDefault();
				this.onClick();
			});
		}

		onClick() {

		}
	}

	class GreetingScreen {
		constructor() {
			this.content = new GreetingView();
			this.content.onClick = this.goNext.bind(this);

			this.root = document.createElement(`div`);
			this.root.appendChild(this.content.element);
		}

		get element() {
			return this.root;
		}

		goNext() {
			Application.showRules();
		}
	}

	const INITIAL_STATE = Object.freeze({
		time: 30,
		lives: 3,
		level: 0,
		answers: []
	});

	const KeyCode = {
		SPACE: 32,
		ENTER: 13
	};

	const QuestionType = {
		TWO_OF_TWO: `two-of-two`,
		TINDER_LIKE: `tinder-like`,
		ONE_OF_THREE: `one-of-three`
	};

	const ImageFrame = {
		[QuestionType.TINDER_LIKE]: {
			width: 705,
			height: 455
		},
		[QuestionType.TWO_OF_TWO]: {
			width: 468,
			height: 458
		},
		[QuestionType.ONE_OF_THREE]: {
			width: 304,
			height: 455
		}
	};

	const QuestionTime = {
		SLOW: 10,
		FAST: 20
	};

	const AnswerType = {
		PAINTING: `paint`,
		PHOTO: `photo`
	};

	const ExtraPoint = {
		BASE: 100,
		FAST: 50,
		SLOW: 50,
		LIFE: 50
	};

	const Result = {
		CORRECT: `correct`,
		FAST: `fast`,
		SLOW: `slow`,
		WRONG: `wrong`
	};

	const ALL_ANSWERS_AMOUNT = 10;
	const MAX_LIVES_AMOUNT = 3;
	const ONE_SECOND = 1000;
	const BLINK_TIME = 5;

	class HeaderView extends AbstractView {
		constructor(state = ``) {
			super();
			this.state = state;

			if (state) {
				this.timerElement = this.element.querySelector(`.game__timer`);
			}
		}

		get template() {
			return `
			<header class="header">
				${this.addBackButtonTemplate()}
				${this.state ? this.addTimerTemplate(this.state.time) + this.addLivesTemplate(this.state.lives) : ``}
			</header>
		`;
		}

		addBackButtonTemplate() {
			return `
			<button class="back">
				<span class="visually-hidden">Вернуться к началу</span>
				<svg class="icon" width="45" height="45" viewBox="0 0 45 45" fill="#000000">
					<use xlink:href="img/sprite.svg#arrow-left"></use>
				</svg>
				<svg class="icon" width="101" height="44" viewBox="0 0 101 44" fill="#000000">
					<use xlink:href="img/sprite.svg#logo-small"></use>
				</svg>
			</button>
		`.trim();
		}

		addTimerTemplate(time) {
			return `<div class="game__timer">${time}</div>`.trim();
		}

		addLivesTemplate(lives) {
			return `
			<div class="game__lives">
				${new Array(MAX_LIVES_AMOUNT - lives).fill(`
					<img src="img/heart__empty.svg" class="game__heart" alt=" Missed Life" width="31" height="27">
				`).join(``)}
				${new Array(lives).fill(`
					<img src="img/heart__full.svg" class="game__heart" alt="Life" width="31" height="27">
				`).join(``)}
			</div>
		`.trim();
		}

		updateTime(time) {
			this.timerElement.textContent = time;
		}

		startTimerBlink() {
			this.timerElement.classList.add(`game__timer--animated`);
		}

		bind() {
			const backButton = this.element.querySelector(`.back`);

			backButton.addEventListener(`click`, (evt) => {
				evt.preventDefault();
				this.onClick();
			});
		}

		onClick() {

		}
	}

	class RulesView extends AbstractView {
		get template() {
			return `
			<section class="rules">
				<h2 class="rules__title">Правила</h2>
				<ul class="rules__description">
					<li>Угадай 10 раз для каждого изображения фото
						<img class="rules__icon" src="img/icon-photo.png" width="32" height="31" alt="Фото"> или рисунок
						<img class="rules__icon" src="img/icon-paint.png" width="32" height="31" alt="Рисунок"></li>
					<li>Фотографиями или рисунками могут быть оба изображения.</li>
					<li>На каждую попытку отводится 30 секунд.</li>
					<li>Ошибиться можно не более 3 раз.</li>
				</ul>
				<p class="rules__ready">Готовы?</p>
				<form class="rules__form">
					<input class="rules__input" type="text" placeholder="Ваше Имя">
					<button class="rules__button continue" type="submit" disabled>Go!</button>
				</form>
			</section>
		`;
		}

		isButtonDisabled(input) {
			return !input.value;
		}

		bind() {
			const nameInput = this.element.querySelector(`.rules__input`);
			const rulesButton = this.element.querySelector(`.rules__button`);
			const form = this.element.querySelector(`.rules__form`);

			const nameInputFocusHandler = () => {
				rulesButton.disabled = this.isButtonDisabled(nameInput);
			};

			nameInput.addEventListener(`blur`, nameInputFocusHandler);
			nameInput.addEventListener(`keyup`, nameInputFocusHandler);

			form.addEventListener(`submit`, (evt) => {
				evt.preventDefault();
				this.onSubmit(nameInput.value);
			});
		}

		onSubmit() {

		}
	}

	class RulesScreen {
		constructor() {
			this.header = new HeaderView();
			this.header.onClick = this.goBack.bind(this);
			this.content = new RulesView();
			this.content.onSubmit = this.goNext.bind(this);

			this.root = document.createElement(`div`);
			this.root.appendChild(this.header.element);
			this.root.appendChild(this.content.element);
		}

		get element() {
			return this.root;
		}

		goBack() {
			Application.showGreeting();
		}

		goNext(playerName) {
			Application.showGame(playerName);
		}
	}

	const increaseLevel = (state) => {
		if (typeof state.level !== `number`) {
			throw new Error(`Level should be a number`);
		}

		if (state.level < 0) {
			throw new RangeError(`Level shouldn't be a negative number`);
		}

		const newState = Object.assign({}, state);

		newState.level++;

		return newState;
	};

	const changeLives = (state) => {
		if (typeof state.lives !== `number`) {
			throw new Error(`Lives should be a number`);
		}

		if (state.lives <= 0) {
			throw new RangeError(`Lives should be a positive number`);
		}

		const newState = Object.assign({}, state);

		newState.lives--;

		return newState;
	};

	class GameModel {
		constructor(data, playerName) {
			this.data = data;
			this.playerName = playerName;
			this.restart();
		}

		get state() {
			return Object.freeze(this._state);
		}

		hasNextLevel() {
			return this.data[this._state.level + 1] !== void 0;
		}

		nextLevel() {
			this._state = increaseLevel(this._state);
		}

		decreaseLives() {
			this._state = changeLives(this._state);
		}

		addAnswer(type, time) {
			this._state.answers.push({status: type, timeElapsed: time});
		}

		restart() {
			this._state = Object.assign({}, INITIAL_STATE, {answers: []});
		}

		resetTime() {
			this._state = Object.assign({}, this._state, {time: INITIAL_STATE.time});
		}

		isTimeExpired() {
			return this._state.time <= 0;
		}

		isDead() {
			return this._state.lives <= 0;
		}

		getCurrentLevel() {
			return this.data[this._state.level];
		}

		tick() {
			this._state = Object.assign({}, this._state, {time: this._state.time - 1});
		}
	}

	const hash = window.location.hash.replace(`#`, ``);

	const DEBUG = hash.toLowerCase() === `debug`;
	const DEBUG_STYLE = `style="border: 5px solid green"`;

	class GameSingleView extends AbstractView {
		constructor(level, stats) {
			super();
			this.level = level;
			this.statsTemplate = stats.template;
		}

		get template() {
			return `
			<section class="game">
				<p class="game__task">${this.level.question}</p>
				<form class="game__content game__content--wide">
					<div class="game__option">
						<img
							src="${this.level.answers[0].image.url}"
							alt="Option 1"
							width="${this.level.answers[0].image.width}"
							height="${this.level.answers[0].image.height}"
						>
						<label class="game__answer game__answer--photo">
							<input class="visually-hidden" name="question1" type="radio" value="photo">
							<span ${DEBUG && this.level.answers[0].type === AnswerType.PHOTO ? DEBUG_STYLE : ``}>Фото</span>
						</label>
						<label class="game__answer game__answer--paint">
							<input class="visually-hidden" name="question1" type="radio" value="paint">
							<span ${DEBUG && this.level.answers[0].type === AnswerType.PAINTING ? DEBUG_STYLE : ``}>Рисунок</span>
						</label>
					</div>
				</form>
				${this.statsTemplate}
			</section>
		`;
		}

		bind() {
			const radioButtons = this.element.querySelectorAll(`.game__answer input[type='radio']`);

			radioButtons.forEach((it) => {
				it.addEventListener(`change`, (evt) => {
					evt.preventDefault();
					this.onAnswer([evt.target.value]);
				});
			});
		}

		onAnswer() {

		}
	}

	class GameDoubleView extends AbstractView {
		constructor(level, stats) {
			super();
			this.level = level;
			this.statsTemplate = stats.template;
		}

		get template() {
			return `
			<section class="game">
				<p class="game__task">${this.level.question}</p>
				<form class="game__content">
					<div class="game__option">
						<img
							src="${this.level.answers[0].image.url}"
							alt="Option 1"
							width="${this.level.answers[0].image.width}"
							height="${this.level.answers[0].image.height}"
						>
						<label class="game__answer game__answer--photo">
							<input class="visually-hidden" name="question1" type="radio" value="photo">
							<span ${DEBUG && this.level.answers[0].type === AnswerType.PHOTO ? DEBUG_STYLE : ``}>Фото</span>
						</label>
						<label class="game__answer game__answer--paint">
							<input class="visually-hidden" name="question1" type="radio" value="paint">
							<span ${DEBUG && this.level.answers[0].type === AnswerType.PAINTING ? DEBUG_STYLE : ``}>Рисунок</span>
						</label>
					</div>
					<div class="game__option">
						<img
							src="${this.level.answers[1].image.url}"
							alt="Option 2"
							width="${this.level.answers[1].image.width}"
							height="${this.level.answers[1].image.height}"
						>
						<label class="game__answer game__answer--photo">
							<input class="visually-hidden" name="question2" type="radio" value="photo">
							<span ${DEBUG && this.level.answers[1].type === AnswerType.PHOTO ? DEBUG_STYLE : ``}>Фото</span>
						</label>
						<label class="game__answer game__answer--paint">
							<input class="visually-hidden" name="question2" type="radio" value="paint">
							<span ${DEBUG && this.level.answers[1].type === AnswerType.PAINTING ? DEBUG_STYLE : ``}>Рисунок</span>
						</label>
					</div>
				</form>
				${this.statsTemplate}
			</section>
		`;
		}

		bind() {
			const form = this.element.querySelector(`.game__content`);
			const radioButtons = this.element.querySelectorAll(`.game__answer input[type='radio']`);
			const optionsNubmer = this.element.querySelectorAll(`.game__option`).length;

			const formChangeHadler = (evt) => {
				evt.preventDefault();

				const inputValues = [];
				const checkedInputs = Array.from(radioButtons).filter((it) => {
					if (it.checked) {
						inputValues.push(it.value);
					}

					return it.checked;
				});

				if (checkedInputs.length >= optionsNubmer) {
					this.onAnswer(inputValues);
				}
			};

			form.addEventListener(`change`, formChangeHadler);
		}

		onAnswer() {

		}
	}

	class GameTripleView extends AbstractView {
		constructor(level, stats) {
			super();
			this.level = level;
			this.statsTemplate = stats.template;
		}

		get template() {
			return `
			<section class="game">
				<p class="game__task">${this.level.question}</p>
				<form class="game__content game__content--triple">
					<div class="game__option" tabindex="0" ${DEBUG && this.isRightAnswer(0) ? DEBUG_STYLE : ``}>
						<img
							src="${this.level.answers[0].image.url}"
							alt="Option 1"
							width="${this.level.answers[0].image.width}"
							height="${this.level.answers[0].image.height}"
						>
					</div>
					<div class="game__option game__option--selected" tabindex="0" ${DEBUG && this.isRightAnswer(1) ? DEBUG_STYLE : ``}>
						<img
							src="${this.level.answers[1].image.url}"
							alt="Option 2"
							width="${this.level.answers[1].image.width}"
							height="${this.level.answers[1].image.height}"
						>
					</div>
					<div class="game__option" tabindex="0" ${DEBUG && this.isRightAnswer(2) ? DEBUG_STYLE : ``}>
						<img
							src="${this.level.answers[2].image.url}"
							alt="Option 3"
							width="${this.level.answers[2].image.width}"
							height="${this.level.answers[2].image.height}"
						>
					</div>
				</form>
				${this.statsTemplate}
			</section>
		`;
		}

		// for debug mode only
		isRightAnswer(index) {
			const answers = this.level.answers.map((it) => it.type);

			return answers.indexOf(answers[index]) === answers.lastIndexOf(answers[index]);
		}

		bind() {
			const answers = this.element.querySelectorAll(`.game__option`);

			answers.forEach((it, index) => {
				it.addEventListener(`click`, (evt) => {
					evt.preventDefault();
					this.onAnswer(index);
				});

				it.addEventListener(`keydown`, (evt) => {
					evt.preventDefault();

					if (evt.keyCode === KeyCode.SPACE || evt.keyCode === KeyCode.ENTER) {
						this.onAnswer(index);
					}
				});
			});
		}

		onAnswer() {

		}
	}

	class StatsView extends AbstractView {
		constructor(answers) {
			super();
			this.answers = answers;
		}

		get template() {
			return `
			<ul class="stats">
				${this.answers.map((it) => `<li class="stats__result stats__result--${it.status}"></li>`).join(``)}
				${new Array(ALL_ANSWERS_AMOUNT - this.answers.length).fill(`<li class="stats__result stats__result--unknown"></li>`).join(``)}
			</ul>
		`;
		}
	}

	class ConfirmView extends AbstractView {
		constructor() {
			super();
			this.confirmButton = this.element.querySelector(`#confirm-btn`);
		}

		get template() {
			return `
			<section class="modal">
				<form class="modal__inner">
					<button class="modal__close" type="button" tabindex="3">
						<span class="visually-hidden">Закрыть</span>
					</button>
					<h2 class="modal__title">Подтверждение</h2>
					<p class="modal__text">Вы уверены что хотите начать игру заново?</p>
					<div class="modal__button-wrapper">
						<button class="modal__btn" id="confirm-btn" tabindex="1">Ок</button>
						<button class="modal__btn" id="cancel-btn" tabindex="2">Отмена</button>
					</div>
				</form>
			</section>
		`;
		}

		bind() {
			const confirmButton = this.element.querySelector(`#confirm-btn`);
			const cancelButton = this.element.querySelector(`#cancel-btn`);
			const closeButton = this.element.querySelector(`.modal__close`);

			confirmButton.addEventListener(`click`, (evt) => {
				evt.preventDefault();
				this.onComfirm();
			});

			cancelButton.addEventListener(`click`, (evt) => {
				evt.preventDefault();
				this.onCancel();
			});

			closeButton.addEventListener(`click`, (evt) => {
				evt.preventDefault();
				this.onCancel();
			});
		}

		onComfirm() {

		}

		onCancel() {

		}
	}

	class GameScreen {
		constructor(model) {
			this.model = model;

			this.header = new HeaderView(this.model.state);
			this.header.onClick = this.showModal.bind(this);
			this.stats = new StatsView(this.model.state.answers);
			this.confirm = new ConfirmView();

			this.level = this.model.getCurrentLevel();
			this.content = this.chooseGameType(this.level.type);
			this.level.onAnswer = this.answer.bind(this);

			this.root = document.createElement(`div`);
			this.root.appendChild(this.header.element);
			this.root.appendChild(this.content.element);

			this._timer = null;
			this.timerValue = this.header.timerElement.textContent;
		}

		get element() {
			return this.root;
		}

		chooseGameType(type) {
			let level;

			switch (type) {
				case QuestionType.TINDER_LIKE:
					level = new GameSingleView(this.level, this.stats);
					break;

				case QuestionType.TWO_OF_TWO:
					level = new GameDoubleView(this.level, this.stats);
					break;

				case QuestionType.ONE_OF_THREE:
					level = new GameTripleView(this.level, this.stats);
					break;

				default:
					throw new Error(`Invalid type of game`);
			}

			return level;
		}

		_tick() {
			this.model.tick();
			this.header.updateTime(this.model.state.time);
			this._timer = setTimeout(() => this._tick(), ONE_SECOND);
			this.checkTimer();
		}

		checkTimer() {
			if (this.model.isTimeExpired()) {
				this.answer(false);
			}

			if (this.model.state.time <= BLINK_TIME) {
				this.header.startTimerBlink();
			}
		}

		startGame() {
			this.changeLevel();
			this.model.resetTime();
			this._tick();
		}

		stopGame() {
			clearInterval(this._timer);
		}

		getArrayOfAnswers(level) {
			return level.answers.map((it) => it.type);
		}

		/**
		 * Checks if answer is right.
		 * Answer type can be "Array" for TINDER_LIKE & TWO_OF_TWO type of game or "string" for ONE_OF_THREE.
		 * @param {*} answer
		 * @return {boolean}
		 */
		isRightAnswer(answer) {
			const levelAnswers = this.getArrayOfAnswers(this.level);

			if (this.level.type === QuestionType.ONE_OF_THREE) {
				return levelAnswers.indexOf(levelAnswers[answer]) === levelAnswers.lastIndexOf(levelAnswers[answer]);
			}

			return JSON.stringify(answer) === JSON.stringify(levelAnswers);
		}

		getCorrectAnswerStatus(time) {
			if (time < QuestionTime.SLOW) {
				return Result.SLOW;
			} else if (time <= QuestionTime.FAST) {
				return Result.CORRECT;
			}

			return Result.FAST;
		}

		answer(answer) {
			this.stopGame();
			this.timerValue = this.header.timerElement.textContent;

			if (!answer || !this.isRightAnswer(answer)) {
				this.model.decreaseLives();
				this.model.addAnswer(Result.WRONG, this.timerValue);
			} else {
				this.model.addAnswer(this.getCorrectAnswerStatus(this.timerValue), this.timerValue);
			}

			if (!this.model.hasNextLevel() || this.model.isDead()) {
				this.endGame();
			} else {
				this.model.nextLevel();
				this.startGame();
			}
		}

		updateHeader() {
			const header = new HeaderView(this.model.state);
			this.root.replaceChild(header.element, this.header.element);
			this.header = header;
			this.header.onClick = this.showModal.bind(this);
		}

		changeLevel() {
			this.updateHeader();

			this.level = this.model.getCurrentLevel();
			const level = this.chooseGameType(this.level.type);
			level.onAnswer = this.answer.bind(this);
			this.changeContentView(level);
		}

		endGame() {
			Application.showResults(this.model);
		}

		changeContentView(view) {
			this.root.replaceChild(view.element, this.content.element);
			this.content = view;
		}

		exit() {
			this.model.restart();
			Application.showGreeting();
			document.body.removeChild(this.confirm.element);
		}

		showModal() {
			document.body.appendChild(this.confirm.element);
			this.confirm.confirmButton.focus();
			this.confirm.onComfirm = () => this.exit();
			this.confirm.onCancel = () => document.body.removeChild(this.confirm.element);
		}
	}

	const calculateScore = (answers, livesLeftAmount) => {
		if (!Array.isArray(answers)) {
			throw new Error(`First parameter should be an array`);
		}

		if (typeof livesLeftAmount !== `number`) {
			throw new Error(`Second parameter should be a number`);
		}

		if (answers.length < ALL_ANSWERS_AMOUNT || answers.length > ALL_ANSWERS_AMOUNT) {
			return -1;
		}

		if (livesLeftAmount < 0 || livesLeftAmount > MAX_LIVES_AMOUNT) {
			return -1;
		}

		const rightAnswersAmount = answers.filter((it) => it.status !== Result.WRONG).length;
		const fastAnswersAmount = answers.filter((it) => it.status === Result.FAST).length;
		const slowAnswersAmount = answers.filter((it) => it.status === Result.SLOW).length;

		const finalScore = (rightAnswersAmount * ExtraPoint.BASE) + (fastAnswersAmount * ExtraPoint.FAST) - (slowAnswersAmount * ExtraPoint.SLOW) + (livesLeftAmount * ExtraPoint.LIFE);

		return {
			correct: rightAnswersAmount,
			fast: fastAnswersAmount,
			slow: slowAnswersAmount,
			finalScore
		};
	};

	class ResultsView extends AbstractView {
		get template() {
			return `
			<section class="result">
				<p>Результаты загружаются...</p>
			</section>
		`;
		}

		addResultPointsTemplate(score) {
			if (score === -1) {
				return `
				<td class="result__total"></td>
				<td class="result__total  result__total--final">fail</td>
			`.trim();
			}

			return `
			<td class="result__points">${score !== -1 ? `× ${ExtraPoint.BASE}` : ``}</td>
			<td class="result__total">${score.correct * ExtraPoint.BASE}</td>
		`.trim();
		}

		addFastPointsTemplate(score) {
			if (score === -1 || !score.fast) {
				return ``;
			}

			return `
			<tr>
				<td></td>
				<td class="result__extra">Бонус за скорость:</td>
				<td class="result__extra">${score.fast} <span class="stats__result stats__result--fast"></span></td>
				<td class="result__points">× ${ExtraPoint.FAST}</td>
				<td class="result__total">${score.fast * ExtraPoint.FAST}</td>
			</tr>
		`.trim();
		}

		addLivePointsTemplate(score, lives) {
			if (score === -1 || score.lives < 1) {
				return ``;
			}

			return `
			<tr>
				<td></td>
				<td class="result__extra">Бонус за жизни:</td>
				<td class="result__extra">${lives} <span class="stats__result stats__result--alive"></span></td>
				<td class="result__points">× ${ExtraPoint.LIFE}</td>
				<td class="result__total">${lives * ExtraPoint.LIFE}</td>
			</tr>
		`.trim();
		}

		addSlowPointsTemplate(score) {
			if (score === -1 || !score.slow) {
				return ``;
			}

			return `
			<tr>
				<td></td>
				<td class="result__extra">Штраф за медлительность:</td>
				<td class="result__extra">${score.slow} <span class="stats__result stats__result--slow"></span></td>
				<td class="result__points">× ${ExtraPoint.SLOW}</td>
				<td class="result__total">-${score.slow * ExtraPoint.SLOW}</td>
			</tr>
		`.trim();
		}

		addFinalScoreTemplate(score) {
			if (score === -1) {
				return ``;
			}

			return `
			<tr>
				<td colspan="5" class="result__total result__total--final">${score.finalScore}</td>
			</tr>
		`.trim();
		}

		isWin(result) {
			return result !== -1;
		}

		getResultsTemplate(results, scores) {
			const reusltTables = results.map((result, i) => {
				return `
				<table class="result__table">
					<tr>
						<td class="result__number">${i + 1}.</td>
						<td colspan="2">
							${new StatsView(result.answers).template}
						</td>
						${this.addResultPointsTemplate(scores[i])}
					</tr>
					${this.addFastPointsTemplate(scores[i])}
					${this.addLivePointsTemplate(scores[i], result.lives)}
					${this.addSlowPointsTemplate(scores[i])}
					${this.addFinalScoreTemplate(scores[i])}
				</table>
			`;
			});

			return `
			<h2 class="result__title">${this.isWin(scores[0]) ? `Победа!` : `Поражение`}</h2>
			${reusltTables.join(``)}
		`;
		}

		showScores(results) {
			results = results.reverse();
			const scores = results.map((it) => calculateScore(it.answers, it.lives));
			const resultsTemplate = this.getResultsTemplate(results, scores);
			this.element.innerHTML = resultsTemplate;
		}
	}

	class ResultsScreen {
		constructor(model) {
			this.model = model;

			this.header = new HeaderView(this.model.state);
			this.header.onClick = this.goBack.bind(this);
			this.content = new ResultsView();

			this.root = document.createElement(`div`);
			this.root.appendChild(this.header.element);
			this.root.appendChild(this.content.element);
		}

		get element() {
			return this.root;
		}

		goBack() {
			Application.showGreeting();
		}

		showScores(data) {
			this.content.showScores(data);
		}
	}

	class ErrorView extends AbstractView {
		get template() {
			return `
			<section class="modal">
				<div class="modal__inner">
					<h2 class="modal__title">Произошла ошибка!</h2>
					<p class="modal__text modal__text--error">Статус: 404. Пожалуйста, перезагрузите страницу.</p>
				</div>
			</section>
		`;
		}
	}

	const resize = (frame, image) => {
		const widthRatio = image.width / frame.width;
		const heightRatio = image.height / frame.height;

		if (widthRatio > heightRatio) {
			return {
				width: Math.floor(image.width / widthRatio),
				height: Math.floor(image.height / widthRatio)
			};
		} else {
			return {
				width: Math.floor(image.width / heightRatio),
				height: Math.floor(image.height / heightRatio)
			};
		}
	};

	const adaptServerData = (data) => {
		return data.map((it) => {
			const frame = ImageFrame[it.type];

			const changedAnswers = it.answers.map((answer) => {
				const resizedImage = resize(frame, {width: answer.image.width, height: answer.image.height});

				return {
					image: {
						url: answer.image.url,
						width: resizedImage.width,
						height: resizedImage.height
					},
					type: answer.type === `painting` ? `paint` : answer.type
				};
			});

			return {
				type: it.type,
				question: it.question,
				answers: changedAnswers
			};
		});
	};

	const Status = {
		OK: 200,
		REDIRECT: 300
	};

	const SERVER_URL = `https://es.dump.academy/pixel-hunter`;
	const DEFAULT_NAME = `John Doe`;
	const APP_ID = 22331138;

	const checkStatus = (response) => {
		if (response.status >= Status.OK && response.status < Status.REDIRECT) {
			return response;
		}

		throw new Error(`${response.status}: ${response.statusText}`);
	};

	const toJSON = (response) => response.json();

	class Loader {
		static loadData() {
			return fetch(`${SERVER_URL}/questions`)
				.then(checkStatus)
				.then(toJSON)
				.then(adaptServerData);
		}

		static loadResults(name = DEFAULT_NAME) {
			return fetch(`${SERVER_URL}/stats/:${APP_ID}-:${name}`)
				.then(checkStatus)
				.then(toJSON);
		}

		static saveResults(data, name = DEFAULT_NAME) {
			data = Object.assign({name}, data);

			const requestSettings = {
				body: JSON.stringify(data),
				headers: {
					'Content-Type': `application/json`
				},
				method: `POST`
			};

			return fetch(`${SERVER_URL}/stats/:${APP_ID}-:${name}`, requestSettings)
				.then(checkStatus);
		}
	}

	const mainElement = document.querySelector(`#main`);

	const changeView = (element, isFade = false) => {
		if (!isFade) {
			mainElement.innerHTML = ``;
		}

		mainElement.appendChild(element);
	};

	let gameData;

	class Application {
		static showIntro() {
			const intro = new IntroScreen();
			changeView(intro.element);

			Loader.loadData()
				.then((data) => {
					gameData = data;
				})
				.then(() => intro.enableButton())
				.catch((err) => Application.showError(err));
		}

		static showGreeting(isFade = false) {
			const greeting = new GreetingScreen();
			changeView(greeting.element, isFade);
		}

		static showRules() {
			const rules = new RulesScreen();
			changeView(rules.element);
		}

		static showGame(playerName) {
			const model = new GameModel(gameData, playerName);
			const gameScreen = new GameScreen(model);
			changeView(gameScreen.element);
			gameScreen.startGame();
		}

		static showResults(model) {
			const playerName = model.playerName;
			const resultsData = {
				answers: model.state.answers,
				lives: model.state.lives
			};
			const results = new ResultsScreen(model);
			changeView(results.element);
			Loader.saveResults(resultsData, playerName)
				.then(() => Loader.loadResults(playerName))
				.then((data) => results.showScores(data))
				.catch((err) => Application.showError(err));
		}

		static showError() {
			const error = new ErrorView();
			document.body.appendChild(error.element);
		}
	}

	Application.showIntro();

}());

//# sourceMappingURL=main.js.map
