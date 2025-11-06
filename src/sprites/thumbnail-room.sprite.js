import {AbstractButtonSprite} from "./abstract-button.sprite";

export class ThumbnailRoomSprite extends AbstractButtonSprite {
    minSize = 400;
    maxSize = 415;
    active = false;

    init() {
        this.drawCostume(() => {}); // Костыль - без этого не работает клик (
        this.filter = 'grayscale(100%)';

        super.init();
    }

    activate() {
        if (this.active) {
            return;
        }

        this.filter = 'grayscale(0)';
        this.active = true;
    }

    deactivate() {
        this.filter = 'grayscale(100%)';
        this.active = false;
    }

    // control() {

    // }
}
