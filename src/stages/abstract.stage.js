import {Sprite, Stage} from 'jetcode-scrubjs';
import {HelperSprite } from "../sprites/helper.sprite.js";
import {FpsCounterSprite} from "../sprites/fps-counter.sprite";
import {BlankButtonSprite} from "../sprites/blank-button.sprite";
import {LicenceProgressBarSprite} from '../sprites/licence-progress-bar.sprite.js';
import {HelpSprite} from "../sprites/help.sprite";

export class AbstractStage extends Stage {
	helpText = null;
	helpTextLifetime = 0;

	init() {
		this.createCounters();
		this.createPause();
		this.createHelp();

		this.helper = new HelperSprite();
		this.helper.onClick(this.helper.hide);

		if (this.game.showFps) {
			this.createFpsCounter();
		}

		//ПрогрессБар для лицензии (пока что регулируется с помощью a и d)
        this.licenceProgress = new LicenceProgressBarSprite();
        this.licenceProgress.x = 246;
        this.licenceProgress.y = 40;
        this.licenceProgress.layer = 3;
        this.licenceProgress.thickness = 16;
        this.licenceProgress.triangleWidth = 8;
        this.licenceProgress.setWidth(76);

		this.forever(()=>{
			this.licenceProgress.targetValue = this.gameState.rating;
		});

		this.pen(this.drawHelpBlock.bind(this), 4);
	}

	drawHelpBlock(context) {
		context.font = '14px Arial';
		context.fillStyle = 'white';
		context.textAlign = 'left';

		this.helpTextLifetime--;
		if (this.helpTextLifetime <= 0) {
			this.helpText = null;
		}

		let helpText = 'Наведите курсор мыши на игровой элемент для получения подробной информации';
		context.fillStyle = '#c0c0c0';

		if (this.helpText) {
			context.fillStyle = 'white';
			helpText = this.helpText;
		}

		let y = 195;
		if (Array.isArray(helpText)) {
			const yStep = 22;
			for (const item of helpText) {
				this.drawMultilineText(context, item, 620, y, 155, 20);

				y += yStep;
			}
		} else {
			this.drawMultilineText(context, helpText, 620, y, 155, 20);
		}
	}

	showHelp(text, lifetime = 10) {
		this.helpText = text;
		this.helpTextLifetime = lifetime;
	}

	createCounters() {
		// Деньги
		const money = new HelpSprite(this, 3, ['public/images/ui/money.png']);
		money.x = 90;
		money.y = 40;
		money.help = 'Космические кредиты: валюта для строительства новых модулей и улучшения существующих';

		// Рейтинг
		const rating = new HelpSprite(this, 3, ['public/images/ui/rating.png']);
		rating.x = 230;
		rating.y = 40;
		rating.help = 'Статус в Галактическом Совете: оценивается по эффективности, качеству продукции и выполнению миссий.';

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
		const egg = new HelpSprite(this, 4, ['public/images/ui/resources/egg.png']);
		egg.x = 627;
		egg.y = 463;
		egg.help = 'Криогенные запасы: яйца для выполнения миссий';

		const eggQuality = new HelpSprite(this, 3, ['public/images/ui/resources/egg_quality.png']);
		eggQuality.x = 710;
		eggQuality.y = 463;
		eggQuality.help = 'Качество яиц: зависит от условий содержания кур. Высокое качество увеличивает стоимость';

		const chick = new HelpSprite(this, 3, ['public/images/ui/resources/chick.png']);
		chick.x = 627;
		chick.y = 496;
		chick.help = 'Цыплята: молодые особи, будущие куры-несушки';

		const chicken = new HelpSprite(this, 3, ['public/images/ui/resources/chicken.png']);
		chicken.x = 710;
		chicken.y = 496;
		chicken.help = 'Основное стадо: производители яиц';

		const food = new HelpSprite(this, 3, ['public/images/ui/resources/feed.png']);
		food.x = 627;
		food.y = 529;
		food.help = 'Комбикорм: основной рацион птицы';

		const shit = new HelpSprite(this, 3, ['public/images/ui/resources/shit.png']);
		shit.x = 710;
		shit.y = 529;
		shit.help = 'Помет: производится курами. Используется для создания корма на ферме';

		const pollution = new HelpSprite(this, 3, ['public/images/ui/resources/pollution.png']);
		pollution.x = 627;
		pollution.y = 562;
		pollution.help = 'Уровень загрязнения: при высоком уровне снижает яйценоскость и здоровье птицы';

		const eggshell = new HelpSprite(this, 3, ['public/images/ui/resources/eggshell.png']);
		eggshell.x = 710;
		eggshell.y = 562;
		eggshell.help = 'Скорлупа: остается после инкубации. Используется в производстве корма';

		this.pen((context) => {
			context.font = '18px Arial';
			context.fillStyle = 'white';
			context.textAlign = 'start';

			// Деньги и Рейтинг
			context.font = 'bold 15px Arial';

			context.fillText(this.gameState.getFormattedMoney(this.gameState.money), money.x - 15, money.y + 5);

			context.lineWidth = 2;
			context.strokeStyle = 'black';
			context.strokeText(this.gameState.rating, rating.x, rating.y + 5); // Сначала обводка
			context.fillText(this.gameState.rating, rating.x, rating.y + 5);

			// Цель
			const currentMission = this.gameState.currentMission;
			const mission = this.gameState.missions[currentMission];

			if (mission) {
				context.font = 'bold 18px Arial';

				// context.fillText('Планета: ' + mission['name'], 70, 380)
				context.fillText('Цель: ' + mission['eggQuota'] + ' яиц', topPanel.x - 70, topPanel.y - 10);
				context.fillText('Таймер: ' + (mission['distance'] - this.gameState.passedTime) + ' с', topPanel.x - 70, topPanel.y + 20);
			}

			// Справка
			context.font = 'bold 16px Arial';
			context.fillText('Информация', referencePanel.x - 81, referencePanel.y - 87)

			// Ресурсы
			context.font = 'bold 12px Arial';
			context.fillStyle = '#9da8b0';

			context.fillText(this.gameState.frozenEggs + ' шт.', egg.x + 18, egg.y + 6);
			context.fillText(this.gameState.getEggQualityClass() + ' (+' +  this.gameState.getEggQualityCost() + '₽)' , eggQuality.x + 18, eggQuality.y + 6);
			context.fillText(this.gameState.chick + ' шт.', chick.x + 18, chick.y + 6);
			context.fillText(this.gameState.chicken + ' шт.', chicken.x + 18, chicken.y + 6);
			context.fillText(this.gameState.food.toFixed(1), food.x + 18, food.y + 6);
			context.fillText(this.gameState.manure, shit.x + 18, shit.y + 6);
			context.fillText(this.gameState.pollution + ' %.', pollution.x + 18, pollution.y + 6);
			context.fillText(this.gameState.eggshell + ' шт.', eggshell.x + 18, eggshell.y + 6);
		}, 10);
	}

	createPause() {
		const pauseButton = new BlankButtonSprite(this, 3, [
			'public/images/ui/pause_button/default.png',
			'public/images/ui/pause_button/hovered.png'
		]);
		pauseButton.x = 555;
		pauseButton.y = 40;
		pauseButton.help = 'Приостановить игру';

		pauseButton.onClick(() => {
			showModal('Пауза', 'Игра временно приостановлена', () => this.stop(), () => this.run());
		});
	}

	createHelp() {
		const helpButton = new BlankButtonSprite(this, 3, [
			'public/images/ui/help_button/default.png',
			'public/images/ui/help_button/hovered.png'
		]);
		helpButton.x = 778;
		helpButton.y = 355;
		helpButton.help = 'Открыть руководство оператора';

		helpButton.onClick(this.helpOnClick.bind(this));
	}

	helpOnClick() {
		showModal('Помощь', 'Помощь', () => this.stop(), () => this.run());
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

	createFpsCounter() {
		const fpsCounter = new FpsCounterSprite(this, 10);
		fpsCounter.x = 730;
		fpsCounter.y = 596;
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
