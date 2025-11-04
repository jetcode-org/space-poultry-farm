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
        this.bgShipSprite.addCostume('public/images/menu/main_screeen.jpg')
        this.bgShipSprite.leftX = 300
        this.bgShipSprite.setAlpha = 0.5
        
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

        this.readySprite = new Sprite();
        this.readySprite.addCostume('public/images/room_is_ready.png') 
        this.readySprite.size = 50
        // this.readySprite.drawCostume((ctx)=>{
        //     //ctx.fillStyle = 'red';
        //     //ctx.fillRect(0, 0, 50, 50);


        // }, {width: 50, height: 50})
        this.readySprite.hidden = true;

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

        const sortingRoom2 = new SortingRoomStage();
        const incubatorRoom2 = new IncubatorRoomStage();
        const nurseryRoom2 = new NurseryRoomStage();
        const coopRoom2 = new CoopRoomStage();
        const farmRoom2 = new FarmRoomStage();

        this.rooms = [];
        this.rooms.push(sortingRoom1);
        this.rooms.push(incubatorRoom1);
        this.rooms.push(nurseryRoom1);
        this.rooms.push(coopRoom1);
        this.rooms.push(farmRoom1);

        this.rooms.push(sortingRoom2);
        this.rooms.push(incubatorRoom2);
        this.rooms.push(nurseryRoom2);
        this.rooms.push(coopRoom2);
        this.rooms.push(farmRoom2);

        ThumbnailRoomFactory.build(
            this,
            sortingRoom1,
            206,
            152
        );

        ThumbnailRoomFactory.build(
            this,
            incubatorRoom1,
            292,
            152
        );

        ThumbnailRoomFactory.build(
            this,
            nurseryRoom1,
            377,
            152
        );

        ThumbnailRoomFactory.build(
            this,
            coopRoom1,
            477,
            200
        );

        ThumbnailRoomFactory.build(
            this,
            farmRoom1,
            477,
            357
        );

        ThumbnailRoomFactory.build(
            this,
            sortingRoom2,
            206,
            198
        );

        ThumbnailRoomFactory.build(
            this,
            incubatorRoom2,
            206,
            244
        );

        ThumbnailRoomFactory.build(
            this,
            nurseryRoom2,
            292,
            198
        );

        ThumbnailRoomFactory.build(
            this,
            coopRoom2,
            378,
            198
        );

        ThumbnailRoomFactory.build(
            this,
            farmRoom2,
            377,
            357
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

    gameTick() {
        this.gameState.chargeValue += 0.2;
        this.gameState.chargeValue = Number(this.gameState.chargeValue.toFixed(2));

        if (this.gameState.chargeValue > GameState.CHARGE_VALUE_FULL) {
            this.gameState.chargeValue = GameState.CHARGE_VALUE_FULL;
        }

        this.gameState.passedTime += 1;

        if (this.gameState.passedTime >= this.gameState.limitTime) {
            this.restartGame();
            this.game.run(MenuStage.getInstance());
        }

        for (const room of this.rooms) {
            if (room.active) {
                room.roomTick();
            }
		}

		this.progressSlider.setCurrentValue(this.gameState.passedTime);

        this.drawReadyRooms();
	}

	drawParameters(context) {
		super.drawParameters(context)

		context.fillText('Зарядка: ' + this.gameState.chargeValue, 600, 300);
		context.fillText('Прошло время: ' + this.gameState.passedTime, 600, 325);
		context.fillText('Лимит времени: ' + this.gameState.limitTime, 600, 350);
		context.fillText('Замороженных яиц: ' + this.gameState.cooledEggs, 600, 375);
		context.fillText('Еда: ' + this.gameState.food, 600, 400);
		context.fillText('Скорлупа: ' + this.gameState.eggshell, 600, 425);
		context.fillText('Удолбрение: ' + this.gameState.manure, 600, 450);
	}
}
