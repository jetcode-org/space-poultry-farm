import { Sprite } from "jetcode-scrubjs";
import { GameState } from "../services/game.state";

export class AbstractDragAndDropSprite extends Sprite {
    minSize = 18;
    maxSize = 20;
    onClickCallback;

    active = false;
    canMove = true;

    drawValue = false;

    currentValue = 0;

    init() {
        this.forever(this.control);
        this.pen(this.setLabel, 4);
    }

    control() {
        if (this.touchMouse()) {
            if (this.game.mouseDown() && !GameState.getInstance().isDraggableObjectActive) {
                this.active = true;
                GameState.getInstance().isDraggableObjectActive = true;
            }
        }
        if (!this.game.mouseDown()) {
            this.active = false;
            GameState.getInstance().isDraggableObjectActive = false;
        }
        if (this.active) {
            if (this.canMove) {
                this.x = this.game.getMousePoint().x;
                this.y = this.game.getMousePoint().y;
            }
        }
    }

    setLabel(context, sprite) {
        if (sprite.drawValue) {
            context.font = '10px Arial';
            context.fillStyle = 'white';
            context.textAlign = 'center';
            context.fillText(sprite.currentValue, sprite.x, sprite.y + 3);
        }
    }
}
