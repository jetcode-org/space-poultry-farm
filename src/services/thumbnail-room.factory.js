import {ThumbnailRoomSprite} from "../sprites/thumbnail-room.sprite";
import {IncubatorRoomStage} from "../stages/rooms/incubator-room.stage";
import {MenuStage} from "../stages/menu.stage";
import {RobotStationSprite} from "../sprites/robot-station.sprite";
import {GameState} from "./game.state";


export class ThumbnailRoomFactory {
    static build(monitorStage, room, x, y, chargeDif = 5) {
        const label = room.getLabel();
        const thumbnailImage = room.getThumbnailImage();

        const thumbnail = new ThumbnailRoomSprite(monitorStage, 1, [thumbnailImage]);
        thumbnail.x = x;
        thumbnail.y = y;

        if (room.getRoomType() !== GameState.EMPTY_ROOM_TYPE) {
            const robotSlot = new RobotStationSprite(monitorStage);
            robotSlot.x = x - 30;
            robotSlot.y = y - 15;
            robotSlot.layer = 4;
            robotSlot.addTag('cleanStation');
            robotSlot.size = 40;
            robotSlot.room = room;
        }

        room.robotChargeDif = chargeDif;
        room.setThumbnail(thumbnail);

        if (room.active) {
            thumbnail.activate();
        }

        thumbnail.onReady(() => {
            //thumbnail.setLabel(label, 'white', 15);
        });

        thumbnail.onClick(() => {
            if (room.active) {
                monitorStage.game.run(room);
            }
        });

        thumbnail.forever(() => {
            if (thumbnail.touchMouse()) {
                monitorStage.showHelp(room.getHelpText());
            }
        });

        return thumbnail;
    }
}
