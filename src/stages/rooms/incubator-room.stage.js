import { AbstractRootStage } from "./abstract-room.stage";
import { GameState } from "../../services/game.state";
import { LongButtonSprite } from "../../sprites/long-button.sprite";
import { Sprite } from "jetcode-scrubjs";

export class IncubatorRoomStage extends AbstractRootStage {
    static INCUBATOR_CYCLE_TIMER = 10;
    static INCUBATOR_READY_LIMIT = 10;

    inProgress = false;
    currentProgress = 0;
    currentReadyProgress = 0;
    tickMaxCount = 0;
    visualiserMoving = false;

    visualizerType = GameState.OBJECT_EGG;
    maxQuantity = GameState.INCUBATOR_MAX_QUANTITY;

    init() {
        super.init();

        this.eggsPoses = [];

        for (let y = 360; y <= 370; y += 10) {
            for (let x = 30; x < 140; x += 20) {
                this.eggsPoses.push({ 'x': x, 'y': y })
            }
        }

        for (let y = 360; y <= 370; y += 10) {
            for (let x = 425; x < 560; x += 20) {
                this.eggsPoses.push({ 'x': x, 'y': y })
            }
        }

        for (let y = 500; y <= 510; y += 10) {
            for (let x = 35; x < 180; x += 20) {
                this.eggsPoses.push({ 'x': x, 'y': y })
            }
        }

        for (let y = 500; y <= 510; y += 10) {
            for (let x = 380; x < 550; x += 20) {
                this.eggsPoses.push({ 'x': x, 'y': y })
            }
        }

        for (let x = 95; x < 180; x += 20) {
            this.eggsPoses.push({ 'x': x, 'y': 560 })
        }

        for (let x = 380; x < 480; x += 20) {
            this.eggsPoses.push({ 'x': x, 'y': 560 })
        }

        this.forever(this.control());

        this.moveButton = new LongButtonSprite(this, 5);
        this.moveButton.x = 150;
        this.moveButton.y = 540;
        this.moveButton.hidden = true;

        this.moveButton.onReady(() => {
            this.moveButton.setLabel('Перевести в цыплятник');
        });

        this.moveButton.onClick(() => {
            let chicksMultiplayer = 0.02 * Math.floor(this.pollution / 10);
            let quantityToMove = Math.round(this.currentQuantity * (GameState.INCUBATOR_EFFICIENCY - chicksMultiplayer))

            const nurseryRooms = this.gameState.getRoomsByType(GameState.NURSERY_ROOM_TYPE);
            for (const nurseryRoom of nurseryRooms) {
                if (nurseryRoom.inProgress) {
                    continue;
                }

                nurseryRoom.inProgress = true;
                nurseryRoom.currentQuantity = quantityToMove;

                this.gameState.eggshell += Math.floor(quantityToMove * GameState.EGGSHELL_COEF);
                this.clearRoom();

                return true;
            }

            this.warningAiMessage('Нет свободных цыплятников.');
        });


        this.windowsSprite = new Sprite(this, 1, [
            'public/images/rooms/backgrounds/details/incubator/windows.png',
        ]);

        this.eggshellSprite = new Sprite(this, 1, [
            'public/images/rooms/backgrounds/details/incubator/eggshell.png',
        ]);

        const conveyor = new Sprite(this, 1, [
            'public/images/rooms/backgrounds/details/incubator/conveyor_1.png',
            'public/images/rooms/backgrounds/details/incubator/conveyor_2.png',
            'public/images/rooms/backgrounds/details/incubator/conveyor_3.png',
        ]);
        conveyor.forever(() => {
            conveyor.nextCostume();
        }, 200);
    }

    control() {
        return () => {
            if (this.isRoomReady) {
                this.moveButton.hidden = false;

            } else {
                this.moveButton.hidden = true;
            }
        }
    }

    getRoomType() {
        return GameState.INCUBATOR_ROOM_TYPE;
    }

    resetRoom() {
        super.resetRoom();

        this.inProgress = false;
        this.currentProgress = 0;
        this.currentReadyProgress = 0;
    }

    clearRoom() {
        this.inProgress = false;
        this.currentProgress = 0;
        this.currentReadyProgress = 0;
        this.currentQuantity = 0;
        this.isRoomReady = false;
        this.isVisualized = false;
    }

    roomTick() {
        super.roomTick();

        if (this.inProgress) {
            this.tickCount += 1;

            if (this.tickCount > this.tickMaxCount) {
                this.tickCount = 0
                this.currentProgress += 1;
                if (this.currentProgress >= IncubatorRoomStage.INCUBATOR_CYCLE_TIMER) {
                    this.currentProgress = IncubatorRoomStage.INCUBATOR_CYCLE_TIMER

                    if (!this.isRoomReady) {
                        this.playSound('ready', 0.5);
                    }

                    this.isRoomReady = true;
                }
            }

            if (this.isRoomReady) {
                this.currentReadyProgress += 1;
                if (this.currentReadyProgress > IncubatorRoomStage.INCUBATOR_READY_LIMIT) {
                    this.pollution += Math.round(this.currentQuantity * 0.4);
                    //this.visualizerSpawn();
                }
            }

            this.pollution = Math.min(this.pollution, 100);
        }

        this.eggshellSprite.hidden = this.pollution < 10;
    }

    getParameters() {
        return [
            ['Кол-во яиц', this.currentQuantity + '/' + this.maxQuantity],
            ['Загрязненность', this.pollution + '%'],
            ['Готовность', (this.currentProgress / IncubatorRoomStage.INCUBATOR_CYCLE_TIMER) * 100 + '%'],
        ];
    }

    setVisCostumes() {
        super.setVisCostumes()

        this.visualiser.addCostume('public/images/sprites/egg/egg_1.png')
        this.visualiser.addCostume('public/images/sprites/egg/egg_2.png')
        this.visualiser.addCostume('public/images/sprites/egg/egg_3.png')
    }

    prepareVis(sprite) {
        super.prepareVis(sprite);

        sprite.x = this.eggsPoses[sprite.number - 1].x;
        sprite.y = this.eggsPoses[sprite.number - 1].y;
        sprite.size = 75;
    }

    visualiserLogic(visClone) {
        if (this.currentProgress >= IncubatorRoomStage.INCUBATOR_CYCLE_TIMER / 2) {
            visClone.currentActivity = 1;
        } else {
            visClone.currentActivity = 0;
        }
    }
}
