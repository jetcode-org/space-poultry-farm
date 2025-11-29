import {ButtonSprite} from '../sprites/button.sprite.js';
import {AbstractSlideStageStage} from "./abstract-slide-stage.stage";
import {MonitorStage} from "./monitor.stage";
import {MenuStage} from "./menu.stage";
import {GameState} from "../services/game.state";
import { OutroStage } from './outro.stage.js';

export class MissionStage extends AbstractSlideStageStage {
    static instance;
    textBlockHeight = 180;
    nextButtonLabel = 'Задание';
    isTheEnd = false;

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

        this.addBackground('public/images/missions/mission_0.png');
        this.addBackground('public/images/missions/mission_1.png');
        this.addBackground('public/images/missions/mission_2.png');
        this.addBackground('public/images/missions/mission_3.png');
        this.addBackground('public/images/missions/mission_4.png');
        this.addBackground('public/images/missions/mission_0.png');

        this.onStart(()=>{
            this.drawTextBlock();
            this.helper.fontSize = 18;
            this.helper.onClick(()=>{
                this.nextSlide();
            });
        })
    }

    setMissionSlides(missionIndex, success, soldEggs = null, earnedMoney = null, changeRating = null, startMessages = null, finishMessages = null) {
        this.reset();
        this.switchBackground(missionIndex + 1); // "+1" костыльное исправление бага со switchBackground()

        this.slides = [];

        if (startMessages !== null) {
            for(const startMessage of startMessages)
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

        if (soldEggs !== null && earnedMoney !== null && changeRating !== null) {
            let resultMessage = 'Мы продали: ' + soldEggs + ' яиц и заработали ' + earnedMoney + '₽. ';

            if (changeRating > 0) {
                resultMessage += 'Наш рейтинг увеличился на ' + changeRating + '.';

            } else if (changeRating < 0) {
                resultMessage += 'Наш рейтинг уменьшился на ' + changeRating + '.';

            } else {
                resultMessage += 'Это не повлияло на наш рейтинг.';
            }

            this.slides.push({
                'text': resultMessage
            });
        }

        const nextMissionIndex = missionIndex + 1;
        const nextMission = this.gameState.missions[nextMissionIndex];
        if (nextMission !== undefined) {
            this.slides.push({
                'text': nextMission['task']
            });
            this.isTheEnd = false;

        } else {
            this.isTheEnd = true;

        }

        if (finishMessages !== null) {
            for (const finishMessage of finishMessages) {
                this.slides.push({
                    'text': finishMessage
                });
            }
        }
    }

    onNextSlide() {
        if (this.currentSlide === this.slides.length - 1) {
            if (this.isTheEnd) {
                this.helper.onClick(()=>{
                    OutroStage.getInstance().setResult(this.gameState.successfulCompletedMissions >= 3)
                    this.game.run(OutroStage.getInstance())
                    this.helper.hide();
                });
            }
            else {
                this.helper.onClick(()=>{
                    this.runGame();
                    this.helper.hide();
                });
            }
            this.helper.setButtonText('Принято');
        } else {
            this.helper.onClick(this.nextSlide.bind(this));
            this.helper.setButtonText('Дальше');
        }
        this.drawTextBlock();
    }

    runGame() {
        this.game.run(MonitorStage.getInstance());
    }

    restartGame() {
        MonitorStage.getInstance().restartGame();
        this.game.run(MenuStage.getInstance());
    }
}
