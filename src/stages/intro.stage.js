import {Stage} from 'jetcode-scrubjs';

import {ButtonSprite} from '../sprites/button.sprite.js';
import {AbstractSlideStageStage} from "./abstract-slide-stage.stage";
import {MonitorStage} from "./monitor.stage";

export class IntroStage extends AbstractSlideStageStage {
    static instance;

    slides = [
        {
            'text': '2451 год, корпорация ТАВРОС отправляет груз с замороженными яйцами на Альфа-Центавра Проксима-b.'
        },
        {
            'text': 'Через 15 лет осмический грузовик сталкивается с астероидом и часть груза оказывается поврежденным...'
        },
        {
            'text': 'Ваша задача, управляя удаленно базовым функционалом систем корабля восстановить груз, до прилета к цели...'
        },
        {
            'text': 'Восстановите замороженный груз и да, удачи, инженер!'
        },
    ];

    static getInstance() {
        if (!IntroStage.instance) {
            IntroStage.instance = new IntroStage();
        }

        return IntroStage.instance;
    }

    constructor() {
        super();

        if (IntroStage.instance) {
            throw new Error('IntroStage class: use getInstance() method instead.');
        }
    }

    init() {
        super.init();

        this.addBackground('public/images/menu/menu_bg_sprite.jpg');

        this.startButton = new ButtonSprite();
        this.startButton.layer = 4;
        this.startButton.minSize = 1000;
        this.startButton.maxSize = 1100;
        this.startButton.x = this.width - 80;
        this.startButton.y = this.height - 30;
        this.startButton.hidden = true;
        this.startButton.onClick(this.runGame.bind(this));

        this.startButton.onReady(() => {
            this.startButton.setLabel('Играть');
        });
    }

    onNextSlide() {
        if (this.currentSlide === this.slides.length - 1) {
            this.nextButton.hidden = true;
            this.startButton.hidden = false;
        }
    }

    runGame() {
        this.game.run(MonitorStage.getInstance());
    }
}
