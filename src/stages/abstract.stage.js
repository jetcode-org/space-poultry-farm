import {Sprite, Stage} from 'jetcode-scrubjs';
import {GameState} from "../services/game.state";
import {HelperSprite } from "../sprites/helper.sprite.js";
import {FpsCounterSprite} from "../sprites/fps-counter.sprite";
import {BlankButtonSprite} from "../sprites/blank-button.sprite";

export class AbstractStage extends Stage {
	init() {
		this.createCounters();
		this.createPause();

		this.helper = new HelperSprite();
		this.helper.onClick(this.helper.hide);

		if (this.game.showFps) {
			this.createFpsCounter();
		}
	}

	createCounters() {
		// Деньги
		const money = new Sprite(this, 3, ['public/images/ui/money.png']);
		money.x = 90;
		money.y = 40;

		// Рейтинг
		const rating = new Sprite(this, 3, ['public/images/ui/rating.png']);
		rating.x = 230;
		rating.y = 40;

		// Панель цель и таймер
		const topPanel = new Sprite(this, 3, ['public/images/ui/top_panel.png']);
		topPanel.x = 693;
		topPanel.y = 68;

		// Панель справка
		const referencePanel = new Sprite(this, 3, ['public/images/ui/reference_panel.png']);
		referencePanel.x = 700;
		referencePanel.y = 250;

		// Панель для ресурсов
		const resourcesPanel = new Sprite(this, 3, ['public/images/ui/resources_panel.png']);
		resourcesPanel.x = 695
		resourcesPanel.y = 512

		// Иконки ресурсов
		const egg = new Sprite(this, 4, ['public/images/ui/resources/egg.png']);
		egg.x = 627;
		egg.y = 463;

		const eggQuality = new Sprite(this, 3, ['public/images/ui/resources/egg_quality.png']);
		eggQuality.x = 710;
		eggQuality.y = 463;

		const chick = new Sprite(this, 3, ['public/images/ui/resources/chick.png']);
		chick.x = 627;
		chick.y = 496;

		const chicken = new Sprite(this, 3, ['public/images/ui/resources/chicken.png']);
		chicken.x = 710;
		chicken.y = 496;

		const food = new Sprite(this, 3, ['public/images/ui/resources/feed.png']);
		food.x = 627;
		food.y = 529;

		const shit = new Sprite(this, 3, ['public/images/ui/resources/shit.png']);
		shit.x = 710;
		shit.y = 529;

		const pollution = new Sprite(this, 3, ['public/images/ui/resources/pollution.png']);
		pollution.x = 627;
		pollution.y = 562;

		const eggshell = new Sprite(this, 3, ['public/images/ui/resources/eggshell.png']);
		eggshell.x = 710;
		eggshell.y = 562;

		this.pen((context) => {
			context.font = '18px Arial';
			context.fillStyle = 'white';
			context.textAlign = 'start';


			// Деньги и Рейтинг
			context.font = 'bold 15px Arial';
			context.fillText(this.gameState.money + '$', money.x - 15, money.y + 5);
			context.fillText(this.gameState.rating, rating.x, rating.y + 5);

			// Цель
			const currentMission = this.gameState.currentMission;
			const mission = this.gameState.missions[currentMission];

			if (mission) {
				context.font = 'bold 18px Arial';

				// context.fillText('Планета: ' + mission['name'], 70, 380)
				context.fillText('Цель: ' + mission['eggQuota'] + ' яиц', topPanel.x - 70, topPanel.y - 10)
				context.fillText('Таймер: ' + (mission['distance'] - this.gameState.passedTime) + ' с', topPanel.x - 70, topPanel.y + 20)
			}

			// Справка
			context.font = 'bold 18px Arial';
			context.fillText('Справка', referencePanel.x - 90, referencePanel.y - 87)


			context.fillText('Качество яйца: ' + this.gameState.getEggQualityClass() + ' (+' +  this.gameState.getEggQualityCost() + '$)' , 320, 460);

			context.fillText(GameState.getInstance().frozenEggs, 70, 555);
			context.fillText(GameState.getInstance().chick, 140, 555);
			context.fillText(GameState.getInstance().chicken, 210, 555);
			context.fillText(GameState.getInstance().food.toFixed(1), 280, 555);
			context.fillText(GameState.getInstance().manure, 370, 555);
			context.fillText(GameState.getInstance().eggshell, 440, 555);
		}, 10);
	}

	createPause() {
		const pauseButton = new BlankButtonSprite(this, 3, [
			'public/images/ui/pause_button/default.png',
			'public/images/ui/pause_button/hovered.png'
		]);
		pauseButton.x = 555;
		pauseButton.y = 40;

		pauseButton.onClick(() => {
			showModal('Пауза', () => this.stop(), () => this.run());
		});
	}

    drawMultilineText(context, text, x, y, maxWidth, lineHeight) {
        const words = text.split(' ');
        let line = '';
        let testLine = '';
        let lineArray = [];


        for (let n = 0; n < words.length; n++) {
            testLine = line + words[n] + ' ';
            const metrics = context.measureText(testLine);
            const testWidth = metrics.width;

            if (testWidth > maxWidth && n > 0) {
                lineArray.push(line.trim());
                line = words[n] + ' ';
            } else {
                line = testLine;
            }
        }
        lineArray.push(line.trim());

        for (let i = 0; i < lineArray.length; i++) {
            context.fillText(lineArray[i], x, y + i * lineHeight);
        }
    }
    // хз как это вызывать, отсюда напишу пока в монитор стрейжд
    drawResoursesPanel() {
        let mainResPanel = new Sprite()
        mainResPanel.addCostume('public/images/icons/top_panel_base.png')
	}

	drawCounters(context) {
		context.font = '18px Arial';
		context.fillStyle = '#4444ff';
		context.textAlign = 'start';

		// показатели на панели ресурсов у иконок
		context.fillText(GameState.getInstance().frozenEggs, 70, 555);
		context.fillText(GameState.getInstance().chick, 140, 555);
		context.fillText(GameState.getInstance().chicken, 210, 555);
		context.fillText(GameState.getInstance().food.toFixed(1), 280, 555);
		context.fillText(GameState.getInstance().manure, 370, 555);
		context.fillText(GameState.getInstance().eggshell, 440, 555);
	}

	drawParameters() {

	}

	createFpsCounter() {
		const fpsCounter = new FpsCounterSprite(this, 10);
		fpsCounter.x = 720;
		fpsCounter.y = 545;
	}

	createStars() {
		this.bgStar = new Sprite(this, 0);
		this.bgStar.addCostume('public/images/rooms/star.png');
		this.bgStar.hidden = true;

		this.forever(this.spawnStars, 2);
	}

	spawnStars() {
		const star = this.bgStar.createClone();
		star.layer = 0;
		star.x =  575;
		star.y = this.game.getRandom(30, 570);
		star.size = this.game.getRandom(50, 100);
		star.hidden = false

		star.forever(function() {
			star.x -= star.size / 20

			if(star.x < 30) {
				star.delete()
			}
		})
	}
}
