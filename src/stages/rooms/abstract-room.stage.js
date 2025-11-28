import {Sprite} from 'jetcode-scrubjs';
import {ButtonSprite} from "../../sprites/button.sprite";
import {MonitorStage} from "../monitor.stage";
import {AbstractStage} from "../abstract.stage";
import {GameState} from "../../services/game.state";
import {BlankButtonSprite} from "../../sprites/blank-button.sprite";
import {LongButtonSprite} from "../../sprites/long-button.sprite";

export class AbstractRootStage extends AbstractStage {
	thumbnail;
	pollution = 0;
	isRoomReady = false;
	tickMaxCount = 5;
	tickCount = 0;
	maxQuantity = 20;
	currentQuantity = 0;

	cleaningValue = 10;
	robot = null;
	robotChargeDif = 0;

	isCleaningByRobot = false;

	isVisualized = false;

	init() {
		super.init()
		this.gameState = GameState.getInstance();

		this.onReady(()=>{
			this.monitorStage = MonitorStage.getInstance();
		})

		this.addBackground('public/images/rooms/background_space.png');

		this.addSound('public/sounds/ready.mp3', 'ready');
		this.addSound('public/sounds/activation.mp3', 'activation');

		// Создание звезд
		this.createStars()

		const backgroundSprite = new Sprite(this, 1);
		backgroundSprite.addCostume(this.getBackgroundImage());
		backgroundSprite.x = 400;
		backgroundSprite.y = 300

		const monitorBg = new Sprite(this, 2);
		monitorBg.addCostume('public/images/common/main_monitor.png');

		this.createBackButton();
		this.createGetManureButton();

		this.forever(this.gameTickAllRooms, 1000);
		this.forever(this.updateHelpText);

		this.visualiser = new Sprite();
		this.setVisCostumes();
		this.visualiser.hidden = true;
		this.visualiser.moving = true;

		this.onStart(() => {
			this.visualizerSpawn();

            if (this.gameState.visits[this.getRoomType()] && this.gameState.teachingMode) {
				this.gameState.visits[this.getRoomType()] = false;

				this.helper.show(this.getHelpText(), GameState.BOSS_PERSON);
				this.helper.setButtonText('Дальше');
				this.helper.onClick(()=>{
					this.showInstructionDialog();
				})
            }
		});

		this.onReady(() => {
			this.resetRoom();
		});
	}

	createGetManureButton() {
		const getManureButton = new LongButtonSprite(this, 5);
		getManureButton.x = 430;
		getManureButton.y = 540;

		getManureButton.onReady(()=>{
			getManureButton.setLabel('Собрать помет');
		});

		getManureButton.onClick(() => {
			this.gameState.manure += Math.floor(this.pollution * 0.5);
			this.pollution = 0;
		});

		getManureButton.forever(() => {
			if (this.pollution >= 1) {
				getManureButton.hidden = false;

			} else {
				getManureButton.hidden = true;
			}
		})
	}

	createBackButton() {
		const backButton = new BlankButtonSprite(this, 3, [
			'public/images/ui/back_button/default.png',
			'public/images/ui/back_button/hovered.png'
		]);

		backButton.layer = 10;
		backButton.x = 555;
		backButton.y = 95;
		backButton.help = 'Вернуться на главный экран';

		backButton.onClick(() => {
			if (this.helper.active) {
				this.helper.hide();
			}

			this.game.run(MonitorStage.getInstance());
		});
	}

	helpOnClick() {
		this.showInstructionDialog();
	}

	showInstructionModal() {
		showModal('Справка', this.getInstructionText(), () => this.stop(), () => this.run());
	}

	getRoomType() {
		console.error('Метод не определен.');
	}

	getRoomConfig() {
		return this.gameState.roomsConfig[this.getRoomType()];
	}

	getRoomConfigParam(paramName) {
		return this.getRoomConfig()[paramName];
	}

	getLabel() {
		return this.getRoomConfigParam('name');
	}

	getHelpText() {
		return this.getRoomConfigParam('helpText');
	}

	getInstructionText() {
		return this.getRoomConfigParam('instructionText');
	}

	getBackgroundImage() {
		return this.getRoomConfigParam('backgroundImage');
	}

	getThumbnailImages() {
		return this.getRoomConfigParam('thumbnailImages');
	}

	getShopImages() {
		return this.getRoomConfigParam('shopImages');
	}

	getCost() {
		return this.getRoomConfigParam('cost');
	}

	resetRoom() {
		this.currentQuantity = 0;
		this.isRoomReady = false;
		this.pollution = 0;
	}

	roomTick () {
		if (this.robot) {
			if (this.pollution > this.cleaningValue){
				this.pollution -= this.cleaningValue;
				this.gameState.manure += this.cleaningValue;
			} else {
				this.gameState.manure += this.pollution;
				this.pollution = 0;
			}
			this.robot.charge -= this.robotChargeDif;
			if (this.robot.charge <= 0) {
				this.robot = null;
			}
		}

		if (this.pollution >= 100) {
			this.pollution = 100;
		}
	}

	setThumbnail(thumbnailSprite) {
		this.thumbnail = thumbnailSprite;
	}

	gameTickAllRooms () {
		MonitorStage.getInstance().gameTick();
	}

	//Создает спрайты, которые задаются в SetVisCostumes() в соответствии с текущим количеством
	// параметр moving должен определять двигаются обьекты или нет (для яиц не нужно)
	visualizerSpawn() {

		if (this.isVisualized) {
			return;
		}

		this.visualiser.deleteClones();

		for (let i = 0; i < this.currentQuantity; i++) {
			let visClone = this.visualiser.createClone();
			visClone.hidden = false;
			visClone.x = this.game.getRandom(200, 400)
			visClone.y = this.game.getRandom(200, 400)
			visClone.layer = 10
			visClone.rotateStyle = 'leftRight'
			visClone.size = 150
			visClone.xSpeed = this.game.getRandom(-10, 10) / 10
			visClone.ySpeed = this.game.getRandom(-10, 10) / 10
			visClone.number = i + 1;

			let randCos = this.game.getRandom(0, this.visualiser.costumes.length)
			visClone.switchCostume(randCos)


			if (this.visualiser.moving) {

				visClone.forever(function () {

					visClone.x += visClone.xSpeed
					visClone.y += visClone.ySpeed

					if (visClone.xSpeed > 0) {
						visClone.direction = -90;
					} else {
						visClone.direction = 90;
					}

					if (visClone.x > 400) {
						visClone.xSpeed *= -1
					}

					if (visClone.x < 100) {
						visClone.xSpeed *= -1
					}

					if (visClone.y > 400) {
						visClone.ySpeed *= -1
					}

					if (visClone.y < 200) {
						visClone.ySpeed *= -1
					}

				})
			}
			visClone.forever(()=>{
				if (visClone.number > this.currentQuantity) {
					visClone.delete();
				}
			})

		}

		this.isVisualized = true;
	}

	//Перезаписать в классе комнаты, чтобы задать нужные костюмы в спрайт Visualiser
	setVisCostumes() {

	}

	showInstructionDialog() {
		this.helper.show(this.getInstructionText(), GameState.BOSS_PERSON);
		this.helper.setButtonText('Дальше');

		this.helper.onClick(()=>{
			this.helper.show(GameState.getInstance().getHeroAnswer(GameState.NORMAL_PERSON_EMOTION) + ', босс!', GameState.HERO_PERSON);
			this.helper.setButtonText('Конец');
			this.helper.onClick(()=>{this.helper.hide()});
		});
	}

	getParameters() {
		console.error('Метод не определен.');
	}

	updateHelpText() {
		const parameters = this.getParameters();

		if (!parameters.length) {
			return;
		}

		const helpText = [];

		for (const item of parameters) {
			helpText.push(item[0] + ': ' + item[1]);
		}

		this.showHelp(helpText);
	}
}
