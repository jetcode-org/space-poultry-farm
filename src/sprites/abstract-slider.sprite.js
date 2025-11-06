import { Sprite } from "jetcode-scrubjs";
import { GameState } from "../services/game.state";

export class AbstractSliderSprite extends Sprite {
    minSize = 18;
    maxSize = 20;
    onClickCallback;

    active = false;
    canMove = true;

    lessColor = 'white';
    moreColor = 'white';

    drawLine = true;
    drawValue = true;

    currentValue = 0;
    minValue = 0;
    maxValue = 100;

    minX = 0;
    maxX = 0;

    init() {
        this.forever(this.control);
        this.stage.pen((context, stage)=>{
            if (this.drawLine) {
                context.lineWidth = 3;

                context.strokeStyle = this.lessColor;
                context.beginPath();
                context.moveTo(this.x, this.y);
                context.lineTo(this.minX, this.y);
                context.stroke();

                context.strokeStyle = this.moreColor;
                context.beginPath();
                context.moveTo(this.x, this.y);
                context.lineTo(this.maxX, this.y);
                context.stroke();
            }
        }, 10);
        this.pen(this.setLabel, 10);
    }

    control() {
        if (this.touchMouse()) {
            if (this.game.mouseDown()) {
                this.active = true;
                GameState.getInstance().isDraggableObjectActive = true;
            }
        }
        if (!this.game.mouseDown()) {
            this.active = false;
            GameState.getInstance().isDraggableObjectActive = false;
        }
        if (this.active) {
            if (this.canMove)
                this.x = this.game.getMousePoint().x;
            if (this.x > this.maxX)
                this.x = this.maxX;
            if (this.x < this.minX)
                this.x = this.minX
            this.setCurrentValue();
        }

        if (this.maxValue < this.minValue)
            this.maxValue = this.minValue;

    }

    setLabel(context, sprite) {
        if (sprite.drawValue) {
            context.font = '10px Arial';
            context.fillStyle = 'white';
            context.textAlign = 'center';
            context.fillText(sprite.currentValue, sprite.x, sprite.y + 3);
        }
    }

    setWidth(width) {
        this.minX = this.x - width / 2;
        this.maxX = this.x + width / 2
        this.currentValue = (this.maxValue - this.minValue) / 2;
    }

	setCurrentValue(newValue = this.currentValue) {
		this.currentValue = newValue;
        if (this.currentValue > this.maxValue)
            this.currentValue = this.maxValue;
        if (this.currentValue < this.minValue)
            this.currentValue = this.minValue;

        if (this.canMove)
            this.currentValue = Math.round(((this.x - this.minX) / (this.maxX - this.minX)) * this.maxValue);
        else {
            const addX = this.maxValue == this.minValue ? 0 : (this.currentValue - this.minValue) / (this.maxValue - this.minValue) * (this.maxX - this.minX);
            this.x = Math.round(this.minX + addX);
		}
    }
}
