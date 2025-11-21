import { AbstractRootStage } from "./abstract-room.stage";
import { CoopRoomStage } from "./coop-room.stage";
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

        this.nextButton = new ButtonSprite();
        this.nextButton.x = 690;
        this.nextButton.y = 330;
        this.nextButton.onReady(() => {
            this.nextButton.setLabel('Куриц в загон', undefined, 70)
        });
        this.nextButton.onClick(() => {
            for (let i = 0; i < this.gameState.rooms.length; i++) {
                if (this.gameState.rooms[i].getRoomType() === GameState.COOP_ROOM_TYPE) {
                    const potentialCoop = this.gameState.rooms[i];
                    if (potentialCoop.active && potentialCoop.currentQuantity != potentialCoop.maxQuantity) {
                        if (potentialCoop.maxQuantity - potentialCoop.currentQuantity < this.currentQuantity) {
                            potentialCoop.currentQuantity += potentialCoop.maxQuantity - potentialCoop.currentQuantity;
                            this.currentQuantity -= potentialCoop.maxQuantity - potentialCoop.currentQuantity;
                            continue;
                        }
                        else {
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
            if (this.isRoomReady)
                this.nextButton.hidden = false;
            else
                this.nextButton.hidden = true;
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
        }
    }

	drawParameters(context, nursery) {
		super.drawParameters(context)
        if (nursery.active) {
            context.font = '16px Arial';
            context.fillStyle = 'white';
            context.textAlign = 'start';

            context.fillText('Сколько цыплят: ' + nursery.currentQuantity, 610, 190);
            context.fillText('Загрязненность: ' + nursery.pollution + '%', 610, 215);
            context.fillText('Готовность: ' + (nursery.currentProgress / NurseryRoomStage.NURSERY_CYCLE_TIMER) * 100 + '%', 610, 240);

            // if (nursery.currentProgress >= NurseryRoomStage.NURSEY_CYCLE_TIMER) {
            //     context.fillText('Осталось: ' + (NurseryRoomStage.NURSEY_CYCLE_TIMER - nursery.currentReadyProgress), 615, 300);
            // }
        }
	}

	setVisCostumes() {
		super.setVisCostumes()

		this.visualiser.addCostume('public/images/chick_sprite_1.png')
		this.visualiser.addCostume('public/images/chick_sprite_2.png')
	}

    drawHelp(context) {
		super.drawHelp(context);
	}
}
