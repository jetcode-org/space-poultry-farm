import {AbstractRootStage} from "./abstract-room.stage";
import { SliderSprite } from "../../sprites/slider.sprite";
import { ButtonSprite } from "../../sprites/button.sprite";

export class FarmRoomStage extends AbstractRootStage {
    maxQuantity = 100;
    
    init() {
        super.init();

        this.shellSlider = new SliderSprite();
        this.shellSlider.canMove = false;
        this.shellSlider.x = 300;
        this.shellSlider.y = 510;
        this.shellSlider.layer = 10;
        this.shellSlider.size = 15;
        this.shellSlider.maxValue = 100;
        this.shellSlider.setWidth(450);
        this.shellSlider.currentValue = 0;
        this.shellSlider.setCurrentValue();
        this.shellSlider.lessColor = 'green';
        this.shellSlider.moreColor = 'red';

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

        this.forever(this.control());
    }

    control() {
        return () => {
            this.shellSlider.currentValue = this.currentQuantity;
            this.shellSlider.setCurrentValue()
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
}
