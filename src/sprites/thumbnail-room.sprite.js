import {AbstractButtonSprite} from "./abstract-button.sprite";

export class ThumbnailRoomSprite extends AbstractButtonSprite {
    active = false;

    init() {
        this.drawCostume(() => {}); // Костыль - без этого не работает клик (

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
}
