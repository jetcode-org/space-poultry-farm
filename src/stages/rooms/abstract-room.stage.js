import {Sprite, Stage} from 'jetcode-scrubjs';
import {ButtonSprite} from "../../sprites/button.sprite";
import {MonitorStage} from "../monitor.stage";
import {AbstractStage} from "../abstract.stage";
import {GameState} from "../../services/game.state";

export class AbstractRootStage extends AbstractStage {
	active = false;
	thumbnail;
	pollution = 0;
	isRoomReady = false;
	tickMaxCount = 5;
	tickCount = 0;
	maxQuantity = 20;
	currentQuantity = 0;

	cleaningValue = 5;
	robot = null;
	robotChargeDif = 0;

	isCleaningByRobot = false;

	init() {
		super.init()
		this.gameState = GameState.getInstance();

		this.onReady(()=>{
			this.monitorStage = MonitorStage.getInstance();
		})

		this.addBackground('public/images/background_main_monitor.png');
		this.addSound('public/sounds/ready.mp3', 'ready');
		this.addSound('public/sounds/activation.mp3', 'activation');

		this.bgSpace = new Sprite()
		this.bgSpace.addCostume('public/images/rooms/background_space.png')
		this.bgSpace.leftX = 300;
		this.bgSpace.layer = 3;

		this.bgStar = new Sprite();
		this.bgStar.addCostume('public/images/rooms/star.png');
		this.bgStar.hidden = true;

		this.backgroundSprite = new Sprite();
		this.backgroundSprite.addCostume(this.getBackgroundImage());
		this.backgroundSprite.layer = 5;
		this.backgroundSprite.x = 300;
		this.backgroundSprite.y = 300
		this.backgroundSprite.filter = 'grayscale(100%)';

		this.createBackButton();
		this.createActivateButton();
		this.createGetManureButton();

		this.forever(this.gameTickAllRooms, 1000);

		this.pen(this.drawTextBlock.bind(this), 10);


		this.visualiser = new Sprite();
		this.setVisCostumes();
		this.visualiser.hidden = true;
		this.visualiser.moving = true;

		this.forever(this.spawStars, 2)

		this.onStart(() => {
			this.visualizerSpawn();

		})
	}


	createGetManureButton() {
		const getManureButton = new ButtonSprite();
		getManureButton.layer = 3;
		getManureButton.x = 690;
		getManureButton.y = 400;

		getManureButton.onReady(()=>{
			getManureButton.setLabel('Собрать помет', undefined, 70);
		});

		getManureButton.onClick(() => {
			this.gameState.manure += Math.floor(this.pollution * 0.5);
			this.pollution = 0;
		});

		getManureButton.forever(() => {
			if (this.pollution >= 1)
			getManureButton.hidden = false;
			else
			getManureButton.hidden = true;
		})
	}
	createBackButton() {
		const backButton = new ButtonSprite();
		backButton.layer = 10;
		backButton.x = 690;
		backButton.y = 130;

		backButton.onReady(()=>{
			backButton.setLabel('Назад');
		});

		backButton.onClick(() => {
			this.game.run(MonitorStage.getInstance());
		});
	}

	createActivateButton() {
		this.activateButton = new ButtonSprite();
		this.activateButton.layer = 10;
		this.activateButton.x = 250;
		this.activateButton.y = 400;

		this.activateButton.onReady(()=>{
			this.activateButton.setLabel('Актив.');
		});

		this.activateButton.onClick(() => {
			this.activate();
			this.playSound('activation');
		});
	}

	getLabel() {
		console.error('Метод не определен.');
	}

	getBackgroundImage() {
		console.error('Метод не определен.');
	}

	getThumbnailImage() {
		console.error('Метод не определен.');
	}

	resetRoom() {

	}

	roomTick () {
		if (this.robot) {
			this.pollution -= this.cleaningValue;
			this.robot.charge -= this.robotChargeDif;
			if (this.robot.charge <= 0) {
				this.robot = null;
			}
			if (this.pollution <= 0) {
				this.pollution = 0;
			}
		}
		if (this.pollution >= 100) {
			this.pollution = 100;
		}
	}

	setThumbnail(thumbnailSprite) {
		this.thumbnail = thumbnailSprite;
	}

	activate() {
		if (this.active) {
			return;
		}

		this.active = true;

		this.backgroundSprite.filter = 'grayscale(0)';
		this.activateButton.hidden = true;
		this.gameState.chargeValue = 0;

		if (this.thumbnail) {
			this.thumbnail.activate();
		}
	}

	gameTickAllRooms () {
		MonitorStage.getInstance().gameTick();
	}

	drawTextBlock(context) {
		if (this.active) {
			return false;
		}

		if (this.activateButton && this.gameState.isEnoughCharge()) {
			this.activateButton.hidden = false;

		} else {
			this.activateButton.hidden = true;
		}

		context.fillStyle = "rgba(0, 0, 0, 0.5)";
		context.fillRect(100, 150, 400, 300);

		context.font = '18px Arial';
		context.fillStyle = 'white';
		context.textAlign = 'start';

		const text = 'В данный момент отсек обесточен. Он не работает';

		this.drawMultilineText(context, text, 120, 200, 350, 30);

	}

	//Создает спрайты, которые задаются в SetVisCostumes() в соответствии с текущим количеством
	// параметр moving должен определять двигаются обьекты или нет (для яиц не нужно)
	visualizerSpawn() {

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

		}
	}

	//Перезаписать в классе комнаты, чтобы задать нужные костюмы в спрайт Visualiser
	setVisCostumes() {

	}

	spawStars() {
		let c = this.bgStar.createClone();
		c.x =  575;
		c.y = this.game.getRandom(30, 570);
		c.layer = 4;
		c.size = this.game.getRandom(50, 100);
		c.hidden = false

		c.forever(function() {
			c.x -= c.size / 20

			if(c.x < 30) {
				c.delete()
			}
		})

	}

}
