import { Sprite } from "jetcode-scrubjs";
import {AbstractRootStage} from "./abstract-room.stage";
import { SortingRoomStage } from "./sorting-room.stage";
import { ButtonSprite } from "../../sprites/button.sprite";

export class CoopRoomStage extends AbstractRootStage {
    eggsAmount = 0;
    maxEggsAmount = 50;
    foodConsumption = 0.5;

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
            for (let i = 0; i < this.monitorStage.rooms.length; i++) {
                if (this.monitorStage.rooms[i].getLabel() === 'Сортировка') {
                    const potentialSort = this.monitorStage.rooms[i];
                    if (potentialSort.active && potentialSort.currentQuantity != potentialSort.maxQuantity) {
                        if (potentialSort.maxQuantity - potentialSort.currentQuantity < this.eggsAmount) {
                            potentialSort.currentQuantity += potentialSort.maxQuantity - potentialSort.currentQuantity;
                            this.eggsAmount -= potentialSort.maxQuantity - potentialSort.currentQuantity;
                            continue;
                        }
                        else {
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

    getLabel() {
        return 'Стадо';
    }

    getHelpText() {
        return 'Стадо - основное помещение содержания взрослых кур-несушек.';
    }

    getInstructionText() {
        return 'Собирайте яйца по завершении цикла кладки. Поддерживайте чистоту для сохранения продуктивности несушек';
    }

    getBackgroundImage() {
        return 'public/images/rooms/background_coop_space.png';
    }

    getThumbnailImage() {
        return 'public/images/rooms/thumbnails/background_coop.png';
    }

    resetRoom() {
        super.resetRoom();

        this.currentQuantity = 10;
    }

    roomTick () {
        super.roomTick();

        if (this.active) {
            this.isRoomReady = false;
            this.tickCount += 1;
            if (this.tickCount > this.tickMaxCount) {
                this.tickCount = 0;

                this.pollution += Math.floor(0.7 * this.currentQuantity);

                if (this.gameState.food >= this.currentQuantity * this.foodConsumption) {
                    this.gameState.food -= this.currentQuantity * this.foodConsumption;
                }
                else {
                    this.currentQuantity = this.gameState.food * (1 / this.foodConsumption);
					this.gameState.food = 0;
					this.visualizerSpawn();
                }

                let eggMultiplayer = 0.8 * this.pollution > 50 ? this.pollution >= 100 ? 0.4 : 0.75 : 1;
                this.eggsAmount += Math.round(this.currentQuantity * eggMultiplayer);
                if (this.eggsAmount > this.maxEggsAmount) {
                    this.eggsAmount = this.maxEggsAmount;
                    this.isRoomReady = true;
                }
            }
        }
    }

	drawParameters(context, coop) {
		super.drawParameters(context)
        if (coop.active) {
            context.font = '16px Arial';
            context.fillStyle = 'white';
            context.textAlign = 'start';

            context.fillText('Сколько куриц: ' + coop.currentQuantity, 610, 190);
            context.fillText('Сколько яиц: ' + coop.eggsAmount, 610, 215);
            context.fillText('Загрязненность: ' + coop.pollution + '%', 610, 240);
        }

	}

	setVisCostumes() {
		super.setVisCostumes()

		this.visualiser.addCostume('public/images/chicken_sprite_1.png')
		this.visualiser.addCostume('public/images/chicken_sprite_2.png')
		this.visualiser.addCostume('public/images/chicken_sprite_3.png')
	}

    drawHelp(context) {
		super.drawHelp(context);
	}
}
