import {Sprite} from "jetcode-scrubjs";

export class MenubackgroundSprite extends Sprite {
    static instance;

    constructor(stage) {
        super(stage);
    }

    init(){
        this.size = 300;

        this.forever(this.logic)
    }

    static getInstance(layer, image) {
        MenubackgroundSprite.instance = new MenubackgroundSprite();

        MenubackgroundSprite.instance.addCostume("public/images/menu/" + image + ".png");
        MenubackgroundSprite.instance.layer = layer;
        MenubackgroundSprite.instance.bg = 10 - layer * 2;

        return MenubackgroundSprite.instance;

    }

    logic(){
        const pos = this.game.getMousePoint()

        this.x = this.stage.width / 2 + (pos.x - this.stage.width / 2) / this.bg
    }
}
