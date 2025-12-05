import {Stage} from 'jetcode-scrubjs';

import {ButtonSprite} from '../sprites/button.sprite.js';
import {AbstractSlideStageStage} from "./abstract-slide-stage.stage";
import {MonitorStage} from "./monitor.stage";
import {GameState} from "../services/game.state";

export class IntroStage extends AbstractSlideStageStage {
    static instance;

    slides = [
        {
            'text': 'Что появилось первым, яйцо или курица?...'
        },
        {
            'text': 'Извечный вопрос без ответа. Но для вас ответ есть...'
        },
        {
            'text': 'это..'
        },
        {
            'text': 'ЯЙЦО!'
        },
        {
            'text': 'Да, вот так всё странно.. Смиритесь с этим, прочтите лор игры и сразу всё поймёте!'
        },
        {
            'text': '2451 год, корпорация ТАВРОС отправляет груз с замороженными яйцами на Альфа-Центавра Проксима-b. '
        },
        {
            'text': 'На пути есть еще четые планеты, в которые нужно доставить груз '
        },
        {
            'text': 'Через 15 лет космический грузовик сталкивается с астероидом и часть груза оказывается поврежденным...'
        },
        {
            'text': 'Чтобы выполнить миссию, системы корабля оживают и были приспособлены восстановить популяцию куриц.'
        },
        {
            'text': 'Затем вам нужно замораживать яйца и пополнять склады корабля, чтобы выполнить квоты заказчика.'
        },
        {
            'text': 'Ваша задача, управляя удаленно базовым функционалом систем корабля, восстановить груз до прилета к цели...'
        },
        {
            'text': 'И да, удачи, инженер!'
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

        this.addBackground('public/images/intro/background.png');
    }

    onNextSlide() {
        if (this.currentSlide === this.slides.length - 1) {
            this.helper.onClick(()=>{
                this.runGame();
                this.helper.hide();
            });
            this.helper.setButtonText('Играть');
        } else {
            this.helper.onClick(this.nextSlide.bind(this));
            this.helper.setButtonText('Дальше');
        }
        this.drawTextBlock();

    }

    runGame() {
        this.reset();
        this.game.run(MonitorStage.getInstance());
    }
}
