import {AbstractDragAndDropSprite} from "./abstract-drag-and-drop.sprite";

export class DragAndDropSprite extends AbstractDragAndDropSprite {
    minSize = 1400;
    maxSize = 1800;

    init(){
        this.addCostume('public/images/button.png');

        super.init();
    }

    control() {
        super.control();
        
    }
}
