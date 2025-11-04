import { AbstractDragAndDropSprite } from "./abstract-drag-and-drop.sprite";

export class RobotSprite extends AbstractDragAndDropSprite {
    minSize = 1400;
    maxSize = 1800;

    init() {
        this.addCostume('public/images/icon_droid_active.png')
        this.addCostume('public/images/icon_droid_charging.png')

        super.init();
    }

    control() {
        super.control();

    }
}
