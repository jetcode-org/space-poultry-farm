import {AbstractRootStage} from "./abstract-room.stage";

export class IncubatorRoomStage extends AbstractRootStage {
    init() {
        super.init();

        this.forever(this.control());
    }

    control() {
        return () => {

        }
    }

    getLabel() {
        return 'Инкубатор';
    }

    getBackgroundImage() {
        return 'public/images/rooms/background_incubator.png';
    }

    getThumbnailImage() {
        return 'public/images/rooms/thumbnails/background_incubator.png';
    }

    resetRoom() {

    }

    roomTick () {
        console.log('IncubatorRoomStage tick');
    }
}
