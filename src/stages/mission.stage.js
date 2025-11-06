import {Stage} from 'jetcode-scrubjs';

import {ButtonSprite} from '../sprites/button.sprite.js';
import {AbstractSlideStageStage} from "./abstract-slide-stage.stage";
import {MonitorStage} from "./monitor.stage";
import {MenuStage} from "./menu.stage";

export class MissionStage extends AbstractSlideStageStage {
    static instance;
    textBlockHeight = 180;
    nextButtonLabel = 'Задание';
    missions = [
        'Планета: Марс-7 (Агрикультурный сектор). Доставьте 300 яиц первой партии для обеспечения белком научной колонии. Ученые проводят эксперименты по адаптации земной флоры и фауны к марсианским условиям. Ваш груз станет основой для создания устойчивой экосистемы',
        'Планета: Аквария (Водный мир). Требуется 450 яиц для плавучих городов-архипелагов. Местное население страдает от дефицита белка из-за ограниченности земельных ресурсов. Ваш груз поможет стабилизировать пищевую ситуацию на планете.',
        'Планета: Гелиос-Прайм (Приполярная зона). Срочно доставьте 600 яиц в криогенной упаковке для полярных исследовательских станций. Экстремальные температуры требуют особых условий транспортировки и максимальной свежести продукции.',
        'Планета: Терра-Нова (Землеподобный мир). Финальная миссия - 1000 яиц для восстановления биосферы после экологической катастрофы. Ваш вклад поможет реанимировать планетарную экосистему и дать начало новой цивилизации.',
    ];

    static getInstance() {
        if (!MissionStage.instance) {
            MissionStage.instance = new MissionStage();
        }

        return MissionStage.instance;
    }

    constructor() {
        super();

        if (MissionStage.instance) {
            throw new Error('MissionStage class: use getInstance() method instead.');
        }
    }

    init() {
        super.init();

        this.addBackground('public/images/mission.jpg');

        this.startButton = new ButtonSprite();
        this.startButton.layer = 4;
        this.startButton.minSize = 90;
        this.startButton.maxSize = 110;
        this.startButton.x = this.width - 80;
        this.startButton.y = this.height - 30;
        this.startButton.hidden = true;
        this.startButton.onClick(this.runGame.bind(this));

        this.startButton.onReady(() => {
            this.startButton.setLabel('Принято!');
        });
    }

    setMissionSlides(missionIndex, resultText, finishText = null) {
        this.reset();

        if (finishText !== null) {
            this.missions.push(finishText);

            this.startButton.onClick(this.restartGame.bind(this));
        }

        const missionText = this.missions[missionIndex];

        this.slides = [
            {
                'text': resultText
            },
            {
                'text': missionText
            },
        ];
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

    restartGame() {
        MonitorStage.getInstance().restartGame();
        this.game.run(MenuStage.getInstance());
    }
}
