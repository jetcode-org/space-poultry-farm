import {AbstractButtonSprite} from "./abstract-button.sprite";

export class InfoButtonSprite extends AbstractButtonSprite {
    init(){
        this.addCostume('public/images/ui/standard_button/default.png');
        this.addCostume('public/images/ui/standard_button/hovered.png');
        this.addCostume('public/images/ui/standard_button/disabled.png');

        super.init();
    }
}
