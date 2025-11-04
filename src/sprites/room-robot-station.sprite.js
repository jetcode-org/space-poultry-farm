import {Sprite} from "jetcode-scrubjs";
import {AbstractButtonSprite} from "./abstract-button.sprite";

export class RoomRobotStationSprite extends AbstractButtonSprite {
    minSize = 1400;
    maxSize = 1800;

    init(){
        this.addCostume('public/images/button.png');

        super.init();
    }
}
