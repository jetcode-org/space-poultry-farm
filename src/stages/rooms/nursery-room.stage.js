import { AbstractRootStage } from "./abstract-room.stage";
import {GameState} from "../../services/game.state";
import {LongButtonSprite} from "../../sprites/long-button.sprite";
import {Sprite} from "jetcode-scrubjs";

export class NurseryRoomStage extends AbstractRootStage {
    static NURSERY_CYCLE_TIMER = 10;
    static NURSERY_READY_LIMIT = 10;

    inProgress = false;
    currentProgress = 0;
    currentReadyProgress = 0;
    tickMaxCount = 0;

    foodConsumption = GameState.NURSERY_FOOD_CONSUMPTION;
    visualizerType = GameState.OBJECT_CHICK;
    maxQuantity = GameState.NURSERY_MAX_QUANTITY;

    init() {
        super.init();

        this.forever(this.control());

        this.moveButton = new LongButtonSprite(this, 5);
        this.moveButton.x = 150;
        this.moveButton.y = 540;
        this.moveButton.onReady(() => {
            this.moveButton.setLabel('Перевести в стадо')
        });

        this.moveButton.onClick(() => {
            const coopRooms = this.gameState.getRoomsByType(GameState.COOP_ROOM_TYPE);

            for (const coopRoom of coopRooms) {
                if (coopRoom.currentQuantity >= coopRoom.maxQuantity) {
                    continue;
                }

                if (coopRoom.maxQuantity - coopRoom.currentQuantity < this.currentQuantity) {
                    coopRoom.currentQuantity += coopRoom.maxQuantity - coopRoom.currentQuantity;
                    this.currentQuantity -= coopRoom.maxQuantity - coopRoom.currentQuantity;

                    continue;

                } else {
                    coopRoom.currentQuantity += this.currentQuantity;
                }

                this.clearRoom();

                return;
            }

            this.dangerAiMessage('Недостаточно места в стаде, к сожалению, не всех куриц удалось перевести.');
            this.clearRoom();
        });

        this.foodSprite = new Sprite(this, 1, [
            'public/images/rooms/backgrounds/details/nursery/food.png',
        ]);
        this.foodSprite.hidden = true;

        this.trashSprite = new Sprite(this, 1, [
            'public/images/rooms/backgrounds/details/nursery/trash.png',
        ]);
        this.trashSprite.hidden = true;
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

        if (this.gameState.food >= this.currentQuantity * this.foodConsumption / 5) {
            this.gameState.food -= this.currentQuantity * this.foodConsumption / 5;

        } else {
            const withoutFood = this.currentQuantity - Math.floor(this.gameState.food * (1 / this.foodConsumption));
            this.currentQuantity = Math.floor(this.gameState.food * (1 / this.foodConsumption) + 0.95 * withoutFood);
            this.gameState.food = 0;

            if (this.currentQuantity <= 0) {
                this.clearRoom();
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

        this.trashSprite.hidden = this.pollution < 10;
        this.foodSprite.hidden = this.gameState.food < 10;
    }

    getParameters() {
        return [
            ['Кол-во цыплят', this.currentQuantity + '/' + this.maxQuantity],
            ['Загрязненность', this.pollution + '%'],
            ['Готовность', (this.currentProgress / NurseryRoomStage.NURSERY_CYCLE_TIMER) * 100 + '%'],
        ];
    }

	setVisCostumes() {
		super.setVisCostumes()

		this.visualiser.addCostume('public/images/sprites/small_chicken/small_chicken_1.png')
		this.visualiser.addCostume('public/images/sprites/small_chicken/small_chicken_2.png')
	}
}
