import {AbstractDragAndDropSprite} from "./abstract-drag-and-drop.sprite";

export class DragAndDropSprite extends AbstractDragAndDropSprite {
    minSize = 18;
    maxSize = 20;

    init(){
        this.addCostume('public/images/ui/button.png');

        super.init();
    }

    control() {
        super.control();

    }
}
