import {AbstractRootStage} from "./abstract-room.stage";
import {GameState} from "../../services/game.state";
import {LongButtonSprite} from "../../sprites/long-button.sprite";
import {Sprite} from "jetcode-scrubjs";

export class FarmRoomStage extends AbstractRootStage {
    maxQuantity = GameState.FARM_MAX_QUANTITY;

    init() {
        super.init();

        this.harvestButton = new LongButtonSprite(this, 5);
        this.harvestButton.x = 150;
        this.harvestButton.y = 540;
        this.harvestButton.onReady(() => {
            this.harvestButton.setLabel('Собрать урожай')
        });

        this.harvestButton.onClick(() => {
            this.gameState.food += this.currentQuantity;
            this.currentQuantity = 0;
            this.plant.hidden = true;
        })

        this.plant = new Sprite(this, 1, [
            'public/images/rooms/backgrounds/details/farm/plant_1.png',
            'public/images/rooms/backgrounds/details/farm/plant_2.png',
            'public/images/rooms/backgrounds/details/farm/plant_3.png',
        ]);
        this.plant.hidden = true;

        this.forever(this.control());
    }

    control() {
        return () => {
            if (this.isRoomReady) {
                this.harvestButton.hidden = false;

            } else {
                this.harvestButton.hidden = true;
            }
        }
    }

    getRoomType() {
        return GameState.FARM_ROOM_TYPE;
    }

    roomTick () {
        this.tickCount += 1;
        if (this.tickCount > this.tickMaxCount) {
            this.tickCount = 0;
            if (this.gameState.manure > 10 && this.gameState.eggshell > 5) {
                this.gameState.manure -= 10;
                this.gameState.eggshell -= 5;
                this.currentQuantity += 30;
            }
        }

        this.isRoomReady = this.currentQuantity > 0;
        this.pollution = Math.min(this.pollution, 100);

        if (this.currentQuantity > 0) {
            this.plant.hidden = false;

            let plantCostume = 0;
            if (this.currentQuantity >= this.maxQuantity / 1.5) {
                plantCostume = 2;

            } else if (this.currentQuantity >= this.maxQuantity / 3) {
                plantCostume = 1;
            }

            this.plant.switchCostume(plantCostume);

        } else {
            this.plant.hidden = true;
        }
    }

    getParameters() {
        return [
            ['Урожай', this.currentQuantity + '/' + this.maxQuantity],
        ];
    }
}
