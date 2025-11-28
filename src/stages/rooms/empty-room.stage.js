import {AbstractRootStage} from "./abstract-room.stage";
import {ThumbnailRoomSprite} from "../../sprites/thumbnail-room.sprite";
import {GameState} from "../../services/game.state";
import {MonitorStage} from "../monitor.stage";
import {LongButtonSprite} from "../../sprites/long-button.sprite";

export class EmptyRoomStage extends AbstractRootStage {
    maxQuantity = 100;

    shopRooms = [];

    roomsConfig = [
        GameState.INCUBATOR_ROOM_TYPE,
        GameState.NURSERY_ROOM_TYPE,
        GameState.COOP_ROOM_TYPE,
        GameState.FARM_ROOM_TYPE
    ];

    init() {
        super.init();

        this.buyButton = new LongButtonSprite(this, 5);
        this.buyButton.x = 273;
        this.buyButton.y = 540;
        this.buyButton.hidden = true;
        this.buyButton.setLabel('Выберите здание ...');

        this.forever(this.control());
        this.pen(this.drawBlock.bind(this), 3);

        this.addSound('public/sounds/buy_room.mp3', 'buy');

        this.onReady(() => {
            this.createShopRooms();
        });
    }

    createShopRooms() {
        let inRow = 0;
        const startX = 200;
        const startY = 270;
        const gap = 150;

        let x = startX;
        let y = startY;

        for (const roomType of this.roomsConfig) {
            const roomConfig = this.gameState.roomsConfig[roomType];

            const shopRoom = new ThumbnailRoomSprite(this, 5, roomConfig.shopImages);
            this.shopRooms.push(shopRoom);

            shopRoom.minSize = 200;
            shopRoom.maxSize = 210;
            shopRoom.x = x;
            shopRoom.y = y;
            shopRoom.name = roomConfig.name;
            shopRoom.help = roomConfig.helpText;

            shopRoom.onClick(() => {
                for (const anyShopRoom of this.shopRooms) {
                    if (anyShopRoom === shopRoom) {
                        anyShopRoom.setDisabled(true);

                        this.buyButton.hidden = false;
                        this.buyButton.setLabel('Построить ' + shopRoom.name);
                        this.buyButton.help = 'Построить ' + shopRoom.name + ' за ' + roomConfig.cost;

                        this.buyButton.onClick(() => {
                            this.createRoom(roomType, roomConfig.cost);
                        });

                    } else {
                        anyShopRoom.setDisabled(false);
                    }
                }
            });

            shopRoom.pen((context, thumbnailRoom) => {
                context.font = '16px Arial';
                context.fillStyle = 'white';
                context.textAlign = 'start';

                context.fillText(roomConfig.name, thumbnailRoom.x - 50, thumbnailRoom.y - 35);
                context.fillText('Цена: ' + roomConfig.cost + '₽', thumbnailRoom.x - 50, thumbnailRoom.y + 42);
            });

            x += gap;
            inRow++;

            if (inRow % 2 === 0) {
                x = startX;
                y += gap;
            }
        }
    }

    createRoom(roomType, cost) {
        if (this.gameState.money < cost) {
            showModal('Ошибка', 'Недостаточно денег', () => this.stop(), () => this.run());

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

    getParameters() {
        return [];
    }

    drawBlock(context) {
        context.fillStyle = "rgba(0, 0, 0, 0.5)";
        context.fillRect(0, 0, 600, 600);

        context.font = '20px Arial';
        context.fillStyle = 'white';
        context.textAlign = 'start';

        context.fillText('Выберите модуль:', 136, 180);
    }

    getParameters() {
        return [
            ['Свободный отсек', 'преобразуется в один из производственных модулей. Выбор зависит от вашей стратегии развития фермы.'],
        ];
    }
}
