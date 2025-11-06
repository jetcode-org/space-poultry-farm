import {Sprite} from "jetcode-scrubjs";
import {AbstractSliderSprite} from "./abstract-slider.sprite";

export class SliderSprite extends AbstractSliderSprite {
    minSize = 1400;
    maxSize = 1800;

    init(){
        this.addCostume('public/images/button.png');
        this.addCostume('public/images/sliderSprites/slider_ship_1.png')

        super.init();
    }
}
