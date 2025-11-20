import {AbstractButtonSprite} from "./abstract-button.sprite";

export class InfoButtonSprite extends AbstractButtonSprite {
    minSize = 200;
    maxSize = 225;

    init(){
        this.addCostume('public/images/icons/info.png');

        super.init();
    }
}
