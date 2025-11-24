import {AbstractRootStage} from "./abstract-room.stage";
import { ButtonSprite } from "../../sprites/button.sprite";
import {GameState} from "../../services/game.state";

export class CoopRoomStage extends AbstractRootStage {
    eggsAmount = 0;
    maxEggsAmount = 50;
    foodConsumption = 0.5;
    maxQuantity = 50; // Максимальное количество куриц
    comfortQuantity = 40; // Комфортное количество куриц

    init() {
        super.init();

        this.forever(this.control());
		this.pen(this.drawParameters, 4);

        this.harvestButton = new ButtonSprite(this, 5);
        this.harvestButton.x = 160;
        this.harvestButton.y = 490;
        this.harvestButton.onReady(() => {
            this.harvestButton.setLabel('Собрать яйца', undefined)
        });

        this.harvestButton.onClick(() => {
            for (let i = 0; i < this.gameState.rooms.length; i++) {
                if (this.gameState.rooms[i].getRoomType() === GameState.SORTING_ROOM_TYPE) {
                    const potentialSort = this.gameState.rooms[i];
                    if (potentialSort.currentQuantity != potentialSort.maxQuantity) {
                        if (potentialSort.maxQuantity - potentialSort.currentQuantity < this.eggsAmount) {
                            potentialSort.currentQuantity += potentialSort.maxQuantity - potentialSort.currentQuantity;
                            this.eggsAmount -= potentialSort.maxQuantity - potentialSort.currentQuantity;

                            continue;
                        } else {
                            potentialSort.currentQuantity += this.eggsAmount;
                            this.eggsAmount = 0;
                        }

                        return true;
                    }
                }
            }

            showModal('Недостаточно места в сортировке, не все яйца удалось перенести', () => this.stop(), () => this.run());

            return false;
        })

    }

    control() {
        return () => {
            if (this.eggsAmount > 0) {
                this.harvestButton.hidden = false;

            } else {
                this.harvestButton.hidden = true;
            }
        }
    }

    getRoomType() {
        return GameState.COOP_ROOM_TYPE;
    }

    roomTick () {
        super.roomTick();

        if (this.gameState.food >= this.currentQuantity * this.foodConsumption / 5) {
            this.gameState.food -= this.currentQuantity * this.foodConsumption / 5;

        } else {
            const withoutFood = this.currentQuantity - Math.floor(this.gameState.food * (1 / this.foodConsumption));
            this.currentQuantity = Math.floor(this.gameState.food * (1 / this.foodConsumption) + 0.95 * withoutFood);
            this.gameState.food = 0;

            this.visualizerSpawn();
        }

        this.isRoomReady = false;
        this.tickCount += 1;
        if (this.tickCount > this.tickMaxCount) {
            this.tickCount = 0;

            this.pollution += Math.floor(0.7 * this.currentQuantity);

            let eggMultiplayer = 0.8 * this.pollution > 50 ? this.pollution >= 100 ? 0.4 : 0.75 : 1;
            this.eggsAmount += Math.round(this.currentQuantity * eggMultiplayer);
            this.currentQuantity = Math.floor(this.currentQuantity * 0.95)

            if (this.eggsAmount > this.maxEggsAmount) {
                this.eggsAmount = this.maxEggsAmount;
                this.isRoomReady = true;
            }

            this.pollution = Math.min(this.pollution, 100);
        }
    }

	drawParameters(context, room) {
		super.drawParameters(context)

        context.font = '16px Arial';
        context.fillStyle = 'white';
        context.textAlign = 'start';

        context.fillText('Сколько куриц: ' + room.currentQuantity + ' шт.', 610, 190);
        context.fillText('Макс. кол-во: ' + room.maxQuantity + ' шт.', 610, 215);
        context.fillText('Комфорт. кол-во: ' + room.comfortQuantity + ' шт.', 610, 240);
        context.fillText('Сколько яиц: ' + room.eggsAmount + ' шт.', 610, 265);
        context.fillText('Макс. яиц: ' + room.maxEggsAmount + ' шт.', 610, 290);
        context.fillText('Загрязненность: ' + room.pollution + '%', 610, 315);
	}

	setVisCostumes() {
		super.setVisCostumes();

		this.visualiser.addCostume('public/images/sprites/chicken/chicken_1.png');
		this.visualiser.addCostume('public/images/sprites/chicken/chicken_2.png');
		this.visualiser.addCostume('public/images/sprites/chicken/chicken_3.png');
	}

    drawHelp(context) {
		super.drawHelp(context);
	}
}
