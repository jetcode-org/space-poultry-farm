import {AbstractRootStage} from "./abstract-room.stage";
import {ThumbnailRoomSprite} from "../../sprites/thumbnail-room.sprite";
import { ButtonSprite } from "../../sprites/button.sprite";
import { SliderSprite } from "../../sprites/slider.sprite";
import { IncubatorRoomStage } from "./incubator-room.stage";

export class SortingRoomStage extends AbstractRootStage {

    maxQuantity = 100;

    init() {
        super.init();

        this.nextStage = 'Инкубатор';

        // this.onReady(()=>{
        //     this.monitorStage = MonitorStage.getInstance();
        // })

        this.quantitySlider = new SliderSprite();
        this.quantitySlider.layer = 10;
        this.quantitySlider.size = 15;
        this.quantitySlider.x = 260;
        this.quantitySlider.y = 200;
        this.quantitySlider.setWidth(200);

        //Холодильник
        this.coolerButton = new ButtonSprite();
        this.coolerButton.minSize = 90;
        this.coolerButton.maxSize = 100;
        this.coolerButton.onClick(()=>{
            const moveQuantity = this.quantitySlider.currentValue;
            this.gameState.frozenEggs += Math.floor(moveQuantity * 0.9);
            this.currentQuantity -= moveQuantity;
            this.quantitySlider.maxValue = this.currentQuantity;
            this.quantitySlider.setCurrentValue()
        });
        this.coolerButton.x = 290;
        this.coolerButton.y = 300;
        this.coolerButton.layer = 10;
        this.coolerButton.onReady(()=>{
            this.coolerButton.setLabel('Холодильник', undefined, 70);
        })

        //инкубатор
        this.incubatorButton = new ButtonSprite();
        this.incubatorButton.minSize = 90;
        this.incubatorButton.maxSize = 100;
        this.incubatorButton.onClick(()=>{
            const moveQuantity = this.quantitySlider.currentValue;
            if (moveQuantity === 0) {
                return;
            }

            for (let i = 0; i < this.monitorStage.rooms.length; i++){
                if (this.monitorStage.rooms[i].getLabel() == 'Инкубатор') {
                    const potentialIncubator = this.monitorStage.rooms[i];
                    if (!potentialIncubator.inProgress && potentialIncubator.active) {
                        potentialIncubator.inProgress = true;
                        potentialIncubator.currentQuantity = Math.floor(moveQuantity * 0.95);
                        this.currentQuantity -= moveQuantity;
                        this.quantitySlider.maxValue = this.currentQuantity;
                        this.quantitySlider.setCurrentValue();
                        return true;
                    }
                }
            }

            showModal('Нет готовых инкубаторов', () => this.stop(), () => this.run());

            return false;
        });
        this.incubatorButton.x = 500;
        this.incubatorButton.y = 200;
        this.incubatorButton.layer = 10;
        this.incubatorButton.onReady(()=>{
            this.incubatorButton.setLabel('Инкубатор', undefined, 70);
        })

        this.quantitySlider.hidden = true;
        this.coolerButton.hidden = true;
        this.incubatorButton.hidden = true;

        this.forever(this.control());
        this.pen(this.drawParameters, 10)
    }

    control() {
        return () => {

        }
    }

    getLabel() {
        return 'Сортировка';
    }

    getHelpText() {
        return 'Сортировка - отсек для обработки и распределения яиц между криокамерой и инкубатором.';
    }

    getInstructionText() {
        return 'Распределяйте яйца между криокамерой (для выполнения миссии) и инкубатором (для пополнения поголовья)';
    }

    getBackgroundImage() {
        return 'public/images/rooms/background_sorting.png';
    }

    getThumbnailImage() {
        return 'public/images/rooms/thumbnails/background_sorting.png';
    }

    resetRoom() {
        super.resetRoom();

        this.currentQuantity = 20;
    }

    roomTick () {
        super.roomTick();
        this.tickCount += 1;

        if (this.tickCount > this.tickMaxCount) {
            this.tickCount = 0;
        }

        if (this.currentQuantity > this.maxQuantity) {
            this.currentQuantity = this.maxQuantity;
        }

        this.isRoomReady = this.currentQuantity >= this.maxQuantity;
        this.quantitySlider.maxValue = this.currentQuantity;
        this.quantitySlider.setCurrentValue();
    }

    activate() {
        super.activate();

        this.quantitySlider.hidden = false;
        this.coolerButton.hidden = false;
        this.incubatorButton.hidden = false;
    }

	drawParameters(context, sorting) {
		super.drawParameters(context)
        if (sorting.active) {
            context.font = '16px Arial';
            context.fillStyle = 'white';
            context.textAlign = 'start';

            context.fillText('Количество яиц: ' + sorting.currentQuantity, 610, 190);
            context.fillText('Загрязненность: ' + sorting.pollution + '%', 610, 215);
        }
    }

    drawHelp(context) {
		super.drawHelp(context);
	}
}
