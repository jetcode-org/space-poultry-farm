import {AbstractRootStage} from "./abstract-room.stage";

export class FarmRoomStage extends AbstractRootStage {
    init() {
        super.init();

        this.forever(this.control());
    }

    control() {
        return () => {

        }
    }

    getLabel() {
        return 'Ферма';
    }

    getBackgroundImage() {
        return 'public/images/rooms/background_farm.png';
    }

    getThumbnailImage() {
        return 'public/images/rooms/thumbnails/background_farm.png';
    }

    resetRoom() {

    }

    roomTick () {
        // console.log('FarmRoomStage tick');
    }
}
