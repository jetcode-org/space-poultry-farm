import {Sprite, Stage} from 'jetcode-scrubjs';
import {GameState} from "../services/game.state";
import {HelperSprite } from "../sprites/helper.sprite.js";
import {FpsCounterSprite} from "../sprites/fps-counter.sprite";

export class AbstractStage extends Stage {
	init() {
		// панель для ресурсов
		this.mainResousesPanel = new Sprite();
		this.mainResousesPanel.addCostume('public/images/icons/top_panel_base.png')
		this.mainResousesPanel.y = 550
		this.mainResousesPanel.leftX = 300
		this.mainResousesPanel.size = 70
		this.mainResousesPanel.layer = 9

		// сами иконки ресурсов
		this.egs = new Sprite()
		this.egs.addCostume('public/images/icons/resources/egg.png')
		this.egs.x = 50
		this.egs.y = 550
		this.egs.size = 90
		this.egs.layer = 10

		this.chick = new Sprite()
		this.chick.addCostume('public/images/icons/resources/small_chicken.png')
		this.chick.x = 120
		this.chick.y = 550
		this.chick.size = 90
		this.chick.layer = 10

		this.chicken = new Sprite()
		this.chicken.addCostume('public/images/icons/resources/chicken.png')
		this.chicken.x = 190
		this.chicken.y = 550
		this.chicken.size = 90
		this.chicken.layer = 10

		this.eat = new Sprite()
		this.eat.addCostume('public/images/icons/resources/eat.png')
		this.eat.x = 260
		this.eat.y = 550
		this.eat.size = 90
		this.eat.layer = 10

		this.shit = new Sprite()
		this.shit.addCostume('public/images/icons/resources/shit.png')
		this.shit.x = 350
		this.shit.y = 550
		this.shit.size = 90
		this.shit.layer = 10

		this.crash = new Sprite()
		this.crash.addCostume('public/images/icons/resources/crash.png')
		this.crash.x = 420
		this.crash.y = 550
		this.crash.size = 90
		this.crash.layer = 10

		this.pen(this.drawParameters.bind(this), 10);

		this.helper = new HelperSprite();
		this.helper.onClick(this.helper.hide);

		if (this.game.showFps) {
			this.createFpsCounter();
		}
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

	drawParameters(context) {
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

	createFpsCounter() {
		const fpsCounter = new FpsCounterSprite(this, 10);
		fpsCounter.x = 720;
		fpsCounter.y = 545;
	}
}
