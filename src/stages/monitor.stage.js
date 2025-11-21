import {Sprite} from 'jetcode-scrubjs';
import {ThumbnailRoomFactory} from "../services/thumbnail-room.factory";
import {GameState} from "../services/game.state";
import {AbstractStage} from "./abstract.stage";
import { SliderSprite } from "../sprites/slider.sprite";
import { RobotSprite } from "../sprites/robot.sprite";
import {MissionStage} from "./mission.stage";
import {InfoButtonSprite} from "../sprites/info-button.sprite";
import {RoomFactory} from "../services/room.factory";

export class MonitorStage extends AbstractStage {
    static instance;
    helpText = null;
    helpTextLifetime = 0;

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

        this.addBackground('public/images/background_main_monitor.png');
        this.addSound('public/sounds/background_music.mp3', 'background_music');

        // слой с схемой-космическим кораблем
        this.bgShipSprite = new Sprite();
        this.bgShipSprite.addCostume('public/images/menu/main_screeen_2.png');
        this.bgShipSprite.leftX = 300;
        this.bgShipSprite.setAlpha = 0.5;
        this.bgShipSprite.br = 0;
        this.bgShipSprite.time = 0.9;
        //this.bgShipSprite.filter = 'brightness(0.9)';

        // Картинки для прогресса миссии на слайдер
        this.sliderPlanet1 = new Sprite();
        this.sliderPlanet1.addCostume('public/images/sliderSprites/slider_planet_1.png');
        this.sliderPlanet1.x = 170;
        this.sliderPlanet1.y = 500;

        this.sliderPlanet2 = new Sprite();
        this.sliderPlanet2.addCostume('public/images/sliderSprites/slider_planet_2.png');
        this.sliderPlanet2.x = 300;
        this.sliderPlanet2.y = 500;

        this.sliderPlanet3 = new Sprite();
        this.sliderPlanet3.addCostume('public/images/sliderSprites/slider_planet_3.png');
        this.sliderPlanet3.x = 420;
        this.sliderPlanet3.y = 500;

        this.sliderPlanet4 = new Sprite();
        this.sliderPlanet4.addCostume('public/images/sliderSprites/slider_planet_4.png');
        this.sliderPlanet4.x = 515;
        this.sliderPlanet4.y = 505;
        this.sliderPlanet4.size = 200;

        this.game.onUserInteracted(() => {
            this.playSound('background_music', {
                loop: true
            });
        })

        // слайдер для кораблика
        this.progressSlider = new SliderSprite();
        this.progressSlider.x = 290;
        this.progressSlider.y = 500;
        this.progressSlider.size = 100;
        this.progressSlider.layer = 4;
        this.progressSlider.currentValue = 50;
        this.progressSlider.lessColor = 'red';
        this.progressSlider.moreColor = 'red';
		this.progressSlider.setWidth(470);
        this.progressSlider.canMove = false;
        this.progressSlider.drawLine = false;
        this.progressSlider.drawValue = false;

        this.progressSlider.onReady(()=>{
		    this.progressSlider.nextCostume()
		});

        // получаем данные из состояния игры
        this.progressSlider.maxValue = GameState.getInstance().limitTime;

        // спрайт готовности
        this.readySprite = new Sprite();
        this.readySprite.addCostume('public/images/room_is_ready.png')
        this.readySprite.size = 50
        this.readySprite.hidden = true;

        //создание роботов
        this.createDrones(6);

        // Создание комнат
        this.createRooms();

        // Info Icon
        const eggQualityInfoButton = new InfoButtonSprite(this, 1);
        eggQualityInfoButton.x = 550;
        eggQualityInfoButton.y = 455;
        eggQualityInfoButton.hidden = false;

        eggQualityInfoButton.onClick(() => {
            const nextEggQualityClass = this.gameState.getNextEggQualityClass();

            let text = '<table border="0">';
            const qualityInfo = this.gameState.getEggQualityInfo();
            text += '<tr><td style="text-align: left">Категория яйца:</td><td>' + this.gameState.getEggQualityClass() + '</td></tr>';
            text += '<tr><td style="text-align: left">Стоимость яйца:</td><td>' + this.gameState.getEggQualityCost() + '$</td></tr>';

            text += '<tr><td colspan="2"><hr></td></tr>';

            text += '<tr><td style="text-align: left">Порода "' + this.gameState.getChickenBreedName() + '":</td><td>' + this.addPlus(qualityInfo['chickenBreed']) + '</td></tr>';
            text += '<tr><td style="text-align: left">Нарушение условий чистоты:</td><td>' + this.addPlus(qualityInfo['cleanViolation']) + '</td></tr>';
            text += '<tr><td style="text-align: left">Нарушение кормления:</td><td>' + this.addPlus(qualityInfo['feedingViolation']) + '</td></tr>';
            text += '<tr><td style="text-align: left">Нарушение условий содержания:</td><td>' + this.addPlus(qualityInfo['chickenConditionViolation']) + '</td></tr>';
            text += '</table>';
            text += '<hr>';

            if (nextEggQualityClass) {
                text += '<p>Нужно баллов получения следующей категории "' + nextEggQualityClass + '": ' + this.gameState.getEggQualityPoint(nextEggQualityClass) + '</p>';
            }

            showModal(text, () => this.stop(), () => this.run());
        });

        this.forever(this.gameTick, 1000);
        this.pen(this.drawHelpBlock.bind(this));
    }

    addPlus(value) {
        return value ? '+' + value: value;
    }

    restartGame() {
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
        room.activateInStart();

        ThumbnailRoomFactory.build(this, room, x, y);

        return room;
    }

    createDrones(count) {
        for (let i = 0; i < count; i++) {
            const drone = new RobotSprite(this);

            drone.layer = 8;
            drone.x = 650 + (i % 2 * 75);
            drone.y = 145 + Math.floor(i / 2) * 75;
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
                'Основная механика игры заключается в управлении пятью производственными отсеками птицефабрики, где каждый модуль требует вашего постоянного внимания. Вам предстоит одновременно следить за инкубацией яиц, выращиванием цыплят, сбором яиц от взрослых кур, производством корма и распределением готовой продукции. Ключевой навык - умение балансировать между этими процессами, не допуская простоев и потерь.'
            );
            this.gameState.currentMission++;
        }

        if (this.gameState.ifReadingHelper) {
            return;
        }

        this.missionProcess(); // логика прохождения миссий

        this.gameState.chargeValue += 5;
        this.gameState.chargeValue = Number(this.gameState.chargeValue.toFixed(2));

        if (this.gameState.chargeValue > GameState.CHARGE_VALUE_FULL) {
            this.gameState.chargeValue = GameState.CHARGE_VALUE_FULL;
        }

        this.gameState.passedTime += 1;

        if (this.gameState.passedTime >= this.gameState.limitTime) {
            //this.restartGame();
            //this.game.run(MenuStage.getInstance());
        }

        this.gameState.chick = 0;
        this.gameState.chicken = 0;

        for (const room of this.gameState.rooms) {
            if (room.active) {
                room.roomTick();

                if (room.getRoomType() === GameState.NURSERY_ROOM_TYPE) {
                    this.gameState.chick += room.currentQuantity;
                }

                if (room.getRoomType() === GameState.COOP_ROOM_TYPE) {
                    this.gameState.chicken += room.currentQuantity;
                }
            }
        }

        if (this.gameState.food <= 0 && this.gameState.thereWasFood) {
            this.gameState.thereWasFood = false;
            showModal('Еда закончилась. Курицы и цыплята постепенно умирают', () => this.game.getActiveStage().stop(), () => this.game.getActiveStage().run());
        }

        for (const drone of this.gameState.drones) {
            if (drone.isCharging) {
                drone.charge += 5;
            }
        }

        this.progressSlider.setCurrentValue(this.gameState.passedTime);

        this.drawReadyRooms();
	}

    getFinishMessage() {
        switch (this.gameState.successfulCompletedMissions) {
            case 0:
                return 'Экипаж, мы потерпели полное фиаско! Ни одна из планет не получила жизненно важные грузы. Наша репутация уничтожена, контракты расторгнуты. Возможно, птицеводство в космосе - не ваше призвание...';

            case 1:
                return 'Минимальный результат достигнут. Хотя мы смогли помочь только одной колонии, этого явно недостаточно для признания миссии успешной. Галактический Совет рекомендует пройти дополнительное обучение.';

            case 2:
                return 'Частичный успех! Две планеты получили необходимую помощь, но две другие остались без поддержки. Ваши навыки требуют совершенствования, но потенциал очевиден. Продолжайте работать над собой!';

            case 3:
                return 'Отличный результат! Три из четырех колоний с благодарностью приняли вашу помощь. Галактический Совет доволен вашей работой и готов рассматривать новые контракты. Вы доказали свою состоятельность!';

            default:
                return 'Блестящий успех! Все целевые планеты получили грузы в полном объеме. Ваше мастерство управления космической птицефабрикой не имеет равных! Галактический Совет награждает вас званием "Лучший космический аграрий года"!';
        }
    }

	drawParameters(context) {
		super.drawParameters(context);

        context.font = 'bold 18px Arial';
        context.fillStyle = '#fff';
        context.fillText('Дроны-уборщики:', 610, 100)

        context.font = '18px Arial';
		context.fillStyle = '#a8e2c0ff';
		context.textAlign = 'start';

        const currentMission = this.gameState.currentMission;
        const mission = this.gameState.missions[currentMission];

        if (mission) {
            context.fillStyle = '#f1f1f1ff';
            context.fillText('Планета: ' + mission['name'], 70, 380)
            context.fillText('Нужно яиц: ' + mission['eggQuota'], 70, 405)
            context.fillText('Осталось время: ' + (mission['distance'] - this.gameState.passedTime), 70, 430)
            context.fillText('Зарядка корабля: ' + this.gameState.chargeValue + '%', 70, 455);
        }

        context.fillText('Рейтинг: ' + this.gameState.rating, 320, 410);
        context.fillText('Деньги: ' + this.gameState.money + '$', 320, 435);
        context.fillText('Качество яйца: ' + this.gameState.getEggQualityClass() + ' (+' +  this.gameState.getEggQualityCost() + '$)' , 320, 460);

        // для монитора декор
        this.bgShipSprite.time += 0.01
        this.bgShipSprite.br = Math.sin(this.bgShipSprite.time) * 20
        //this.bgShipSprite.filter = 'brightness('+ this.bgShipSprite.br +')';
        this.bgShipSprite.filter = 'hue-rotate('+this.bgShipSprite.br+'deg) opacity(80%)';
	}

    showMission(currentQuota, success, soldEggs = null, earnedMoney = null, startMessage = null, finishMessage = null) {
        MissionStage.getInstance().setMissionSlides(
            currentQuota,
            success,
            soldEggs,
            earnedMoney,
            startMessage,
            finishMessage
        );

        this.game.run(MissionStage.getInstance());
    }

    showHelp(text, lifetime = 10) {
        this.helpText = text;
        this.helpTextLifetime = lifetime;
    }

    drawHelpBlock(context) {
        if (!this.helpText) {
            return;
        }

        this.helpTextLifetime--;
        if (this.helpTextLifetime <= 0) {
            this.helpText = null;
            return;
        }

        context.font = 'bold 18px Arial';
        context.fillStyle = '#a8e2c0ff';
        context.fillText('Справка:', 610, 400)

        context.font = '14px Arial';
        this.drawMultilineText(context, this.helpText, 610, 430, 165, 20);
    }

    missionProcess() {
        const currentMission = this.gameState.currentMission;
        const mission = this.gameState.missions[currentMission];

        if (!mission) {
            return;
        }

        const missionDistance = mission['distance'];

        if (this.gameState.passedTime >= missionDistance) {
            const missionEggQuota = mission['eggQuota'];
            const success = this.gameState.frozenEggs >= missionEggQuota;

            if (success) {
                this.gameState.successfulCompletedMissions += 1;
            }

            const soldEggs = Math.min(this.gameState.frozenEggs, missionEggQuota);
            const earnedMoney = soldEggs * this.gameState.getEggQualityCost();
            this.gameState.frozenEggs -= soldEggs;
            this.gameState.money += earnedMoney;

            const finishMessage = this.gameState.currentMission === this.gameState.missions.length - 1 ?
                this.getFinishMessage() :
                null
            ;

            this.showMission(this.gameState.currentMission, success, soldEggs, earnedMoney, null, finishMessage);
            this.gameState.currentMission += 1;
        }
    }
}
