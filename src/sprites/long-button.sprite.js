import {AbstractButtonSprite} from "./abstract-button.sprite";

export class LongButtonSprite extends AbstractButtonSprite {
    init(){
        this.addCostume('public/images/ui/long_button/default.png');
        this.addCostume('public/images/ui/long_button/hovered.png');
        this.addCostume('public/images/ui/long_button/disabled.png');

        super.init();
    }
}
