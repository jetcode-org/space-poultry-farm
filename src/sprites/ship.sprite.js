import {Sprite} from "jetcode-scrubjs";
import {AbstractSliderSprite} from "./abstract-slider.sprite";

export class ShipSprite extends AbstractSliderSprite {
    minSize = 18;
    maxSize = 20;

    init(){
        this.addCostume('public/images/sliderSprites/slider_ship_1.png')

        super.init();
    }
}
