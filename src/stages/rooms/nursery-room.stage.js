import { AbstractRootStage } from "./abstract-room.stage";
import { ButtonSprite } from "../../sprites/button.sprite";
import {GameState} from "../../services/game.state";

export class NurseryRoomStage extends AbstractRootStage {
    static NURSERY_CYCLE_TIMER = 10;
    static NURSERY_READY_LIMIT = 10;

    inProgress = false;
    currentProgress = 0;
    currentReadyProgress = 0;
    tickMaxCount = 0;
    foodConsumption = 0.25;

    init() {
        super.init();

        this.forever(this.control());
        this.pen(this.drawParameters, 4);

        this.moveButton = new ButtonSprite(this, 5);
        this.moveButton.x = 160;
        this.moveButton.y = 490;
        this.moveButton.onReady(() => {
            this.moveButton.setLabel('Куриц в загон', undefined, 70)
        });

        this.moveButton.onClick(() => {
            for (let i = 0; i < this.gameState.rooms.length; i++) {
                if (this.gameState.rooms[i].getRoomType() === GameState.COOP_ROOM_TYPE) {
                    const potentialCoop = this.gameState.rooms[i];
                    if (potentialCoop.currentQuantity != potentialCoop.maxQuantity) {
                        if (potentialCoop.maxQuantity - potentialCoop.currentQuantity < this.currentQuantity) {
                            potentialCoop.currentQuantity += potentialCoop.maxQuantity - potentialCoop.currentQuantity;
                            this.currentQuantity -= potentialCoop.maxQuantity - potentialCoop.currentQuantity;

                            continue;
                        } else {
                            potentialCoop.currentQuantity += this.currentQuantity;
                        }

                        this.failRoom();

                        return true;
                    }
				}
            }

            showModal('Недостаточно места в стаде, не всех куриц удалось перевести', () => this.stop(), () => this.run());
            this.failRoom();

            return false;
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
        return GameState.NURSERY_ROOM_TYPE;
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
		this.visualizerSpawn();
    }

    roomTick() {
        super.roomTick();

        if (this.gameState.food >= this.currentQuantity * this.foodConsumption / 5) {
            this.gameState.food -= this.currentQuantity * this.foodConsumption / 5;

        } else {
            const withoutFood = this.currentQuantity - Math.floor(this.gameState.food * (1 / this.foodConsumption));
            this.currentQuantity = Math.floor(this.gameState.food * (1 / this.foodConsumption) + 0.95 * withoutFood);
            this.visualizerSpawn();
            this.gameState.food = 0;

            if (this.currentQuantity <= 0) {
                this.failRoom();
            }
        }

        if (this.inProgress) {
            this.tickCount += 1
            if (this.tickCount > this.tickMaxCount) {
                this.tickCount = 0;

                this.pollution += Math.floor(0.3 * this.currentQuantity);

                let chickenMultiplayer = this.pollution >= 100 ? 0.75 : 1;
                this.currentProgress += chickenMultiplayer;
                if (this.currentProgress >= NurseryRoomStage.NURSERY_CYCLE_TIMER) {
                    this.currentProgress = NurseryRoomStage.NURSERY_CYCLE_TIMER

                    if (!this.isRoomReady) {
                        this.playSound('ready', 0.5);
                    }

                    this.isRoomReady = true;
                }
            }

            if (this.isRoomReady) {
                this.currentReadyProgress += 1;
                if (this.currentReadyProgress > NurseryRoomStage.NURSERY_READY_LIMIT) {
                    this.pollution += Math.round(this.currentQuantity * 0.4);
                }
            }

            this.pollution = Math.min(this.pollution, 100);
        }
    }

	drawParameters(context, room) {
		super.drawParameters(context)

        context.font = '16px Arial';
        context.fillStyle = 'white';
        context.textAlign = 'start';

        context.fillText('Сколько цыплят: ' + room.currentQuantity + ' шт.', 610, 190);
        context.fillText('Вместимость: ' + room.maxQuantity + ' шт.', 610, 215);
        context.fillText('Загрязненность: ' + room.pollution + '%', 610, 240);
        context.fillText('Готовность: ' + (room.currentProgress / NurseryRoomStage.NURSERY_CYCLE_TIMER) * 100 + '%', 610, 265);

        // if (nursery.currentProgress >= NurseryRoomStage.NURSEY_CYCLE_TIMER) {
        //     context.fillText('Осталось: ' + (NurseryRoomStage.NURSEY_CYCLE_TIMER - nursery.currentReadyProgress), 615, 300);
        // }
	}

	setVisCostumes() {
		super.setVisCostumes()

		this.visualiser.addCostume('public/images/sprites/small_chicken/small_chicken_1.png')
		this.visualiser.addCostume('public/images/sprites/small_chicken/small_chicken_2.png')
	}

    drawHelp(context) {
		super.drawHelp(context);
	}
}
