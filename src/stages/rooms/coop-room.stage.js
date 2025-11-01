import {AbstractRootStage} from "./abstract-room.stage";

export class CoopRoomStage extends AbstractRootStage {
    static COOP_MAX_QUANTITY = 100;

    currentQuantity = 0;
    tickCount = 0;
    
    init() {
        super.init();

        this.forever(this.control());
        this.pen(this.drawParameters, 4);
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
        // console.log('CoopRoomStage tick');
    }

    drawParameters(context, coop) {
        if (coop.active) {
            context.font = '18px Arial';
            context.fillStyle = 'white';
            context.textAlign = 'start';

            context.fillText('Сколько куриц: ' + coop.currentQuantity, 615, 200);
            context.fillText('Загрязненность: ' + coop.pollution + '%', 615, 225);
        }
    }
}
