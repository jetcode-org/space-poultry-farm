import {Sprite} from "jetcode-scrubjs";

export class ButtonSprite extends Sprite {
    minSize = 1400;
    maxSize = 1800;

    init(){
        this.addCostume('public/images/button.png');

        this.forever(this.logic);
    }

    logic(){
        if (this.touchMouse()) {
            this.size = (this.maxSize - this.size) / 3;

            if (this.game.mouseDownOnce() && this.ononClickCallback) {
                this.ononClickCallback();
            }

        } else {
            this.size = (this.minSize - this.size) / 3;
        }
    }

    onClick(callback) {
        this.ononClickCallback = callback.bind(callback.context);
    }

    setLabel(text, color = 'white', fontSize = 10) {
        const context = this.getCostume().image.getContext('2d');

        context.font = fontSize + 'px Arial';
        context.fillStyle = color;
        context.textAlign = 'center';
        context.fillText(text, 0, 2);
    }
}
