import {Sprite} from "jetcode-scrubjs";
import {AbstractSliderSprite} from "./abstract-slider.sprite";

export class SliderSprite extends AbstractSliderSprite {
    minSize = 1400;
    maxSize = 1800;

    init(){
        this.addCostume('public/images/button.png');

        super.init();
    }
}
