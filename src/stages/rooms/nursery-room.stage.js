import { AbstractRootStage } from "./abstract-room.stage";
import { CoopRoomStage } from "./coop-room.stage";
import { ButtonSprite } from "../../sprites/button.sprite";

export class NurseryRoomStage extends AbstractRootStage {
    static NURSEY_CYCLE_TIMER = 10;
    static NURSEY_READY_LIMIT = 10;

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
        this.nextButton.y = 500;
        this.nextButton.onReady(() => {
            this.nextButton.setLabel('Куриц в загон', undefined, 70)
        });
        this.nextButton.onClick(() => {
            for (let i = 0; i < this.monitorStage.rooms.length; i++) {
                if (this.monitorStage.rooms[i].getLabel() == 'Стадо') {
                    const potentialCoop = this.monitorStage.rooms[i];
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
            alert('Не получитлось перевести всех куриц');
            this.failRoom();
            return false;
        })
    }

    control() {
        return () => {
            if (this.isRoomReady)
                this.nextButton.hidden = false;
            else
                this.nextButton.hidden = true;
        }
    }

    getLabel() {
        return 'Ясли';
    }

    getBackgroundImage() {
        return 'public/images/rooms/background_nursery_space.png';
    }

    getThumbnailImage() {
        return 'public/images/rooms/thumbnails/background_nursery.png';
    }

    resetRoom() {
        this.inProgress = false;
        this.currentProgress = 0;
        this.currentReadyProgress = 0;
        this.currentQuantity = 0;
        this.isRoomReady = false;
        this.pollution = 0;
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
        if (this.inProgress) {
            this.tickCount += 1
            if (this.tickCount > this.tickMaxCount) {
                this.tickCount = 0;

                this.pollution += Math.floor(0.3 * this.currentQuantity);

                if (this.gameState.food >= this.currentQuantity * 0.5) {
                    this.gameState.food -= this.currentQuantity * 0.5;
                }
                else {
					this.currentQuantity = this.gameState.food * 2;
					this.visualizerSpawn();
                    this.gameState.food = 0;
                    if (this.currentQuantity <= 0) {
                        this.failRoom();
                    }
                }

                let chickenMultiplayer = this.pollution >= 100 ? 0.75 : 1;
                this.currentProgress += chickenMultiplayer;
                if (this.currentProgress >= NurseryRoomStage.NURSEY_CYCLE_TIMER) {
                    this.currentProgress = NurseryRoomStage.NURSEY_CYCLE_TIMER
                    this.isRoomReady = true;
                }
            }
            if (this.isRoomReady) {
                this.currentReadyProgress += 1;
                if (this.currentReadyProgress > NurseryRoomStage.NURSEY_READY_LIMIT) {
                    this.pollution += Math.round(this.currentQuantity * 0.4);
                }
            }
        }
    }

	drawParameters(context, nursery) {
		super.drawParameters(context)
        if (nursery.active) {
            context.font = '18px Arial';
            context.fillStyle = 'white';
            context.textAlign = 'start';

            context.fillText('Работает: ' + nursery.inProgress, 615, 200);
            context.fillText('Сколько цыплят: ' + nursery.currentQuantity, 615, 225);
            context.fillText('Загрязненность: ' + nursery.pollution + '%', 615, 250);
            context.fillText('Готовность: ' + (nursery.currentProgress / NurseryRoomStage.NURSEY_CYCLE_TIMER) * 100 + '%', 615, 275);
            if (nursery.currentProgress >= NurseryRoomStage.NURSEY_CYCLE_TIMER) {
                context.fillText('Осталось: ' + (NurseryRoomStage.NURSEY_CYCLE_TIMER - nursery.currentReadyProgress), 615, 300);
            }
        }
	}

	setVisCostumes() {
		super.setVisCostumes()

		this.visualiser.addCostume('public/images/chick_sprite_1.png')
		this.visualiser.addCostume('public/images/chick_sprite_2.png')
	}
}
