import {Sprite} from "jetcode-scrubjs";
import { GameState } from "../services/game.state";

export class AbstractButtonSprite extends Sprite {
    minSize = 100;
    maxSize = 125;
    onClickCallback;
    clickSound = 'public/sounds/click.mp3';
    originalImage = null;

    init(){
        this.onReady(this.onReadyCallback.bind(this));

        this.forever(this.control);
    }

    control(){
        if (this.touchMouse()) {
            if (!GameState.getInstance().isDraggableObjectActive) {

                this.size = (this.maxSize - this.size) / 3;

                if (this.game.mouseDownOnce() && this.onClickCallback) {
                    if (this.clickSound) {
                        this.playSound('click', {
                            volume: 0.05
                        });
                    }

                    this.onClickCallback();
                }
            }

        } else {
            this.size = (this.minSize - this.size) / 3;
        }
    }

    onReadyCallback() {
        if (this.clickSound) {
            this.addSound(this.clickSound, 'click');
        }
    }

    onClick(callback) {
        this.onClickCallback = callback.bind(callback.context);
    }

    setLabel(text, color = 'white', fontSize = 72) {
        const image = this.getCostume().image;
        const context = image.getContext('2d');

        /**
         * Костыль, позволяющий менять текст кнопки на ходу
         */
        if (!this.originalImage) {
            this.originalImage = this.createOriginalImage();
        }
        context.drawImage(this.originalImage, -image.width / 2, -image.height / 2)

        context.font = fontSize + 'px Arial';
        context.fillStyle = color;
        context.textAlign = 'center';
        context.fillText(text, 0, 15);
    }

    /**
     * Костыль, позволяющий менять текст кнопки на ходу
     */
    createOriginalImage() {
        const originalImage = this.getCostume().image;
        
        //create a new canvas
        const copyImage = document.createElement('canvas');
        const context = copyImage.getContext('2d');

        //set dimensions
        copyImage.width = originalImage.width;
        copyImage.height = originalImage.height;

        //apply the old canvas to the new one
        context.drawImage(originalImage, 0, 0);

        //return the new canvas
        return copyImage;
    }
}
