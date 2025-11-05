import {Sprite} from "jetcode-scrubjs";
import { GameState } from "../services/game.state";

export class AbstractButtonSprite extends Sprite {
    minSize = 400;
    maxSize = 500;
    onClickCallback;

    init(){
        this.forever(this.control);
    }

    control(){
        if (this.touchMouse()) {
            if (!GameState.getInstance().isDraggableObjectActive) {

                this.size = (this.maxSize - this.size) / 3;
                
                if (this.game.mouseDownOnce() && this.onClickCallback) {
                    this.onClickCallback();
                }
            }

        } else {
            this.size = (this.minSize - this.size) / 3;
        }
    }

    onClick(callback) {
        this.onClickCallback = callback.bind(callback.context);
    }

    setLabel(text, color = 'white', fontSize = 10) {
        const context = this.getCostume().image.getContext('2d');

        context.font = fontSize + 'px Arial';
        context.fillStyle = color;
        context.textAlign = 'center';
        context.fillText(text, 0, 2);
    }
}
