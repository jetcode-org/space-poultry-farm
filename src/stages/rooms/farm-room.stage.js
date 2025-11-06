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

    getHelpText() {
        return 'Ферма - гидропонный комплекс производства кормовых культур.';
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
        this.tickCount += 1;
        if (this.tickCount > this.tickMaxCount) {
            this.tickCount = 0;
            if (this.gameState.manure > 10 && this.gameState.eggshell > 5) {
                this.gameState.manure -= 10;
                this.gameState.eggshell -= 5;
                this.gameState.food += 15;
            }
        }
    }
}
