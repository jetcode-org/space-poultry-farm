import {Sprite} from "jetcode-scrubjs";
import { GameState } from "../services/game.state";

export class AbstractButtonSprite extends Sprite {
    onClickCallback;
    clickSound = 'public/sounds/click.mp3';

    originalImage = null;
    label = '';
    color = 'white';
    fontSize = 16;

    init(){
        this.onReady(this.onReadyCallback.bind(this));
        this.forever(this.control);
        this.pen(this.drawLabel.bind(this));
    }

    control(){
        if (this.touchMouse()) {
            if (this.costumes.length > 0) {
                this.switchCostume(1);
            }

            if (!GameState.getInstance().isDraggableObjectActive && this.game.mouseDownOnce() && this.onClickCallback) {
                if (this.clickSound) {
                    this.playSound('click', {
                        volume: 0.05
                    });
                }

                this.onClickCallback();
            }

        } else {
            this.switchCostume(0);
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

    drawLabel(context, button) {
        context.font = this.fontSize + 'px Arial';
        context.fillStyle = this.color;
        context.textAlign = 'center';
        context.fillText(this.label, button.x, button.y + 5);
    }

    setLabel(text, color = 'white', fontSize = 18) {
        this.label = text;
        this.color = color;
        this.fontSize = fontSize;
    }
}
