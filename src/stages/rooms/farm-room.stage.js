import {AbstractRootStage} from "./abstract-room.stage";
import { ButtonSprite } from "../../sprites/button.sprite";
import {GameState} from "../../services/game.state";

export class FarmRoomStage extends AbstractRootStage {
    maxQuantity = 100;

    init() {
        super.init();

        this.harvestButton = new ButtonSprite(this, 5);
        this.harvestButton.x = 160;
        this.harvestButton.y = 490;
        this.harvestButton.onReady(() => {
            this.harvestButton.setLabel('Собрать урожай', undefined, 65)
        });

        this.harvestButton.onClick(() => {
            this.gameState.food += this.currentQuantity;
            this.currentQuantity = 0;
        })

        this.pen(this.drawParameters, 5);

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

    drawParameters(context, room) {
		super.drawParameters(context)

        context.font = '16px Arial';
        context.fillStyle = 'white';
        context.textAlign = 'start';

        context.fillText('Урожай: ' + room.currentQuantity + ' шт.', 610, 190);
        context.fillText('Вместимость: ' + room.maxQuantity + ' шт.', 610, 215);
    }

    drawHelp(context) {
		super.drawHelp(context);
	}
}
