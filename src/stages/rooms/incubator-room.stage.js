import { AbstractRootStage } from "./abstract-room.stage";
import {GameState} from "../../services/game.state";
import {LongButtonSprite} from "../../sprites/long-button.sprite";

export class IncubatorRoomStage extends AbstractRootStage {
    static INCUBATOR_CYCLE_TIMER = 10;
    static INCUBATOR_READY_LIMIT = 10;

    inProgress = false;
    currentProgress = 0;
    currentReadyProgress = 0;
    tickMaxCount = 0;

    init() {
        super.init();

        this.forever(this.control());

        this.moveButton = new LongButtonSprite(this, 5);
        this.moveButton.x = 150;
        this.moveButton.y = 540;
        this.moveButton.hidden = true;

        this.visualiser.moving = false;

        this.moveButton.onReady(() => {
            this.moveButton.setLabel('Цыплят в ясли')
        });

        this.moveButton.onClick(() => {
            let chicksMultiplayer = 0.02 * Math.floor(this.pollution / 10);
            let quantityToMove = Math.round(this.currentQuantity * (0.9 - chicksMultiplayer))

            for (let i = 0; i < this.gameState.rooms.length; i++) {
                if (this.gameState.rooms[i].getRoomType() === GameState.NURSERY_ROOM_TYPE) {
                    const potentialNursery = this.gameState.rooms[i];

					if (!potentialNursery.inProgress) {
                        potentialNursery.inProgress = true;
                        potentialNursery.currentQuantity = quantityToMove;

                        this.gameState.eggshell += Math.floor(quantityToMove / 2);
                        this.failRoom();
                        this.visualizerSpawn();

                        return true;
                    }
                }
            }
        });
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

    failRoom() {
        this.inProgress = false;
        this.currentProgress = 0;
        this.currentReadyProgress = 0;
        this.currentQuantity = 0;
        this.isRoomReady = false;
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
}
