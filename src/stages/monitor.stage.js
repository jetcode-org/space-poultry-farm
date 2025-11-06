import {Stage} from 'jetcode-scrubjs';
import {Sprite} from 'jetcode-scrubjs';
import {SortingRoomStage} from "./rooms/sorting-room.stage";
import {ThumbnailRoomFactory} from "../services/thumbnail-room.factory";
import {IncubatorRoomStage} from "./rooms/incubator-room.stage";
import {NurseryRoomStage} from "./rooms/nursery-room.stage";
import {CoopRoomStage} from "./rooms/coop-room.stage";
import {FarmRoomStage} from "./rooms/farm-room.stage";
import {GameState} from "../services/game.state";
import {AbstractStage} from "./abstract.stage";
import {MenuStage} from "./menu.stage";
import { SliderSprite } from "../sprites/slider.sprite";
import { RobotSprite } from "../sprites/robot.sprite";


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

        this.gameState = GameState.getInstance();
    }

    // главный монитор.меню выбора комнат
	init() {
		super.init();

       
       

        this.addBackground('public/images/background_main_monitor.png');

        // слой с схемой-космическим кораблем
        this.bgShipSprite = new Sprite();
        this.bgShipSprite.addCostume('public/images/menu/main_screeen.jpg');
        this.bgShipSprite.leftX = 300;
        this.bgShipSprite.setAlpha = 0.5;
        this.bgShipSprite.br = 0;
        this.bgShipSprite.time = 0.9;
        //this.bgShipSprite.filter = 'brightness(0.9)';


        //this.music = new Sprite();
        //this.music.addSound('public/sounds/ChickenTABPOC.mp3');

        // this.music.onReady(function() {
        //     //this.music.playSound(0)
        // })
        
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
        sortingRoom1.activate();
        sortingRoom1.currentQuantity = 20;

        const incubatorRoom1 = new IncubatorRoomStage();
        incubatorRoom1.activate();

        const nurseryRoom1 = new NurseryRoomStage();
		nurseryRoom1.activate();

        const coopRoom1 = new CoopRoomStage();
        coopRoom1.activate();
        coopRoom1.currentQuantity = 10;
        
        const farmRoom1 = new FarmRoomStage();
        farmRoom1.activate();

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
            5
        );

        ThumbnailRoomFactory.build(
            this,
            incubatorRoom1,
            292,
            152,
            5
        );

        ThumbnailRoomFactory.build(
            this,
            nurseryRoom1,
            377,
            152,
            5
        );

        ThumbnailRoomFactory.build(
            this,
            coopRoom1,
            477,
            200,
            5
        );

        ThumbnailRoomFactory.build(
            this,
            farmRoom1,
            477,
            357,
            5
        );

        

        ThumbnailRoomFactory.build(
            this,
            incubatorRoom2,
            206,
            244,
            5
        );

        ThumbnailRoomFactory.build(
            this,
            nurseryRoom2,
            292,
            198,
            5
        );

        ThumbnailRoomFactory.build(
            this,
            coopRoom2,
            378,
            198,
            5
        );

        ThumbnailRoomFactory.build(
            this,
            farmRoom2,
            377,
            357,
            5
        );

        ThumbnailRoomFactory.build(
            this,
            incubatorRoom3,
            206,
            198,
            5
        );

        ThumbnailRoomFactory.build(
            this,
            incubatorRoom3,
            206,
            198,
            5
        );

        ThumbnailRoomFactory.build(
            this,
            nurseryRoom3,
            292,
            244,
            5
        );

        ThumbnailRoomFactory.build(
            this,
            coopRoom3,
            377,
            244,
            5
        );

        ThumbnailRoomFactory.build(
            this,
            farmRoom3,
            476,
            244,
            5
        );

        ThumbnailRoomFactory.build(
            this,
            incubatorRoom4,
            206,
            288,
            5
        );

        ThumbnailRoomFactory.build(
            this,
            nurseryRoom4,
            330,
            291,
            5
        );

        ThumbnailRoomFactory.build(
            this,
            coopRoom4,
            422,
            291,
            5
        );


        this.forever(this.gameTick, 1000);
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
        this.readySprite.deleteClones()
        for (const room of this.rooms) {
            if (room.isRoomReady) {
                const clone = this.readySprite.createClone();
                clone.x = room.thumbnail.x + 35;
                clone.y = room.thumbnail.y - 20;
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
            robot.y = 120 + Math.floor(i / 2) * 75;
            robot.setStartPos();
            robot.hidden = false;
            robots.push(robot);
        }
        return robots;
    }

    gameTick() {
        // логика получения квот
        if (this.gameState.passedTime >= this.gameState.distance_planet[this.gameState.currentQuota] && this.gameState.quota_1 == false) {
            if (this.gameState.cooledEggs >= this.gameState.quotas[this.gameState.currentQuota]) {
                alert('УСПЕХ! Квота 1 достингнута, теперь летим до второй планеты!');
                this.gameState.quota_1 = true;
                this.gameState.quotas_complete += 1;
                this.gameState.cooledEggs -= this.gameState.quotas[this.gameState.currentQuota]
                this.gameState.currentQuota += 1;
            } else {
                alert('ПРОВАЛ! квота 1 не достингнута, время не ждет, летим дальше!');
                this.gameState.quota_1 = true;
                this.gameState.currentQuota += 1;
                this.gameState.cooledEggs = 0;
            }
        }

        if (this.gameState.passedTime >= this.gameState.distance_planet[this.gameState.currentQuota] && this.gameState.quota_2 == false) {
            if (this.gameState.cooledEggs >= this.gameState.quotas[this.gameState.currentQuota]) {
                alert('УСПЕХ! Квота 2 достингнута, теперь летим до третьей планеты!')
                this.gameState.quotas_complete += 1;
                this.gameState.quota_2 = true
                this.gameState.cooledEggs -= this.gameState.quotas[this.gameState.currentQuota]
                this.gameState.currentQuota += 1;
            } else {
                alert('ПРОВАЛ! квота 2 не достингнута, время не ждет, летим дальше!')
                this.gameState.quota_2 = true
                this.gameState.currentQuota += 1;
                this.gameState.cooledEggs = 0;
            }
        }

        if (this.gameState.passedTime >= this.gameState.distance_planet[this.gameState.currentQuota] && this.gameState.quota_3 == false) {
            if (this.gameState.cooledEggs >= this.gameState.quotas[this.gameState.currentQuota]) {
                alert('УСПЕХ! Квота 3 достингнута, теперь летим до третьей планеты!')
                this.gameState.quotas_complete += 1;
                this.gameState.quota_3 = true
                this.gameState.cooledEggs -= this.gameState.quotas[this.gameState.currentQuota]
                this.gameState.currentQuota += 1;
            } else {
                alert('ПРОВАЛ! квота 3 не достингнута, время не ждет, летим дальше!')
                this.gameState.quota_3 = true
                this.gameState.currentQuota += 1;
                this.gameState.cooledEggs = 0;
            }
        }

        if (this.gameState.passedTime >= this.gameState.distance_planet[this.gameState.currentQuota] && this.gameState.quota_4 == false) {
            if (this.gameState.cooledEggs >= this.gameState.quotas[this.gameState.currentQuota]) {
                alert('УСПЕХ! Квота 4 достингнута, вы завершили свою миссию');
                this.gameState.quotas_complete += 1;
                this.gameState.quota_4 = true;
            } else {
                alert('ПРОВАЛ! Квота 4 не достингнута, вы завершили свою миссию');
                this.gameState.quota_4 = true;
            }

            alert('Общий отчет: вы выполнили ' + this.gameState.quotas_complete + ' заказов из 4 возможных.');
            this.restartGame();
            this.game.run(MenuStage.getInstance());
        }

        //

        this.gameState.chargeValue += 0.2;
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

        for (const robot of this.robots) {
            if (robot.isCharging) {
                robot.charge += 5;
            }
        }

        

		this.progressSlider.setCurrentValue(this.gameState.passedTime);

        this.drawReadyRooms();
	}

    
	drawParameters(context) {
		super.drawParameters(context)

        context.font = '18px Arial';
		context.fillStyle = '#a8e2c0ff';
		context.textAlign = 'start';

		//context.fillText('Зарядка: ' + this.gameState.chargeValue, 600, 320);
		context.fillText('Прошло время: ' + this.gameState.passedTime, 600, 345);
		context.fillText('Лимит времени: ' + this.gameState.limitTime, 600, 365);
		context.fillText('Замороженных яиц: ' + this.gameState.cooledEggs, 600, 385);
        context.fillText('----------------------------', 600, 395);
		//context.fillText('Еда: ' + this.gameState.food, 600, 410);
		//context.fillText('Скорлупа: ' + this.gameState.eggshell, 600, 430);
		//context.fillText('Удобрение: ' + this.gameState.manure, 600, 455);
        context.fillText('----------------------------', 600, 465);
        context.fillStyle = '#f1f1f1ff';
        context.fillText('Текущая квота: ' + this.gameState.quotas[this.gameState.currentQuota], 600, 490)
        context.fillText('Планета: ' + this.gameState.distance_planet[this.gameState.currentQuota] + 'св. лет', 600, 510)


        // для монитора декор
        this.bgShipSprite.time += 0.01
        this.bgShipSprite.br = Math.sin(this.bgShipSprite.time) * 20
        //this.bgShipSprite.filter = 'brightness('+ this.bgShipSprite.br +')';
        this.bgShipSprite.filter = 'hue-rotate('+this.bgShipSprite.br+'deg) opacity(80%)';

	}

   

}
