import { ButtonSprite } from "../../sprites/button.sprite";
import { AbstractRootStage } from "./abstract-room.stage";
import { MonitorStage } from "../monitor.stage";
import {GameState} from "../../services/game.state";

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
        this.pen(this.drawParameters, 4);

        this.nextButton = new ButtonSprite();
        this.nextButton.x = 690;
        this.nextButton.y = 330;
        this.nextButton.hidden = true;

        this.visualiser.moving = false;

        this.nextButton.onReady(() => {
            this.nextButton.setLabel('Цыплят в ясли', undefined, 70)
        });

        this.nextButton.onClick(() => {
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
                this.nextButton.hidden = false;

            } else {
                this.nextButton.hidden = true;
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

	drawParameters(context, room) {
		super.drawParameters(context);

        context.font = '16px Arial';
        context.fillStyle = 'white';
        context.textAlign = 'start';

        context.fillText('Сколько яиц: ' + room.currentQuantity + ' шт.', 610, 190);
        context.fillText('Вместимость: ' + room.maxQuantity + ' шт.', 610, 215);
        context.fillText('Загрязненность: ' + room.pollution + '%', 610, 240);
        context.fillText('Готовность: ' + (room.currentProgress / IncubatorRoomStage.INCUBATOR_CYCLE_TIMER) * 100 + '%', 610, 265);

        // if (incubator.currentProgress >= IncubatorRoomStage.INCUBATOR_CYCLE_TIMER) {
        //     context.fillText('Осталось: ' + (IncubatorRoomStage.INCUBATOR_CYCLE_TIMER - incubator.currentReadyProgress), 615, 300);
        // }
    }

    setVisCostumes() {
		super.setVisCostumes()

		this.visualiser.addCostume('public/images/sprites/egg/egg_1.png')
		this.visualiser.addCostume('public/images/sprites/egg/egg_2.png')
		this.visualiser.addCostume('public/images/sprites/egg/egg_3.png')
	}

    drawHelp(context) {
		super.drawHelp(context);
	}
}
