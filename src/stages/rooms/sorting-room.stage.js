import {AbstractRootStage} from "./abstract-room.stage";
import {ThumbnailRoomSprite} from "../../sprites/thumbnail-room.sprite";
import { ButtonSprite } from "../../sprites/button.sprite";
import { SliderSprite } from "../../sprites/slider.sprite";
import { MonitorStage } from "../monitor.stage";
import { IncubatorRoomStage } from "./incubator-room.stage";

export class SortingRoomStage extends AbstractRootStage {
    static SORTING_MAX_QUANTITY = 100;

    currentEggs = 0;

    init() {
        super.init();

        this.nextStage = 'Инкубатор';

        // this.onReady(()=>{
        //     this.monitorStage = MonitorStage.getInstance();
        // })

        this.quantitySlider = new SliderSprite();
        this.quantitySlider.layer = 4;
        this.quantitySlider.size = 150;
        this.quantitySlider.x = 300;
        this.quantitySlider.y = 200;
        this.quantitySlider.setWidth(200);
        
        //Холодильник
        this.coolerButton = new ButtonSprite();
        this.coolerButton.minSize = 600;
        this.coolerButton.maxSize = 650;
        this.coolerButton.onClick(()=>{
            const moveQuantity = this.quantitySlider.currentValue;
            this.gameState.cooledEggs += moveQuantity;
            this.currentEggs -= moveQuantity;
            this.quantitySlider.maxValue = this.currentEggs;
            this.quantitySlider.setCurrentValue()
        });
        this.coolerButton.x = 300;
        this.coolerButton.y = 300;
        this.coolerButton.layer = 4;
        this.coolerButton.onReady(()=>{
            this.coolerButton.setLabel('Холодильник', undefined, 7);
        })
        
        //инкубатор
        this.incubatorButton = new ButtonSprite();
        this.incubatorButton.minSize = 600;
        this.incubatorButton.maxSize = 650;
        this.incubatorButton.onClick(()=>{
            const moveQuantity = this.quantitySlider.currentValue;
            if (moveQuantity == 0) 
                return;
            for (let i = 0; i < this.monitorStage.rooms.length; i++){
                console.log(this.monitorStage.rooms[i].getLabel());
                if (this.monitorStage.rooms[i].getLabel() == 'Инкубатор') {
                    const potentialIncubator = this.monitorStage.rooms[i];
                    if (!potentialIncubator.inProgress && potentialIncubator.active) {
                        potentialIncubator.inProgress = true;
                        potentialIncubator.currentQuantity = moveQuantity;
                        this.currentEggs -= moveQuantity;
                        this.quantitySlider.maxValue = this.currentEggs;
                        this.quantitySlider.setCurrentValue()
                        return true;
                    }
                }
            }
            alert('Нет готовых инкубаторов');
            return false;
        });
        this.incubatorButton.x = 500;
        this.incubatorButton.y = 200;
        this.incubatorButton.layer = 4;
        this.incubatorButton.onReady(()=>{
            this.incubatorButton.setLabel('Инкубатор', undefined, 7);
        })

        this.quantitySlider.hidden = true;
        this.coolerButton.hidden = true;
        this.incubatorButton.hidden = true;

        this.forever(this.control());
        this.pen(this.drawParameters, 4)
    }
    
    control() {
        return () => {
            
        }
    }

    getLabel() {
        return 'Сортировка';
    }

    getBackgroundImage() {
        return 'public/images/rooms/background_sorting.png';
    }

    getThumbnailImage() {
        return 'public/images/rooms/thumbnails/background_sorting.png';
    }

    resetRoom() {

    }

    roomTick () {
        // console.log('SortingRoomStage tick');
        if (this.currentEggs > SortingRoomStage.SORTING_MAX_QUANTITY)
                this.currentEggs = SortingRoomStage.SORTING_MAX_QUANTITY;
        this.quantitySlider.maxValue = this.currentEggs;
        this.quantitySlider.setCurrentValue();
    }

    activate() {
        super.activate();

        this.quantitySlider.hidden = false;
        this.coolerButton.hidden = false;
        this.incubatorButton.hidden = false; 
    }

    drawParameters(context, sorting) {
        if (sorting.active) {
            context.font = '18px Arial';
            context.fillStyle = 'white';
            context.textAlign = 'start';
            
            context.fillText('Количество яиц: ' + sorting.currentEggs, 600, 200);
            context.fillText('Загрязненность: ' + sorting.pollution + '%', 600, 225);
        }
    }
}
