import {IncubatorRoomStage} from "../stages/rooms/incubator-room.stage";
import {SortingRoomStage} from "../stages/rooms/sorting-room.stage";
import {GameState} from "./game.state";
import {EmptyRoomStage} from "../stages/rooms/empty-room.stage";
import {NurseryRoomStage} from "../stages/rooms/nursery-room.stage";
import {CoopRoomStage} from "../stages/rooms/coop-room.stage";
import {FarmRoomStage} from "../stages/rooms/farm-room.stage";


export class RoomFactory {
    static build(roomType) {
        const room = RoomFactory.getRoomByType(roomType);

        return room;
    }

    static getRoomByType(roomType) {
        switch (roomType) {
            case GameState.EMPTY_ROOM_TYPE:
                return new EmptyRoomStage();

            case GameState.SORTING_ROOM_TYPE:
                return new SortingRoomStage();

            case GameState.INCUBATOR_ROOM_TYPE:
                return new IncubatorRoomStage();

            case GameState.NURSERY_ROOM_TYPE:
                return new NurseryRoomStage();

            case GameState.COOP_ROOM_TYPE:
                return new CoopRoomStage();

            case GameState.FARM_ROOM_TYPE:
                return new FarmRoomStage();
        }


        return null;
    }

}
