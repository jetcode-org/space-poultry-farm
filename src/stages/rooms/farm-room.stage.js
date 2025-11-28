import {AbstractRootStage} from "./abstract-room.stage";
import {GameState} from "../../services/game.state";
import {LongButtonSprite} from "../../sprites/long-button.sprite";

export class FarmRoomStage extends AbstractRootStage {
    maxQuantity = 100;

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
        })

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

        if (this.currentQuantity > 0) {
            this.isRoomReady = true;
        } else {
            this.isRoomReady = false;
        }

        this.pollution = Math.min(this.pollution, 100);
    }

    getParameters() {
        return [
            ['Урожай', this.currentQuantity + '/' + this.maxQuantity],
        ];
    }
}
