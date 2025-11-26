import { Sprite } from "jetcode-scrubjs";
import { GameState } from "../services/game.state";
import { AbstractProgressBarSprite } from "./abstract-progress-bar.sprite";

export class ShipProgressBarSprite extends AbstractProgressBarSprite {
    
    valueColor = '#7DC574';
    thickness = 14;
    backgroundColor = '#223F5D'

    control() {
        this.currentValue = this.targetValue;
        super.control()
    }
    
    drawProgress(context) {
        context.fillStyle = this.backgroundColor;
        context.fillRect(this.minX, this.y - (this.thickness / 2), this.maxX - this.minX, this.thickness)
        super.drawProgress(context);
        let x = this.minX;
        while (x <= (this.currentValue / this.maxValue) * this.maxX + 20) {
            x += 20;
            context.fillStyle = this.backgroundColor;
            context.fillRect(x - 2, this.y - this.thickness / 2, 4, this.thickness);
        }
        context.strokeStyle = '#162E47';
        context.lineWidth = 3;
        context.strokeRect(this.minX, this.y - (this.thickness / 2), this.maxX - this.minX, this.thickness)
    }

}
