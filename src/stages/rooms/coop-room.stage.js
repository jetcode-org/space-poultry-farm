import {AbstractRootStage} from "./abstract-room.stage";

export class CoopRoomStage extends AbstractRootStage {
    init() {
        super.init();

        this.forever(this.control());
    }

    control() {
        return () => {

        }
    }

    getLabel() {
        return 'Стадо';
    }

    getBackgroundImage() {
        return 'public/images/rooms/background_coop.png';
    }

    getThumbnailImage() {
        return 'public/images/rooms/thumbnails/background_coop.png';
    }

    resetRoom() {

    }

    roomTick () {
        console.log('CoopRoomStage tick');
    }

}
