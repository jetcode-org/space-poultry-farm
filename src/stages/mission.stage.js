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

    bossFinalMessages = [
        'Удачи, инженер!',
        'Успехов в выполнении!',
        'Желаю удачной смены!',
        'Пусть все системы работают исправно!',
        'Надеюсь на вашу эффективность!',
        'Удачного управления фермой!',
        'Счастливого пути по коридорам станции!',
        'Покажите, на что способен лучший инженер!',
        'Звезды ждут ваших успехов!',
        'Колонисты надеются на вас!',
        'Сделайте этот день продуктивным!',
        'Ваш труд приближает будущее!',
        'Каждое яйцо - шаг к освоению космоса!',
        'Запускайте производство на полную!',
        'Превратите эту ферму в образец эффективности!',
        'Пусть ваши решения будут безупречны!',
        'Докажите, что человек и машина - идеальная команда!',
        'Пусть КПД стремится к максимуму!',
        'Возвращайся с хорошими новостями!',
        'Пусть помет летит только в нужном направлении!',
        'Сделай сегодня лучше, чем вчера!',
        'Я верю в твои инженерные навыки!',
        'Вместе мы справимся с любой задачей!',
        'Судьба колонии в ваших руках. Не подведите!',
        'Высокие ставки. Проявите все свои навыки!',
        'Каждое яйцо - маленькая вселенная возможностей!',
        'Космос ждет твоих решений, инженер!',
        'В каждом цыпленке - будущее человечества!',
    ];

    heroAnswers = [
        'Будет сделано!',
        'Приступаю к выполнению!',
        'Принял задание!',
        'Выполняю!',
        'Перехожу к реализации!',
        'Запускаю процесс!',
        'Начинаю работу!',
        'Принято к исполнению!',
        'Передаю на исполнение!',
        'Уже в работе!',
        'Спешу выполнить!',
        'Моментально!',
        'Немедленно приступаю!',
        'Срочно берусь за выполнение!',
        'Бросаю все силы на выполнение!',
        'Отличное задание, берусь!',
        'Уже представляю результат!',
        'С энтузиазмом берусь!',
        'С радостью займусь этим!',
        'Наконец-то интересная задача!',
        'Покажу, на что способен!',
        'Доверьтесь моему опыту!',
        'С радостью берусь!',
        'Отличное задание! Выполняю!',
        'Спешу сделать на отлично!',
        'Уже бегу выполнять!',
        'Миссия принята! Не подведу!',
        'Гарантирую выполнение!',
        'От результата не отверчусь!',
        'Возьму ответственность на себя!',
        'Доверьтесь, справлюсь!',
        'Считайте уже выполненным!',
        'Не подведу доверие!',
        'Сделаю все возможное!',
        'Вложу все силы!',
        'Выполню любой ценой!'
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
            this.helper.fontSize = 20;
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
                'text': startMessage,
                'person': GameState.BOSS_PERSON,
                'emotion': GameState.NORMAL_PERSON_EMOTION,
            });
        }

        const mission = this.gameState.missions[missionIndex];
        if (mission !== undefined) {
            const resultMessage = success ? mission['success'] : mission['fail'];

            if (resultMessage !== undefined) {
                this.slides.push({
                    'text': resultMessage,
                    'person': GameState.BOSS_PERSON,
                    'emotion': (success ? GameState.HAPPY_PERSON_EMOTION : GameState.ANGRY_PERSON_EMOTION),
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
                'text': resultMessage,
                'person': GameState.AI_PERSON,
                'emotion': GameState.NORMAL_PERSON_EMOTION,
            });
        }

        const nextMissionIndex = missionIndex + 1;
        const nextMission = this.gameState.missions[nextMissionIndex];
        if (nextMission !== undefined) {
            const taskMessages = nextMission['task'];

            for (const taskMessage of taskMessages) {
                this.slides.push({
                    'text': taskMessage,
                    'person': GameState.BOSS_PERSON,
                    'emotion': GameState.NORMAL_PERSON_EMOTION,
                });
            }

            this.slides.push({
                'text': this.getBossFinalMessage(),
                'person': GameState.BOSS_PERSON,
                'emotion': GameState.HAPPY_PERSON_EMOTION,
            });

            this.slides.push({
                'text': this.getHeroAnswer(),
                'person': GameState.HERO_PERSON,
                'emotion': GameState.HAPPY_PERSON_EMOTION,
            });

            this.isTheEnd = false;

        } else {
            this.isTheEnd = true;
        }

        if (finishMessages !== null) {
            for (const finishMessage of finishMessages) {
                this.slides.push({
                    'text': finishMessage,
                    'person': GameState.BOSS_PERSON,
                    'emotion': GameState.NORMAL_PERSON_EMOTION,
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

    getHeroAnswer() {
        const randomAnswerIndex = Math.floor(Math.random() * this.heroAnswers.length);

        return this.heroAnswers[randomAnswerIndex];
    }

    getBossFinalMessage() {
        const randomAnswerIndex = Math.floor(Math.random() * this.bossFinalMessages.length);

        return this.bossFinalMessages[randomAnswerIndex];
    }
}
