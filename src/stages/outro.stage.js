import {Stage} from 'jetcode-scrubjs';

import {ButtonSprite} from '../sprites/button.sprite.js';
import {AbstractSlideStageStage} from "./abstract-slide-stage.stage";
import {MonitorStage} from "./monitor.stage";

export class OutroStage extends AbstractSlideStageStage {
    static instance;
    textBlockHeight = 160;

    slides = [
        {
            'text': 'Поздравляем! Ты победил финального босса - древний баг уничтожен! Благодаря твоей смелости и ловкости, SuperCrub смог выбраться из подземелья и сделать первый шаг к своей судьбе супергероя.'
        },
        {
            'text': 'Это только начало великого приключения. Теперь наш герой знает, что сила и отвага рождаются в борьбе с трудностями. Впереди - новые испытания и великие свершения во вселенной ScrubJS!'
        },
        {
            'text': 'Спасибо, что прошёл этот путь вместе с SuperCrub. Следи за новостями - впереди ещё много интересных историй и новых игр на ScrubJS! Не забудь поделиться своими впечатлениями и проголосовать за нашу игру в Практикуме.'
        },
    ];

    static getInstance() {
        if (!OutroStage.instance) {
            OutroStage.instance = new OutroStage();
        }

        return OutroStage.instance;
    }

    constructor() {
        super();

        if (OutroStage.instance) {
            throw new Error('OutroStage class: use getInstance() method instead.');
        }
    }

    init() {
        super.init();

        this.addBackground('public/images/outro.jpg');

        this.startButton = new ButtonSprite();
        this.startButton.layer = 4;
        this.startButton.minSize = 90;
        this.startButton.maxSize = 110;
        this.startButton.x = 80;
        this.startButton.y = this.height - 30;
        this.startButton.hidden = true;
        this.startButton.onClick(this.runGame.bind(this));

        this.startButton.onReady(() => {
            this.startButton.setLabel('Еще раз', 'white', 70);
        });
    }

    onNextSlide() {
        if (this.currentSlide === this.slides.length - 1) {
            this.nextButton.hidden = true;
            this.startButton.hidden = false;
        }
    }

    runGame() {
        const monitorStage = MonitorStage.getInstance();
        monitorStage.restartGame();

        this.game.run(monitorStage);
    }
}
