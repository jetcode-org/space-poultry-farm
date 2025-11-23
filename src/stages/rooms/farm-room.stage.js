import {AbstractRootStage} from "./abstract-room.stage";
import { ButtonSprite } from "../../sprites/button.sprite";
import {GameState} from "../../services/game.state";

export class FarmRoomStage extends AbstractRootStage {
    maxQuantity = 100;

    init() {
        super.init();

        this.nextButton = new ButtonSprite();
        this.nextButton.x = 690;
        this.nextButton.y = 250;
        this.nextButton.onReady(() => {
            this.nextButton.setLabel('Собрать урожай', undefined, 65)
        });

        this.nextButton.onClick(() => {
            this.gameState.food += this.currentQuantity;
            this.gameState.thereWasFood = true;
            this.currentQuantity = 0;
        })

        this.pen(this.drawParameters, 5);

        this.forever(this.control());
    }

    control() {
        return () => {
            if (this.isRoomReady) {
                this.nextButton.hidden = false;

            } else {
                this.nextButton.hidden = true;
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
    }

    drawParameters(context, room) {
		super.drawParameters(context)

        context.font = '16px Arial';
        context.fillStyle = 'white';
        context.textAlign = 'start';

        context.fillText('Урожай: ' + room.currentQuantity, 610, 190);
    }

    drawHelp(context) {
		super.drawHelp(context);
	}

}
