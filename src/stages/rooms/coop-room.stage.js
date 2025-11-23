import { Sprite } from "jetcode-scrubjs";
import {AbstractRootStage} from "./abstract-room.stage";
import { SortingRoomStage } from "./sorting-room.stage";
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

        this.nextButton = new ButtonSprite();
        this.nextButton.x = 690;
        this.nextButton.y = 330;
        this.nextButton.onReady(() => {
            this.nextButton.setLabel('Собрать яйца', undefined)
        });

        this.nextButton.onClick(() => {
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
                this.nextButton.hidden = false;

            } else {
                this.nextButton.hidden = true;
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

	drawParameters(context, coop) {
		super.drawParameters(context)

        context.font = '16px Arial';
        context.fillStyle = 'white';
        context.textAlign = 'start';

        context.fillText('Сколько куриц: ' + coop.currentQuantity, 610, 190);
        context.fillText('Макс. кол-во: ' + coop.maxQuantity, 610, 215);
        context.fillText('Комфортное кол-во: ' + coop.comfortQuantity, 610, 240);
        context.fillText('Сколько яиц: ' + coop.eggsAmount, 610, 265);
        context.fillText('Загрязненность: ' + coop.pollution + '%', 610, 290);
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
