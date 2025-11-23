import {AbstractRootStage} from "./abstract-room.stage";
import { ButtonSprite } from "../../sprites/button.sprite";
import {ThumbnailRoomSprite} from "../../sprites/thumbnail-room.sprite";
import {GameState} from "../../services/game.state";
import {RoomFactory} from "../../services/room.factory";
import {MonitorStage} from "../monitor.stage";

export class EmptyRoomStage extends AbstractRootStage {
    maxQuantity = 100;

    rooms = [
        GameState.INCUBATOR_ROOM_TYPE,
        GameState.NURSERY_ROOM_TYPE,
        GameState.COOP_ROOM_TYPE,
        GameState.FARM_ROOM_TYPE
    ];

    init() {
        super.init();

        this.pen(this.drawParameters, 1);
        this.forever(this.control());

        this.onReady(() => {
            this.createShopRooms();
        });

        this.addSound('public/sounds/buy_room.mp3', 'buy');
    }

    createShopRooms() {
        let inRow = 0;
        let x = 100;
        let y = 340;

        for (const roomType of this.rooms) {
            const roomConfig = this.gameState.roomsConfig[roomType];

            const shopRoom = new ThumbnailRoomSprite(this, 5, [
                roomConfig.shopImage
            ]);

            shopRoom.minSize = 200;
            shopRoom.maxSize = 210;
            shopRoom.x = x;
            shopRoom.y = y;

            shopRoom.onClick(() => {
                this.createRoom(roomType, roomConfig.cost);
            });

            shopRoom.pen((context, thumbnailRoom) => {
                context.font = '16px Arial';
                context.fillStyle = 'white';
                context.textAlign = 'start';

                context.fillText(roomConfig.name, thumbnailRoom.x - 35, thumbnailRoom.y - 25);
                context.fillText(roomConfig.cost, thumbnailRoom.x - 30, thumbnailRoom.y + 35);
            });

            x += 100;
            inRow++;

            if (inRow % 3 === 0) {
                x = 100;
                y += 100;
            }
        }
    }

    createRoom(roomType, cost) {
        if (this.gameState.money < cost) {
            showModal('Недостаточно денег', () => this.stop(), () => this.run());

            return false;
        }

        if (this.gameState.buy(cost)) {
            const x = this.thumbnail.x;
            const y = this.thumbnail.y;

            const room = this.monitorStage.createRoom(roomType, x, y);

            this.gameState.deleteRoom(this);
            this.gameState.addRoom(room);
            this.thumbnail.delete();

            this.playSound('buy');

            setTimeout(() => { // Костыль, бага ScrubJS - при создании сцены внутри цикла игра останавливается
                this.game.stop();
                this.game.run(MonitorStage.getInstance());

            }, 100);
        }
    }

    control() {
        return () => {

        }
    }

    getRoomType() {
        return GameState.EMPTY_ROOM_TYPE;
    }

    roomTick () {}

    drawParameters(context, sort) {
		super.drawParameters(context);

        context.fillStyle = "rgba(0, 0, 0, 0.2)";
        context.fillRect(50, 250, 500, 300);

        context.font = '20px Arial';
        context.fillStyle = 'white';
        context.textAlign = 'start';

        context.fillText('Выберите комнату:', 65, 280);
    }

    drawHelp(context) {
		super.drawHelp(context);
    }

}
