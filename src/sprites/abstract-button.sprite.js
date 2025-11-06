import {Sprite} from "jetcode-scrubjs";
import { GameState } from "../services/game.state";

export class AbstractButtonSprite extends Sprite {
    minSize = 100;
    maxSize = 125;
    onClickCallback;
    clickSound = 'public/sounds/click.mp3';

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
        const context = this.getCostume().image.getContext('2d');

        context.font = fontSize + 'px Arial';
        context.fillStyle = color;
        context.textAlign = 'center';
        context.fillText(text, 0, 15);
    }
}
