import {AbstractRootStage} from "./abstract-room.stage";
import {CoopRoomStage} from "./coop-room.stage";
import { ButtonSprite } from "../../sprites/button.sprite";

export class NurseryRoomStage extends AbstractRootStage {
    static NURSEY_CYCLE_TIMER = 10;
    static NURSEY_READY_LIMIT = 10;
    
    inProgress = false;
    currentQuantity = 0;
    currentProgress = 0;
    currentReadyProgress = 0;
    
    init() {
        super.init();

        this.forever(this.control());
        this.pen(this.drawParameters, 4);

        this.nextButton = new ButtonSprite();
        this.nextButton.x = 690;
        this.nextButton.y = 500;
        this.nextButton.onReady(()=>{
            this.nextButton.setLabel('Куриц в загон', undefined, 5)
        });
        this.nextButton.onClick(()=>{
            for (let i = 0; i < this.monitorStage.rooms.length; i++){
                console.log(this.monitorStage.rooms[i].getLabel());
                if (this.monitorStage.rooms[i].getLabel() == 'Стадо') {
                    const potentialCoop = this.monitorStage.rooms[i];
                    if (potentialCoop.active && potentialCoop.currentQuantity != CoopRoomStage.COOP_MAX_QUANTITY) {
                        if (CoopRoomStage.COOP_MAX_QUANTITY - potentialCoop.currentQuantity < this.currentQuantity) {
                            potentialCoop.currentQuantity += CoopRoomStage.COOP_MAX_QUANTITY - potentialCoop.currentQuantity;
                            this.currentQuantity -= CoopRoomStage.COOP_MAX_QUANTITY - potentialCoop.currentQuantity;
                            continue;
                        }
                        else {
                            potentialCoop.currentQuantity += this.currentQuantity;
                        }

                        this.failRoom();
                        return true;
                    }
                }
            }
            alert ('Не получитлось перевести всех куриц');
            this.failRoom();
            return false;
        })
    }

    control() {
        return () => {
            if (this.isRoomReady)
                this.nextButton.hidden = false;
            else
                this.nextButton.hidden = true;
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
        this.inProgress = false;
        this.currentProgress = 0;
        this.currentReadyProgress = 0;
        this.currentQuantity = 0;
        this.isRoomReady = false;
        this.pollution = 0;
    }

    failRoom() {
        this.inProgress = false;
        this.currentProgress = 0;
        this.currentReadyProgress = 0;
        this.currentQuantity = 0;
        this.isRoomReady = false;
    }

    roomTick () {
        if (this.inProgress) {
            console.log('NurseryRoomStage tick');
            this.currentProgress += 1;
            if (this.currentProgress >= NurseryRoomStage.NURSEY_CYCLE_TIMER) {
                this.currentProgress = NurseryRoomStage.NURSEY_CYCLE_TIMER
                this.isRoomReady = true;
                this.currentReadyProgress += 1;
                if (this.currentReadyProgress > NurseryRoomStage.NURSEY_READY_LIMIT)
                    this.failRoom();
            }
        }
    }

    drawParameters(context, nursery) {
        if (nursery.active) {
            context.font = '18px Arial';
            context.fillStyle = 'white';
            context.textAlign = 'start';
    
            context.fillText('Работает: ' + nursery.inProgress, 615, 200);
            context.fillText('Сколько циплят: ' + nursery.currentQuantity, 615, 225);
            context.fillText('Загрязненность: ' + nursery.pollution + '%', 615, 250);
            context.fillText('Готовность: ' + nursery.currentProgress, 615, 275);
            if (nursery.currentProgress >= NurseryRoomStage.NURSEY_CYCLE_TIMER){
                context.fillText('Осталось: ' + (NurseryRoomStage.NURSEY_CYCLE_TIMER - nursery.currentReadyProgress), 615, 300);
            }
        }
    }
}
