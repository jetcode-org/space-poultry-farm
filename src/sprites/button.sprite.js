import {Sprite} from "jetcode-scrubjs";
import {AbstractButtonSprite} from "./abstract-button.sprite";

export class ButtonSprite extends AbstractButtonSprite {
    minSize = 100;
    maxSize = 125;

    init(){
        this.addCostume('public/images/button.png');

        super.init();
    }
}
