import { Sprite } from "jetcode-scrubjs";
import { GameState } from "../services/game.state";
import { AbstractProgressBarSprite } from "./abstract-progress-bar.sprite";

export class LicenceProgressBarSprite extends AbstractProgressBarSprite {
    valueColor = '#42b7b7';
    triangleWidth = 10;
    showValue = false;

    // control() {
    //     if (this.game.keyPressed('d')) {
    //         this.targetValue += 5;
    //     }
    //     if (this.game.keyPressed('a')) {
    //         this.targetValue -= 5;
    //     }
    //     super.control();
    // }

    drawProgress(context) {
        if (this.currentValue > this.targetValue) {
            this.drawValue(context, this.currentValue, this.lessColor);
            this.drawValue(context, this.targetValue, this.valueColor);
        } else {
            this.drawValue(context, this.targetValue, this.moreColor);
            this.drawValue(context, this.currentValue, this.valueColor);
        }
    }

    drawValue(context, value, color) {
        const A = { x: this.maxX - this.triangleWidth, y: this.y - this.thickness / 2 };
        const B = { x: this.maxX, y: this.y }
        const C = { x: this.maxX - this.triangleWidth, y: this.y + this.thickness / 2 }
        const triangleValue = this.maxValue * this.triangleWidth / (this.maxX - this.minX);
        if (value > this.maxValue - triangleValue) {

            context.fillStyle = color;
            context.fillRect(this.minX, this.y - this.thickness / 2, this.maxX - this.minX - this.triangleWidth, this.thickness)

            const triangleProgressValue = value - (this.maxValue - triangleValue);
            const progress = triangleProgressValue / triangleValue;

            context.beginPath();
            context.moveTo(A.x, A.y);
            context.lineTo(A.x + (B.x - A.x) * progress, A.y + (B.y - A.y) * progress);
            context.lineTo(C.x + (B.x - C.x) * progress, C.y + (B.y - C.y) * progress);
            context.lineTo(C.x, C.y);
            context.fill();


        } else {
            context.fillStyle = color;
            context.fillRect(this.minX, this.y - this.thickness / 2, value / (this.maxValue - triangleValue) * (this.maxX - this.minX - this.triangleWidth), this.thickness);
        }
    }

}
