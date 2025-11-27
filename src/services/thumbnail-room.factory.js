import {ThumbnailRoomSprite} from "../sprites/thumbnail-room.sprite";
import {IncubatorRoomStage} from "../stages/rooms/incubator-room.stage";
import {MenuStage} from "../stages/menu.stage";
import {RobotStationSprite} from "../sprites/robot-station.sprite";
import {GameState} from "./game.state";


export class ThumbnailRoomFactory {
    static build(monitorStage, room, x, y, chargeDif = 5) {
        const label = room.getLabel();
        const thumbnailImages = room.getThumbnailImages();

        const thumbnail = new ThumbnailRoomSprite(monitorStage, 1, thumbnailImages);
        thumbnail.x = x;
        thumbnail.y = y;

        let robotSlot;
        if (room.getRoomType() !== GameState.EMPTY_ROOM_TYPE && room.getRoomType() !== GameState.SORTING_ROOM_TYPE) {
            robotSlot = new RobotStationSprite(monitorStage);
            robotSlot.x = x - 30;
            robotSlot.y = y - 15;
            robotSlot.layer = 4;
            robotSlot.addTag('cleanStation');
            robotSlot.size = 70;
            robotSlot.room = room;
        }

        room.robotChargeDif = chargeDif;
        room.setThumbnail(thumbnail);

        thumbnail.onReady(() => {
            //thumbnail.setLabel(label, 'white', 15);
        });

        thumbnail.onClick(() => {
            if (robotSlot && robotSlot.touchMouse()) {
                return;
            }

            monitorStage.game.run(room);
        });

        thumbnail.forever(() => {
            if (thumbnail.touchMouse()) {
                monitorStage.showHelp(room.getHelpText());
            }
        });

        return thumbnail;
    }
}
