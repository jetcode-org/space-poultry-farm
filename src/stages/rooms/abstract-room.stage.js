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

	init() {
		this.gameState = GameState.getInstance();
      
		this.onReady(()=>{
			this.monitorStage = MonitorStage.getInstance();
		})

		this.addBackground('public/images/background_main_monitor.png');

		//let shipSchemeSprite = new Sprite()
		//shipSchemeSprite.addCostume('public/images/menu/main_screen.jpg')


		this.backgroundSprite = new Sprite();
		this.backgroundSprite.addCostume(this.getBackgroundImage());
		this.backgroundSprite.layer = 1;
		this.backgroundSprite.x = 300;
		this.backgroundSprite.y = 300
		this.backgroundSprite.filter = 'grayscale(100%)';

		this.createBackButton();
		this.createActivateButton();
		this.createGetManureButton();

		this.forever(this.gameTickAllRooms, 1000);

		this.pen(this.drawTextBlock.bind(this), 3);

		this.visualiser = new Sprite();
		this.setVisCostumes();
		this.visualiser.hidden = true;

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
			getManureButton.setLabel('Собрать помет', undefined, 6);
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
		backButton.layer = 3;
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
		this.activateButton.layer = 3;
		this.activateButton.x = 250;
		this.activateButton.y = 400;

		this.activateButton.onReady(()=>{
			this.activateButton.setLabel('Актив.');
		});

		this.activateButton.onClick(() => {
			this.activate();
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
		if (this.pollution >= 100) 
			this.pollution = 100;
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

	visualizerSpawn() {
		this.visualiser.deleteClones();

		for (let i = 0; i < this.currentQuantity; i++) {
			let visClone = this.visualiser.createClone();
			visClone.hidden = false;
			visClone.x = this.game.getRandom(200, 400)
			visClone.y = this.game.getRandom(200, 400)
			visClone.layer = 10
			visClone.rotateStyle = 'leftRight'
			visClone.xSpeed = this.game.getRandom(-10, 10) / 10
			visClone.ySpeed = this.game.getRandom(-10, 10) / 10
			visClone.size = 150

			let randCos = this.game.getRandom(0, this.visualiser.costumes.length)
			visClone.switchCostume(randCos)

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

	setVisCostumes() {

	}
}
