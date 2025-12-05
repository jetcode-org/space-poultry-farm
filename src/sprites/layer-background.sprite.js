import {Sprite} from "jetcode-scrubjs";

export class LayerBackgroundSprite extends Sprite {

    init(){
        this.forever(this.control)
    }

    static create(layer, image, size = 150) {
        const sprite = new LayerBackgroundSprite();

        sprite.addCostume(image);
        sprite.layer = layer;
        sprite.bg = 20 - layer * 2;

        sprite.size = size;

        return sprite;
    }

    control(){
        const mousePoint = this.game.getMousePoint();

        this.x = this.stage.width / 2 + (mousePoint.x - this.stage.width / 2) / this.bg;
    }
}
