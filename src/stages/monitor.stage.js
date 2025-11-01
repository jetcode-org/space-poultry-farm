import {Stage} from 'jetcode-scrubjs';
import {SortingRoomStage} from "./rooms/sorting-room.stage";
import {ThumbnailRoomFactory} from "../services/thumbnail-room.factory";
import {IncubatorRoomStage} from "./rooms/incubator-room.stage";
import {NurseryRoomStage} from "./rooms/nursery-room.stage";
import {CoopRoomStage} from "./rooms/coop-room.stage";
import {FarmRoomStage} from "./rooms/farm-room.stage";
import {GameState} from "../services/game.state";
import {AbstractStage} from "./abstract.stage";
import {MenuStage} from "./menu.stage";

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

    init() {
        this.addBackground('public/images/background_main_monitor.png');

        const sortingRoom1 = new SortingRoomStage();
        sortingRoom1.activate();
        sortingRoom1.currentEggs = 20;

        const incubatorRoom1 = new IncubatorRoomStage();
        incubatorRoom1.activate();

        const nurseryRoom1 = new NurseryRoomStage();
        nurseryRoom1.activate();

        const coopRoom1 = new CoopRoomStage();
        coopRoom1.activate();
        coopRoom1.currentQuantity = 85;

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
            100,
            80
        );

        ThumbnailRoomFactory.build(
            this,
            incubatorRoom1,
            200,
            80
        );

        ThumbnailRoomFactory.build(
            this,
            nurseryRoom1,
            300,
            80
        );

        ThumbnailRoomFactory.build(
            this,
            coopRoom1,
            400,
            80
        );

        ThumbnailRoomFactory.build(
            this,
            farmRoom1,
            500,
            80
        );

        ThumbnailRoomFactory.build(
            this,
            sortingRoom2,
            100,
            180
        );

        ThumbnailRoomFactory.build(
            this,
            incubatorRoom2,
            200,
            180
        );

        ThumbnailRoomFactory.build(
            this,
            nurseryRoom2,
            300,
            180
        );

        ThumbnailRoomFactory.build(
            this,
            coopRoom2,
            400,
            180
        );

        ThumbnailRoomFactory.build(
            this,
            farmRoom2,
            500,
            180
        );

        this.forever(this.gameTick, 1000);
        this.pen(this.drawParameters.bind(this), 3);
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

    drawParameters(context) {
        context.font = '18px Arial';
        context.fillStyle = 'white';
        context.textAlign = 'start';

        context.fillText('Зарядка: ' + this.gameState.chargeValue, 50, 500);
        context.fillText('Прошло время: ' + this.gameState.passedTime, 50, 525);
        context.fillText('Лимит времени: ' + this.gameState.limitTime, 50, 550);
        context.fillText('Замороженных яиц: ' + this.gameState.cooledEggs, 50, 575);
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
    }
}
