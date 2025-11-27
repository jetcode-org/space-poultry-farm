import { AbstractDragAndDropSprite } from "./abstract-drag-and-drop.sprite";

export class RobotSprite extends AbstractDragAndDropSprite {
    minSize = 1400;
    maxSize = 1800;

    charge = 100;

    isCharging = false;
    startX = 0;
    startY = 0;

    stationRoom = null;

    init() {
        this.addCostume('public/images/sprites/drone/drone_active.png')
        this.addCostume('public/images/sprites/drone/drone_charging.png')

        this.size = 25;

        super.init();
    }

    control() {
        super.control();

        if (this.charge >= 100) {
            this.charge = 100;
        }

        if (this.charge <= 0) {
            this.charge = 0;
            this.switchCostume(1);
        } else {
            this.switchCostume(0);
        }

        this.drawValue = this.touchMouse();

        if (this.touchMouse() && this.game.mouseDown()) {
            this.size = 25;
            if (this.stationRoom) {
                this.stationRoom.robot = null;
                this.stationRoom = null;
            }
        }
        else {
            if (this.touchTag('cleanStation') && this.charge > 0) {
                const station = this.otherSprite;
                station.room.isCleaning = true;
                this.stationRoom = station.room;
                this.stationRoom.robot = this;
                this.x = station.x;
                this.y = station.y;
                this.size = station.size;
                this.isCharging = false;
            } else {
                this.x = this.startX;
                this.y = this.startY;
                this.isCharging = true;
                this.size = 50;
                if (this.stationRoom) {
                    this.stationRoom.robot = null;
                    this.stationRoom = null;
                }
            }
        }
    }

    setStartPos(){
        this.startX = this.x;
        this.startY = this.y;
    }

    setLabel(context, sprite) {
        if (sprite.drawValue) {
            context.font = '16px Arial';
            context.fillStyle = '#fff';
            context.textAlign = 'center';
            context.fillText(sprite.charge, sprite.x, sprite.y - 7);
        }
    }
}
