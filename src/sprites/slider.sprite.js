import {Sprite} from "jetcode-scrubjs";
import {AbstractSliderSprite} from "./abstract-slider.sprite";

export class SliderSprite extends AbstractSliderSprite {
    minSize = 18;
    maxSize = 20;

    init(){
        this.addCostume('public/images/ui/standard_button/default.png');
        this.addCostume('public/images/ui/space_progress/ship.png')

        super.init();
    }
}
