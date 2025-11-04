import {Sprite} from "jetcode-scrubjs";

export class RobotStationSprite extends Sprite {

    init(){
        this.addCostume('public/images/icon_droid_charging.png');
        this.size = 100;
        this.filter = 'grayscale(100%)';

        this.forever(this.logic);
    }

    logic(){

    }
}
