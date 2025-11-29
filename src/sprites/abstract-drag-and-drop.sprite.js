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
        this.pen(this.setLabel.bind(this), 4);
        
        window.addEventListener('mousedown', this.activate.bind(this));
        window.addEventListener('mouseup', this.disactivate.bind(this));
    }

    control() {
        if (this.active) {
            if (this.canMove) {
                this.x = this.game.getMousePoint().x;
                this.y = this.game.getMousePoint().y;
            }
        }
    }

    disactivate(){
        this.active = false;
        GameState.getInstance().isDraggableObjectActive = false;
    }

    activate() {
        if (!this.deleted) {
            if (this.touchMouse() && !GameState.getInstance().isDraggableObjectActive) {
                this.active = true;
                GameState.getInstance().isDraggableObjectActive = true;
            }
        }
    }

    setLabel(context) {
        if (this.drawValue) {
            context.font = '10px Arial';
            context.fillStyle = 'white';
            context.textAlign = 'center';
            context.fillText(this.currentValue, this.x, this.y + 3);
        }
    }

    delete() {
        super.delete();
    }
}
