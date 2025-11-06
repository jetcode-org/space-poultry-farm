import {AbstractRootStage} from "./abstract-room.stage";
import { ButtonSprite } from "../../sprites/button.sprite";

export class FarmRoomStage extends AbstractRootStage {
    maxQuantity = 100;
    
    init() {
        super.init();

        this.nextButton = new ButtonSprite();
        this.nextButton.x = 690;
        this.nextButton.y = 500;
        this.nextButton.onReady(() => {
            this.nextButton.setLabel('Собрать урожай', undefined, 70)
        });
        this.nextButton.onClick(() => {
            this.gameState.food += this.currentQuantity;
            this.currentQuantity = 0;

        })

        this.pen(this.drawParameters, 5);

        this.forever(this.control());
    }

    control() {
        return () => {

        }
    }

    getLabel() {
        return 'Ферма';
    }

    getHelpText() {
        return 'Ферма - гидропонный комплекс производства кормовых культур.';
    }

    getBackgroundImage() {
        return 'public/images/rooms/background_farm.png';
    }

    getThumbnailImage() {
        return 'public/images/rooms/thumbnails/background_farm.png';
    }

    resetRoom() {

    }

    roomTick () {
        // console.log('FarmRoomStage tick');
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
        }
        else {
            this.isRoomReady = false;
        }
    }

    drawParameters(context, sort) {
		super.drawParameters(context)
        if (sort.active) {
            context.font = '18px Arial';
            context.fillStyle = 'white';
            context.textAlign = 'start';

            context.fillText('Урожай: ' + sort.currentQuantity, 615, 200);
        }
    }

}
