import {AbstractButtonSprite} from "./abstract-button.sprite";

export class ButtonSprite extends AbstractButtonSprite {
    minSize = 100;
    maxSize = 125;

    init(){
        this.addCostume('public/images/ui/button.png');

        super.init();
    }
}
