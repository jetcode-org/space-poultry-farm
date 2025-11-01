import {AbstractRootStage} from "./abstract-room.stage";

export class NurseryRoomStage extends AbstractRootStage {
    init() {
        super.init();

        this.forever(this.control());
    }

    control() {
        return () => {

        }
    }

    getLabel() {
        return 'Ясли';
    }

    getBackgroundImage() {
        return 'public/images/rooms/background_nursery.png';
    }

    getThumbnailImage() {
        return 'public/images/rooms/thumbnails/background_nursery.png';
    }

    resetRoom() {

    }

    roomTick () {
        console.log('NurseryRoomStage tick');
    }
}
