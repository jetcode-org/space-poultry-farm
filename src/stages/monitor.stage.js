import {Sprite} from 'jetcode-scrubjs';
import {ThumbnailRoomFactory} from "../services/thumbnail-room.factory";
import {GameState} from "../services/game.state";
import {AbstractStage} from "./abstract.stage";
import { RobotSprite } from "../sprites/robot.sprite";
import {MissionStage} from "./mission.stage";
import {RoomFactory} from "../services/room.factory";
import { ShipSprite } from '../sprites/ship.sprite';
import {OutroStage} from "./outro.stage";
import { ShipProgressBarSprite } from '../sprites/ship-progress-bar.sprite';
import {HelpSprite} from "../sprites/help.sprite";

export class MonitorStage extends AbstractStage {
    static instance;

    static getInstance() {
        if (!MonitorStage.instance) {
            MonitorStage.instance = new MonitorStage();
        }

        return MonitorStage.instance;
    }

    constructor(background = null) {
        super(background);

    }

    // главный монитор.меню выбора комнат
	init() {
		super.init();

        this.gameState = GameState.getInstance();

        this.addBackground('public/images/rooms/background_space.png');
        this.addSound('public/sounds/background_music.mp3', 'background_music');

        // Создание звезд
        this.createStars()

        const monitorBg = new Sprite(this, 1);
        monitorBg.addCostume('public/images/common/main_monitor.png');

        // Корабль
        const ship = new Sprite(this, 1);
        ship.addCostume('public/images/monitor/ship.png');
        ship.topY = 290;
        ship.leftX = 300;

        // Площадка для дронов
        const dronePlatform = new HelpSprite(this, 1);
        dronePlatform.addCostume('public/images/monitor/drone_default.png');
        dronePlatform.x = ship.x + 140;
        dronePlatform.y = ship.y + 140;
        dronePlatform.help = 'Дрон-станция: зарядка и обслуживание автоматических помощников. Новые дроны разблокируются по мере выполнения миссий';

        // Картинки для прогресса миссии на слайдер

        this.progressProgress = new ShipProgressBarSprite();
        this.progressProgress.x = 290;
        this.progressProgress.y = 550;
        this.progressProgress.layer = 2;
        this.progressProgress.showValue = false;
        this.progressProgress.setWidth(470);
        this.progressProgress.targetValue = 200;

        const sliderPlanet1 = new Sprite();
        sliderPlanet1.addCostume('public/images/ui/space_progress/planet_1.png');
        sliderPlanet1.addCostume('public/images/ui/space_progress/planet_1_completed.png');
        sliderPlanet1.x = 170;
        sliderPlanet1.y = 550;
        sliderPlanet1.layer = 3;

        const sliderPlanet2 = new Sprite();
        sliderPlanet2.addCostume('public/images/ui/space_progress/planet_2.png');
        sliderPlanet2.addCostume('public/images/ui/space_progress/planet_2_completed.png');
        sliderPlanet2.x = 300;
        sliderPlanet2.y = 550;
        sliderPlanet2.layer = 3;

        const sliderPlanet3 = new Sprite();
        sliderPlanet3.addCostume('public/images/ui/space_progress/planet_3.png');
        sliderPlanet3.addCostume('public/images/ui/space_progress/planet_3_completed.png');
        sliderPlanet3.x = 420;
        sliderPlanet3.y = 550;
        sliderPlanet3.layer = 3;

        const sliderPlanet4 = new Sprite();
        sliderPlanet4.addCostume('public/images/ui/space_progress/planet_4.png');
        sliderPlanet4.addCostume('public/images/ui/space_progress/planet_4_completed.png');
        sliderPlanet4.x = 515;
        sliderPlanet4.y = 550;
        sliderPlanet4.layer = 3;

        this.sliderPlanets = [];
        this.sliderPlanets.push(sliderPlanet1);
        this.sliderPlanets.push(sliderPlanet2);
        this.sliderPlanets.push(sliderPlanet3);
        this.sliderPlanets.push(sliderPlanet4);

        // слайдер для кораблика
        this.progressSlider = new ShipSprite();
        this.progressSlider.x = 290;
        this.progressSlider.y = 550;
        this.progressSlider.size = 100;
        this.progressSlider.layer = 4;
        this.progressSlider.currentValue = 50;
		this.progressSlider.setWidth(470);
        this.progressSlider.canMove = false;
        this.progressSlider.drawLine = false;
        this.progressSlider.drawValue = false;

        // получаем данные из состояния игры
        this.progressSlider.maxValue = GameState.getInstance().limitTime;
        this.progressProgress.maxValue = GameState.getInstance().limitTime;

        // спрайт готовности
        this.readySprite = new Sprite();
        this.readySprite.addCostume('public/images/ui/notifier.png')
        this.readySprite.size = 100
        this.readySprite.hidden = true;

        //создание роботов
        // this.createDrones(1);

        // Создание комнат
        this.createRooms();

        this.game.onUserInteracted(() => {
            this.playSound('background_music', {
                loop: true
            });
        })

        this.forever(this.gameTick, 1000);
    }

    resetGame() {
        this.gameState.reset(); // Обнулить все параметры игры
    }

    drawReadyRooms() {
        this.readySprite.deleteClones();

        for (const room of this.gameState.rooms) {
            if (room.isRoomReady) {
                const clone = this.readySprite.createClone();
                clone.x = room.thumbnail.x + 27;
                clone.y = room.thumbnail.y - 16;
                clone.hidden = false;
                clone.layer = 4;
            }
        }
    }

    createRooms() {
        const shipConfig = this.gameState.getShipConfig();

        for (const roomConfig of shipConfig) {
            const room = this.createRoom(roomConfig.type, roomConfig.x, roomConfig.y);

            this.gameState.addRoom(room);
        }
    }

    createRoom(type, x, y) {
        const room = RoomFactory.build(type);

        ThumbnailRoomFactory.build(this, room, x, y);

        return room;
    }

    createDrones(count) {
        for (const drone of this.gameState.drones) {
            drone.delete();
        }

        for (let i = 0; i < count; i++) {
            const drone = new RobotSprite(this);

            drone.layer = 8;
            drone.x = 400 + (i % 3) * 40;
            drone.y = 430 + Math.floor(i / 3) * 40;
            drone.setStartPos();
            drone.hidden = false;

            this.gameState.addDrone(drone);
        }
    }

    gameTick() {
        // Первая миссия
        if (this.gameState.currentMission === -1) {
            this.showMission(
                this.gameState.currentMission,
                true,
                null,
                null,
                null
            );
            this.gameState.currentMission++;
        }

        if (this.gameState.isReadingHelper) {
            return;
        }
        this.missionProcess(); // логика прохождения миссий

        this.gameState.passedTime += 1;

        if (this.gameState.passedTime >= this.gameState.limitTime) {
            //this.restartGame();
            //this.game.run(MenuStage.getInstance());
        }

        this.gameState.chick = 0;
        this.gameState.chicken = 0;
        this.gameState.pollution = 0;
        this.gameState.comfortChickenQuantity = 0;

        let activeRooms = 0;
        for (const room of this.gameState.rooms) {
            if (room.getRoomType() === GameState.EMPTY_ROOM_TYPE) {
                continue;
            }

            activeRooms++;
            room.roomTick();

            if (room.getRoomType() === GameState.NURSERY_ROOM_TYPE) {
                this.gameState.chick += room.currentQuantity;
            }

            if (room.getRoomType() === GameState.COOP_ROOM_TYPE) {
                this.gameState.chicken += room.currentQuantity;
                this.gameState.comfortChickenQuantity += room.comfortQuantity;
            }

            this.gameState.pollution += room.pollution;
        }

        this.gameState.pollution = Math.round(this.gameState.pollution / activeRooms);

        for (const drone of this.gameState.drones) {
            if (drone.isCharging) {
                drone.charge += 5;
            }
        }

        this.violationProcess();
        this.eventProcess();

        if (this.gameState.rating <= GameState.CRITICAL_RATING) {
            this.showOutro(false);
        }

        this.progressSlider.setCurrentValue(this.gameState.passedTime);
        this.progressProgress.targetValue = this.gameState.passedTime;

        this.drawReadyRooms();
	}

    getFinishMessage() {
        switch (this.gameState.successfulCompletedMissions) {
            case 0:
                return ['Экипаж, мы потерпели полное фиаско! Ни одна из планет не получила жизненно важные грузы. Наша репутация уничтожена, контракты расторгнуты. Возможно, птицеводство в космосе - не ваше призвание...'];

            case 1:
                return ['Минимальный результат достигнут. Хотя мы смогли помочь только одной колонии, этого явно недостаточно для признания миссии успешной. Галактический Совет рекомендует пройти дополнительное обучение.'];

            case 2:
                return ['Частичный успех! Две планеты получили необходимую помощь, но две другие остались без поддержки. Ваши навыки требуют совершенствования, но потенциал очевиден. Продолжайте работать над собой!'];

            case 3:
                return ['Отличный результат! Три из четырех колоний с благодарностью приняли вашу помощь. Галактический Совет доволен вашей работой и готов рассматривать новые контракты. Вы доказали свою состоятельность!'];

            default:
                return ['Блестящий успех! Все целевые планеты получили грузы в полном объеме. Ваше мастерство управления космической птицефабрикой не имеет равных! Галактический Совет награждает вас званием "Лучший космический аграрий года"!'];
        }
    }

    showMission(currentQuota, success, soldEggs = null, earnedMoney = null, changeRating = null, startMessage = null, finishMessage = null) {
        MissionStage.getInstance().setMissionSlides(
            currentQuota,
            success,
            soldEggs,
            earnedMoney,
            changeRating,
            startMessage,
            finishMessage
        );

        this.game.run(MissionStage.getInstance());
    }

    showOutro(result) {
        OutroStage.getInstance().setResult(result);

        this.game.run(OutroStage.getInstance());
    }

    missionProcess() {
        const currentMission = this.gameState.currentMission;
        const mission = this.gameState.missions[currentMission];

        if (!mission) {
            return;
        }

        const missionDistance = mission['distance'];

        if (this.gameState.passedTime >= missionDistance) {
            for (const drone of this.gameState.drones) {
                drone.delete();
            }

            const missionEggQuota = mission['eggQuota'];
            const success = this.gameState.frozenEggs >= missionEggQuota;

            if (success) {
                this.gameState.successfulCompletedMissions += 1;
            }

            const changeRating = success ? mission.successChangeRating : mission.failChangeRating;
            const soldEggs = Math.min(this.gameState.frozenEggs, missionEggQuota);
            const earnedMoney = soldEggs * this.gameState.getEggQualityCost();

            this.gameState.frozenEggs -= soldEggs;
            this.gameState.money += earnedMoney;
            this.gameState.changeRating(changeRating);

            const finishMessage = this.gameState.currentMission === this.gameState.missions.length - 1 ?
                this.getFinishMessage() :
                null
            ;

            this.showMission(this.gameState.currentMission, success, soldEggs, earnedMoney, changeRating, null, finishMessage);

            if (this.sliderPlanets[this.gameState.currentMission]) {
                this.sliderPlanets[this.gameState.currentMission].nextCostume();
            }

            this.gameState.currentMission += 1;
            this.createDrones(this.gameState.currentMission);

            this.gameState.resetViolations();
        }
    }

    violationProcess() {
        // Нарушение кормления
        if (!this.gameState.feedingViolation && this.gameState.food <= GameState.CRITICAL_FOOD) {
            this.gameState.feedingViolation = true;
            this.gameState.changeRating(this.gameState.violations.feeding.fail.changeRating);

            this.showViolationModal('Нарушение кормления', 'Еда закончилась. Курицы и цыплята постепенно умирают');
        }

        // Нарушение чистоты
        if (!this.gameState.cleanViolation && this.gameState.pollution >= GameState.CRITICAL_POLLUTION) {
            this.gameState.cleanViolation = true;
            this.gameState.changeRating(this.gameState.violations.clean.fail.changeRating);

            this.showViolationModal('Нарушение чистоты', 'Слишком грязно, мы теряем качество');
        }

        // Нарушение условий содержания
        if (!this.gameState.conditionViolation && this.gameState.chicken > this.gameState.comfortChickenQuantity) {
            this.gameState.conditionViolation = true;
            this.gameState.changeRating(this.gameState.violations.condition.fail.changeRating);

            this.showViolationModal('Нарушение условий содержания', 'Курицам слишком тесно, мы теряем качество');
        }
    }

    eventProcess() {
        this.gameState.eventTimer++;

        if (this.gameState.eventTimer < GameState.EVENT_TIMER_MIN) {
            return;
        }

        if (this.gameState.eventAnswers.length >= this.gameState.events.length) {
            return;
        }

        const randomValue = this.game.getRandom(0, GameState.EVENT_TIMER_MAX);

        if (randomValue < this.gameState.eventTimer) {
            const eventId = this.gameState.getRandomEventId();

            this.showEventModal(eventId, (variantId) => {
                const event = this.gameState.events[eventId];
                const correct = event.variants[variantId].correct;
                const changeRating = event.variants[variantId].changeRating;
                const comment = event.variants[variantId].comment;

                this.gameState.eventAnswers.push(
                    {event: eventId, variant: variantId}
                );

                this.gameState.changeRating(changeRating);

                if (correct) {
                    let text = '<p>' + comment + '</p>'
                    text += '<p class="accent-color">Рейтинг изменился на: +' + changeRating + '</p>'

                    this.showModal('Молодец! Правильно!', text);

                } else {
                    const correctAnswer = this.gameState.getEventCorrectAnswer(eventId);

                    let text = '<p>' + comment + '</p>'
                    text += '<p><span class="success-color"><strong>Правильный ответ: </strong></span> ' + correctAnswer + '</p>'
                    text += '<p class="accent-color">Рейтинг изменился на: ' + changeRating + '</p>'

                    this.showModal('Ответ неправильный', text);
                }
            });

            this.gameState.eventTimer = 0;
        }
    }

    helpOnClick(){
        this.helper.show('Основная механика игры заключается в управлении пятью производственными отсеками птицефабрики, где каждый модуль требует вашего постоянного внимания.', GameState.AI_PERSON)
        this.helper.setButtonText('Дальше');

        this.helper.onClick(()=>{
            this.helper.show('Вам предстоит одновременно следить за инкубацией яиц, выращиванием цыплят, сбором яиц от взрослых кур, производством корма и распределением готовой продукции.', GameState.AI_PERSON)

            this.helper.onClick(()=>{
                this.helper.show('Ключевой навык - умение балансировать между этими процессами, не допуская простоев и потерь.', GameState.AI_PERSON)
                this.helper.setButtonText('Конец');

                this.helper.onClick(()=>{
                    this.helper.hide();
                })
            })
        })
    }
}
