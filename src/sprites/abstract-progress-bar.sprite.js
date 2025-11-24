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
        this.pen(this.drawProgress.bind(this), 10);
        this.pen(this.setLabel.bind(this), 11);
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

    drawProgress(context) {
        context.fillStyle = this.valueColor;
        context.fillRect(this.minX, this.y - 10, (this.maxX - this.minX) * (this.currentValue / this.maxValue), 20);
        if (this.targetValue > this.currentValue) {
            context.fillStyle = this.moreColor;
        } else {
            context.fillStyle = this.lessColor;
        }
        context.fillRect(this.minX + (this.maxX - this.minX) * (this.currentValue / this.maxValue), this.y - 10, (this.maxX - this.minX) * ((this.targetValue - this.currentValue) / this.maxValue), 20)

    }

    setLabel(context) {
        if (this.touchMouse()) {
            context.font = '10px Arial';
            context.fillStyle = this.textColor;
            context.textAlign = 'center';
            context.fillText(this.currentValue, this.x, this.y + 3);
        }
    }

    setWidth(width) {
        this.minX = this.x - width / 2;
        this.maxX = this.x + width / 2;
        this.setRectCollider('name', width, 20);
    }
}
