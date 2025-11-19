import {Sprite} from 'jetcode-scrubjs';
import {SortingRoomStage} from "./rooms/sorting-room.stage";
import {ThumbnailRoomFactory} from "../services/thumbnail-room.factory";
import {IncubatorRoomStage} from "./rooms/incubator-room.stage";
import {NurseryRoomStage} from "./rooms/nursery-room.stage";
import {CoopRoomStage} from "./rooms/coop-room.stage";
import {FarmRoomStage} from "./rooms/farm-room.stage";
import {GameState} from "../services/game.state";
import {AbstractStage} from "./abstract.stage";
import { SliderSprite } from "../sprites/slider.sprite";
import { RobotSprite } from "../sprites/robot.sprite";
import {MissionStage} from "./mission.stage";


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

        this.gameState = GameState.getInstance();
    }

    // главный монитор.меню выбора комнат
	init() {
		super.init();

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
        this.robots = this.createDrones(6);

        const sortingRoom1 = new SortingRoomStage();
        sortingRoom1.isFirstUse = true;
        sortingRoom1.activateInStart();

        const incubatorRoom1 = new IncubatorRoomStage();
        incubatorRoom1.activateInStart();

        const nurseryRoom1 = new NurseryRoomStage();
		nurseryRoom1.activateInStart();

        const coopRoom1 = new CoopRoomStage();
        coopRoom1.activateInStart();

        const farmRoom1 = new FarmRoomStage();
        farmRoom1.activateInStart();

        //const sortingRoom2 = new SortingRoomStage();
        const incubatorRoom2 = new IncubatorRoomStage();
        const nurseryRoom2 = new NurseryRoomStage();
        const coopRoom2 = new CoopRoomStage();
        const farmRoom2 = new FarmRoomStage();

        const incubatorRoom3 = new IncubatorRoomStage();
        const nurseryRoom3 = new NurseryRoomStage();
        const coopRoom3 = new CoopRoomStage();
        const farmRoom3 = new FarmRoomStage();

        const incubatorRoom4 = new IncubatorRoomStage();
        const nurseryRoom4 = new NurseryRoomStage();
        const coopRoom4 = new CoopRoomStage();
        const farmRoom4 = new FarmRoomStage();

        this.rooms = [];
        this.rooms.push(sortingRoom1);
        this.rooms.push(incubatorRoom1);
        this.rooms.push(nurseryRoom1);
        this.rooms.push(coopRoom1);
        this.rooms.push(farmRoom1);

        //this.rooms.push(sortingRoom2);
        this.rooms.push(incubatorRoom2);
        this.rooms.push(nurseryRoom2);
        this.rooms.push(coopRoom2);
        this.rooms.push(farmRoom2);

        this.rooms.push(incubatorRoom3);
        this.rooms.push(nurseryRoom3);
        this.rooms.push(coopRoom3);
        this.rooms.push(farmRoom3);

        this.rooms.push(incubatorRoom4);
        this.rooms.push(nurseryRoom4);
        this.rooms.push(coopRoom4);
        this.rooms.push(farmRoom4);

        ThumbnailRoomFactory.build(
            this,
            sortingRoom1,
            206,
            152,
            5,
            this
        );

        ThumbnailRoomFactory.build(
            this,
            incubatorRoom1,
            292,
            152,
            5,
            this
        );

        ThumbnailRoomFactory.build(
            this,
            nurseryRoom1,
            377,
            152,
            5,
            this
        );

        ThumbnailRoomFactory.build(
            this,
            coopRoom1,
            477,
            200,
            5,
            this
        );

        ThumbnailRoomFactory.build(
            this,
            farmRoom1,
            477,
            357,
            5,
            this
        );

        ThumbnailRoomFactory.build(
            this,
            incubatorRoom2,
            206,
            244,
            5,
            this
        );

        ThumbnailRoomFactory.build(
            this,
            nurseryRoom2,
            292,
            198,
            5,
            this
        );

        ThumbnailRoomFactory.build(
            this,
            coopRoom2,
            378,
            198,
            5,
            this
        );

        ThumbnailRoomFactory.build(
            this,
            farmRoom2,
            377,
            357,
            5,
            this
        );

        ThumbnailRoomFactory.build(
            this,
            incubatorRoom3,
            206,
            198,
            5,
            this
        );

        ThumbnailRoomFactory.build(
            this,
            incubatorRoom3,
            206,
            198,
            5,
            this
        );

        ThumbnailRoomFactory.build(
            this,
            nurseryRoom3,
            292,
            244,
            5,
            this
        );

        ThumbnailRoomFactory.build(
            this,
            coopRoom3,
            377,
            244,
            5,
            this
        );

        ThumbnailRoomFactory.build(
            this,
            farmRoom3,
            476,
            244,
            5,
            this
        );

        ThumbnailRoomFactory.build(
            this,
            incubatorRoom4,
            206,
            288,
            5,
            this
        );

        ThumbnailRoomFactory.build(
            this,
            nurseryRoom4,
            330,
            291,
            5,
            this
        );

        ThumbnailRoomFactory.build(
            this,
            coopRoom4,
            422,
            291,
            5,
            this
        );

        this.forever(this.gameTick, 1000);
        this.pen(this.drawHelpBlock.bind(this));

        
    }

    restartGame() {
        // Обнулить все параметры игры
        this.gameState.reset();

        // Обнулить все параметры всех комнат
        for (const room of this.rooms) {
            if (room.active) {
                room.resetRoom();
            }
        }
    }

    drawReadyRooms() {
        this.readySprite.deleteClones();

        for (const room of this.rooms) {
            if (room.isRoomReady) {
                const clone = this.readySprite.createClone();
                clone.x = room.thumbnail.x + 27;
                clone.y = room.thumbnail.y - 16;
                clone.hidden = false;
                clone.layer = 4;
            }
        }
    }

    createDrones(count) {
        const robots = [];
        for (let i = 0; i < count; i++) {
            const robot = new RobotSprite(this);
            robot.layer = 8;
            robot.x = 650 + (i % 2 * 75);
            robot.y = 145 + Math.floor(i / 2) * 75;
            robot.setStartPos();
            robot.hidden = false;
            robots.push(robot);
        }

        return robots;
    }

    gameTick() {
        // Первая миссия
        if (this.gameState.quota_0 === false) {
            this.gameState.quota_0 = true;

            this.showMission(
                this.gameState.currentQuota,
                'Основная механика игры заключается в управлении пятью производственными отсеками птицефабрики, где каждый модуль требует вашего постоянного внимания. Вам предстоит одновременно следить за инкубацией яиц, выращиванием цыплят, сбором яиц от взрослых кур, производством корма и распределением готовой продукции. Ключевой навык - умение балансировать между этими процессами, не допуская простоев и потерь.'
            );
        }

        if (!this.gameState.ifReadingHelper) {
            // логика получения квот
            if (this.gameState.passedTime >= this.gameState.distance_planet[this.gameState.currentQuota] && this.gameState.quota_1 == false) {
                if (this.gameState.cooledEggs >= this.gameState.quotas[this.gameState.currentQuota]) {
                    this.gameState.quota_1 = true;
                    this.gameState.quotas_complete += 1;
                    this.gameState.cooledEggs -= this.gameState.quotas[this.gameState.currentQuota]
                    this.gameState.currentQuota += 1;

                    this.showMission(
                        this.gameState.currentQuota,
                        'УСПЕХ! Марс-7: Квота выполнена! Научная колония получила жизненно важные белки'
                    );

                } else {
                    this.gameState.quota_1 = true;
                    this.gameState.currentQuota += 1;
                    this.gameState.cooledEggs = 0;

                    this.showMission(
                        this.gameState.currentQuota,
                        'ПРОВАЛ! Марс-7: Квота не выполнена! Колония осталась без жизненно важных ресурсов. Придется объясняться перед Советом...'
                    );
                }
            }

            if (this.gameState.passedTime >= this.gameState.distance_planet[this.gameState.currentQuota] && this.gameState.quota_2 == false) {
                if (this.gameState.cooledEggs >= this.gameState.quotas[this.gameState.currentQuota]) {
                    this.gameState.quotas_complete += 1;
                    this.gameState.quota_2 = true
                    this.gameState.cooledEggs -= this.gameState.quotas[this.gameState.currentQuota]
                    this.gameState.currentQuota += 1;

                    this.showMission(
                        this.gameState.currentQuota,
                        'УСПЕХ! Аквария: Груз доставлен! Плавучие города спасены от белкового голодания.'
                    );

                } else {
                    this.gameState.quota_2 = true
                    this.gameState.currentQuota += 1;
                    this.gameState.cooledEggs = 0;

                    this.showMission(
                        this.gameState.currentQuota,
                        'ПРОВАЛ! Аквария: Груз не доставлен! Население водного мира продолжает страдать от дефицита белка. Летим дальше с пустыми трюмами.'
                    );
                }
            }

            if (this.gameState.passedTime >= this.gameState.distance_planet[this.gameState.currentQuota] && this.gameState.quota_3 == false) {
                if (this.gameState.cooledEggs >= this.gameState.quotas[this.gameState.currentQuota]) {
                    this.gameState.quotas_complete += 1;
                    this.gameState.quota_3 = true
                    this.gameState.cooledEggs -= this.gameState.quotas[this.gameState.currentQuota]
                    this.gameState.currentQuota += 1;

                    this.showMission(
                        this.gameState.currentQuota,
                        'УСПЕХ! Гелиос-Прайм: Миссия выполнена! Полярные исследователи обеспечены провизией.'
                    );

                } else {
                    this.gameState.quota_3 = true
                    this.gameState.currentQuota += 1;
                    this.gameState.cooledEggs = 0;

                    this.showMission(
                        this.gameState.currentQuota,
                        'ПРОВАЛ! Гелиос-Прайм: Миссия провалена! Исследователи остались без провизии в ледяной пустыне. Время не ждет - движемся к следующей цели.'
                    );
                }
            }

            if (this.gameState.passedTime >= this.gameState.distance_planet[this.gameState.currentQuota] && this.gameState.quota_4 == false) {
                if (this.gameState.cooledEggs >= this.gameState.quotas[this.gameState.currentQuota]) {
                    this.gameState.quotas_complete += 1;
                    this.gameState.quota_4 = true;
                    this.gameState.currentQuota += 1;

                    this.showMission(
                        this.gameState.currentQuota,
                        'УСПЕХ! Терра-Нова: Финальный груз доставлен! Биосфера планеты спасена. Вы стали героем Галактического Совета!',
                        this.getFinishText()
                    );

                } else {
                    this.gameState.quota_4 = true;
                    this.gameState.currentQuota += 1;

                    this.showMission(
                        this.gameState.currentQuota,
                        'ПРОВАЛ! Терра-Нова: Финальная миссия сорвана! Шанс восстановить планету упущен. Ваша репутация серьезно пострадала.',
                        this.getFinishText()
                    );
                }
            }

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

            for (const room of this.rooms) {
                
                if (room.active) {
                    room.roomTick();
                    if (room.getLabel() == 'Ясли') {
                        this.gameState.chick += room.currentQuantity;
                    }
                    if (room.getLabel() == 'Стадо') {
                        this.gameState.chicken += room.currentQuantity;
                    }
                }
                
            }

            if (this.gameState.food <= 0 && this.gameState.thereWasFood) {
                this.gameState.thereWasFood = false;
                showModal('Еда закончилась. Курицы и цыплята постепенно умирают', () => this.game.getActiveStage().stop(), () => this.game.getActiveStage().run());
            }

            for (const robot of this.robots) {
                if (robot.isCharging) {
                    robot.charge += 5;
                }
            }

            this.progressSlider.setCurrentValue(this.gameState.passedTime);

            this.drawReadyRooms();
        }
	}

    getFinishText() {
        switch (this.gameState.quotas_complete) {
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
		super.drawParameters(context)

        context.font = 'bold 18px Arial';
        context.fillStyle = '#fff';
        context.fillText('Дроны-уборщики:', 610, 100)

        context.font = '18px Arial';
		context.fillStyle = '#a8e2c0ff';
		context.textAlign = 'start';

        context.fillStyle = '#f1f1f1ff';
        context.fillText('Планета: ' + this.gameState.planetNames[this.gameState.currentQuota], 70, 380)
        context.fillText('Нужно яиц: ' + this.gameState.quotas[this.gameState.currentQuota], 70, 405)
        context.fillText('Осталось время: ' + (this.gameState.quotasLimitTime[this.gameState.currentQuota] - this.gameState.passedTime), 70, 430)
        context.fillText('Зарядка корабля: ' + this.gameState.chargeValue + '%', 70, 455);

        // для монитора декор
        this.bgShipSprite.time += 0.01
        this.bgShipSprite.br = Math.sin(this.bgShipSprite.time) * 20
        //this.bgShipSprite.filter = 'brightness('+ this.bgShipSprite.br +')';
        this.bgShipSprite.filter = 'hue-rotate('+this.bgShipSprite.br+'deg) opacity(80%)';
	}

    showMission(currentQuota, resultText, finishText = null) {
        MissionStage.getInstance().setMissionSlides(
            currentQuota,
            resultText,
            finishText
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
}
