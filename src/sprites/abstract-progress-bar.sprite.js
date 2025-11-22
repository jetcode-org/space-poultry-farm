import { Sprite } from "jetcode-scrubjs";
import { GameState } from "../services/game.state";

export class AbstractProgressBarSprite extends Sprite {
    lessColor = 'red';
    moreColor = 'green';
    textColor = 'white';
    valueColor = 'gold';

    targetValue = 0;
    currentValue = 0;
    minValue = 0;
    maxValue = 100;

    minX = 0;
    maxX = 0;

    init() {
        this.forever(this.control);
        this.pen(this.drawProgress, 10);
        this.pen(this.setLabel, 11);
    }

    control() {
        if (this.currentValue > this.maxValue) {
            this.currentValue = this.maxValue;
        }
        if (this.currentValue < this.minValue) {
            this.currentValue = this.minValue;
        }
        if (this.targetValue > this.maxValue) {
            this.targetValue = this.maxValue;
        }
        if (this.targetValue < this.minValue) {
            this.targetValue = this.minValue;
        }

        if (this.targetValue > this.currentValue) {
            this.currentValue += Math.ceil((this.targetValue - this.currentValue) / 10)
        } 
        if (this.targetValue < this.currentValue) {
            this.currentValue += Math.floor((this.targetValue - this.currentValue) / 10)
        }
    }

    drawProgress(context, sprite) {
        context.fillStyle = sprite.valueColor;
        context.fillRect(sprite.minX, sprite.y - 10, (sprite.maxX - sprite.minX) * (sprite.currentValue / sprite.maxValue), 20);
        if (sprite.targetValue > sprite.currentValue) {
            context.fillStyle = sprite.moreColor;
        } else {
            context.fillStyle = sprite.lessColor;
        }
        context.fillRect(sprite.minX + (sprite.maxX - sprite.minX) * (sprite.currentValue / sprite.maxValue), sprite.y - 10, (sprite.maxX - sprite.minX) * ((sprite.targetValue - sprite.currentValue) / sprite.maxValue), 20)

    }

    setLabel(context, sprite) {
        if (sprite.touchMouse()) {
            context.font = '10px Arial';
            context.fillStyle = sprite.textColor;
            context.textAlign = 'center';
            context.fillText(sprite.currentValue, sprite.x, sprite.y + 3);
        }
    }

    setWidth(width) {
        this.minX = this.x - width / 2;
        this.maxX = this.x + width / 2;
        this.setRectCollider('name', width, 20);
    }
}
