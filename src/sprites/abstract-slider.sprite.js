import { Sprite } from "jetcode-scrubjs";

export class AbstractSliderSprite extends Sprite {
    minSize = 400;
    maxSize = 500;
    onClickCallback;

    active = false

    currentValue = 0;
    minValue = 0;
    maxValue = 100;

    minX = 0;
    maxX = 0;

    init() {
        this.forever(this.control);
        this.pen(this.setLabel, 4);
    }

    control() {
        if (this.touchMouse()) {
            if (this.game.mouseDown()) {
                this.active = true;
            }
        }
        if (!this.game.mouseDown()) {
            this.active = false;
        }
        if (this.active) {
            this.x = this.game.getMousePoint().x;
            if (this.x > this.maxX)
                this.x = this.maxX;
            if (this.x < this.minX)
                this.x = this.minX
            this.setCurrentValue();
        }

    }


    setLabel(context, sprite) {
        context.font = '10px Arial';
        context.fillStyle = 'white';
        context.textAlign = 'center';
        context.fillText(sprite.currentValue, sprite.x, sprite.y + 3);
    }

    setWidth(width) {
        this.currentValue = (this.maxValue - this.minValue) / 2;
        this.minX = this.x - width / 2;
        this.maxX = this.x + width / 2
    }

    setCurrentValue() {
        this.currentValue = Math.round(((this.x - this.minX) / (this.maxX - this.minX)) * this.maxValue);
    }
}
