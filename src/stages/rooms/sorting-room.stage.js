import {AbstractRootStage} from "./abstract-room.stage";
import {ThumbnailRoomSprite} from "../../sprites/thumbnail-room.sprite";

export class SortingRoomStage extends AbstractRootStage {

    init() {
        super.init();

        this.forever(this.control());
    }

    control() {
        return () => {

        }
    }

    getLabel() {
        return 'Сортировка';
    }

    getBackgroundImage() {
        return 'public/images/rooms/background_sorting.png';
    }

    getThumbnailImage() {
        return 'public/images/rooms/thumbnails/background_sorting.png';
    }

    resetRoom() {

    }

    roomTick () {
        console.log('SortingRoomStage tick');
    }
}
