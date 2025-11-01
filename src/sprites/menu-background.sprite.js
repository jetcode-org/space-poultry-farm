import {Sprite} from "jetcode-scrubjs";

export class MenuBackgroundSprite extends Sprite {
    static instance;

    constructor(stage) {
        super(stage);
    }

    init(){
        this.size = 300;

        this.forever(this.logic)
    }

    static getInstance(layer, image) {
        MenuBackgroundSprite.instance = new MenuBackgroundSprite();

        MenuBackgroundSprite.instance.addCostume("public/images/menu/" + image + ".png");
        MenuBackgroundSprite.instance.layer = layer;
        MenuBackgroundSprite.instance.bg = 10 - layer * 2;

        return MenuBackgroundSprite.instance;

    }

    logic(){
        const pos = this.game.getMousePoint()

        this.x = this.stage.width / 2 + (pos.x - this.stage.width / 2) / this.bg
    }
}
