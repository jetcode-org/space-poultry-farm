import { ButtonSprite } from "../../sprites/button.sprite";
import { AbstractRootStage } from "./abstract-room.stage";
import { MonitorStage } from "../monitor.stage";

export class IncubatorRoomStage extends AbstractRootStage {
    static INCUBATOR_CYCLE_TIMER = 10;
    static INCUBATOR_READY_LIMIT = 10;

    inProgress = false;
    currentProgress = 0;
    currentReadyProgress = 0;
    tickMaxCount = 0;

    init() {
        super.init();

        this.forever(this.control());
        this.pen(this.drawParameters, 4);

        this.nextButton = new ButtonSprite();
        this.nextButton.x = 690;
        this.nextButton.y = 500;

        
        this.visualiser.moving = false;


        this.nextButton.onReady(() => {
            this.nextButton.setLabel('Перевести циплят', undefined, 5)
        });
        this.nextButton.onClick(() => {
            let chicksMultiplayer = 0.02 * Math.floor(this.pollution / 10);
            let quantityToMove = Math.round(this.currentQuantity * (0.9 - chicksMultiplayer))
            for (let i = 0; i < this.monitorStage.rooms.length; i++) {
                if (this.monitorStage.rooms[i].getLabel() == 'Ясли') {
                    const potentialNursery = this.monitorStage.rooms[i];
					if (!potentialNursery.inProgress && potentialNursery.active) {

                        potentialNursery.inProgress = true;
                        potentialNursery.currentQuantity = quantityToMove;
                        this.gameState.eggshell += Math.floor(quantityToMove / 2);
                        this.failRoom();
                        return true;
                    }
                }
            }
        })
        this.nextButton.hidden = true;
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
        return 'Инкубатор';
    }

    getBackgroundImage() {
        return 'public/images/rooms/background_incubator.png';
    }

    getThumbnailImage() {
        return 'public/images/rooms/thumbnails/background_incubator.png';
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

    roomTick() {
        super.roomTick();
        if (this.inProgress) {
            this.tickCount += 1;
            if (this.tickCount > this.tickMaxCount) {
                this.tickCount = 0
                this.currentProgress += 1;
                if (this.currentProgress >= IncubatorRoomStage.INCUBATOR_CYCLE_TIMER) {
                    this.currentProgress = IncubatorRoomStage.INCUBATOR_CYCLE_TIMER
                    this.isRoomReady = true;
                }
            }
            if (this.isRoomReady) {
                this.currentReadyProgress += 1;
                if (this.currentReadyProgress > IncubatorRoomStage.INCUBATOR_READY_LIMIT) {
                    this.pollution += Math.round(this.currentQuantity * 0.4);
                    //this.visualizerSpawn();
                }
            }
        }
    }

	drawParameters(context, incubator) {
		super.drawParameters(context)
        if (incubator.active) {
            context.font = '18px Arial';
            context.fillStyle = 'white';
            context.textAlign = 'start';

            context.fillText('Работает: ' + incubator.inProgress, 615, 200);
            context.fillText('Сколько яиц: ' + incubator.currentQuantity, 615, 225);
            context.fillText('Загрязненность: ' + incubator.pollution + '%', 615, 250);
            context.fillText('Готовность: ' + incubator.currentProgress, 615, 275);
            if (incubator.currentProgress >= IncubatorRoomStage.INCUBATOR_CYCLE_TIMER) {
                context.fillText('Осталось: ' + (IncubatorRoomStage.INCUBATOR_CYCLE_TIMER - incubator.currentReadyProgress), 615, 300);
            }
        }
    }

    activate() {
        super.activate();
    }

    setVisCostumes() {
		super.setVisCostumes()

		this.visualiser.addCostume('public/images/egg_sprite_1.png')
		this.visualiser.addCostume('public/images/egg_sprite_2.png')
		this.visualiser.addCostume('public/images/egg_sprite_3.png')
	}
}
