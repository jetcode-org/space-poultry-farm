import {ThumbnailRoomSprite} from "../sprites/thumbnail-room.sprite";
import {IncubatorRoomStage} from "../stages/rooms/incubator-room.stage";
import {MenuStage} from "../stages/menu.stage";

export class ThumbnailRoomFactory {
    static build(stage, room, x, y) {
        const label = room.getLabel();
        const thumbnailImage = room.getThumbnailImage();

        const thumbnail = new ThumbnailRoomSprite(stage, 1, [thumbnailImage]);
        thumbnail.x = x;
        thumbnail.y = y;

        room.setThumbnail(thumbnail);

        if (room.active) {
            thumbnail.activate();
        }

        thumbnail.onReady(() => {
            //thumbnail.setLabel(label, 'white', 15);
        });

        thumbnail.onClick(() => {
            stage.game.run(room);
        });

        return thumbnail;
    }
}
