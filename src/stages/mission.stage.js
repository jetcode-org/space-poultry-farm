import {ButtonSprite} from '../sprites/button.sprite.js';
import {AbstractSlideStageStage} from "./abstract-slide-stage.stage";
import {MonitorStage} from "./monitor.stage";
import {MenuStage} from "./menu.stage";
import {GameState} from "../services/game.state";

export class MissionStage extends AbstractSlideStageStage {
    static instance;
    textBlockHeight = 180;
    nextButtonLabel = 'Задание';

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

        this.gameState = GameState.getInstance();
    }

    init() {
        super.init();

        this.addBackground('public/images/mission_0.jpg');
        this.addBackground('public/images/mission_1.jpg');
        this.addBackground('public/images/mission_2.jpg');
        this.addBackground('public/images/mission_3.jpg');
        this.addBackground('public/images/mission_4.jpg');
        this.addBackground('public/images/mission_0.jpg');

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

    setMissionSlides(missionIndex, success, startMessage = null, finishMessage = null) {
        this.reset();
        this.switchBackground(missionIndex + 1); // "+1" костыльное исправление бага со switchBackground()

        this.slides = [];

        if (startMessage !== null) {
            this.slides.push({
                'text': startMessage
            });
        }

        const mission = this.gameState.missions[missionIndex];
        if (mission !== undefined) {
            const resultMessage = success ? mission['success'] : mission['fail'];
            if (resultMessage !== undefined) {
                this.slides.push({
                    'text': resultMessage
                });
            }
        }

        const nextMissionIndex = missionIndex + 1;
        const nextMission = this.gameState.missions[nextMissionIndex];
        if (nextMission !== undefined) {
            this.slides.push({
                'text': nextMission['task']
            });

        } else {
            this.startButton.onClick(this.restartGame.bind(this));
        }

        if (finishMessage !== null) {
            this.slides.push({
                'text': finishMessage
            });
        }
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
