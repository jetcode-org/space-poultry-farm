import {AbstractRootStage} from "./abstract-room.stage";
import {ThumbnailRoomSprite} from "../../sprites/thumbnail-room.sprite";
import { ButtonSprite } from "../../sprites/button.sprite";
import { SliderSprite } from "../../sprites/slider.sprite";
import { IncubatorRoomStage } from "./incubator-room.stage";
import {GameState} from "../../services/game.state";
import {Sprite} from "jetcode-scrubjs";

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
        this.quantitySlider.size = 50;
        this.quantitySlider.x = 260;
        this.quantitySlider.y = 210;
        this.quantitySlider.setWidth(200);

        //Холодильник
        this.coolerButton = new ButtonSprite();
        this.coolerButton.onClick(()=>{
            const moveQuantity = this.quantitySlider.currentValue;
            if (moveQuantity === 0) {
                return;
            }

            this.gameState.frozenEggs += Math.floor(moveQuantity * 0.9);
            this.currentQuantity -= moveQuantity;
            this.quantitySlider.maxValue = this.currentQuantity;
            this.quantitySlider.setCurrentValue()
        });
        this.coolerButton.x = 290;
        this.coolerButton.y = 300;
        this.coolerButton.layer = 10;
        this.coolerButton.onReady(()=>{
            this.coolerButton.setLabel('Холодильник', null, 16);
        })

        //инкубатор
        this.incubatorButton = new ButtonSprite();
        this.incubatorButton.onClick(()=>{
            const moveQuantity = this.quantitySlider.currentValue;
            if (moveQuantity === 0) {
                return;
            }
            if (moveQuantity > 70) {
                this.helper.show('Не нужно перекладывать в инкубатор больше яиц, чем он может вместить (максимум 70)', GameState.BOSS_PERSON, GameState.ANGRY_PERSON_EMOTION);
                this.helper.onClick(()=>{
                    this.helper.show(this.gameState.getHeroAnswer(GameState.NORMAL_PERSON_EMOTION) + ', босс!', GameState.HERO_PERSON)
                    this.helper.onClick(()=>{
                        this.helper.hide();
                    }, 'Конец')
                }, 'Дальше')
                return
            }

            for (let i = 0; i < this.gameState.rooms.length; i++){
                if (this.gameState.rooms[i].getRoomType() === GameState.INCUBATOR_ROOM_TYPE) {
                    const potentialIncubator = this.gameState.rooms[i];

                    if (!potentialIncubator.inProgress) {
                        potentialIncubator.inProgress = true;
                        potentialIncubator.currentQuantity = Math.floor(moveQuantity * 0.95);
                        this.currentQuantity -= moveQuantity;
                        this.quantitySlider.maxValue = this.currentQuantity;
                        this.quantitySlider.setCurrentValue();

                        return true;
                    }
                }
            }

            showModal('Ошибка', 'Нет готовых инкубаторов', () => this.stop(), () => this.run());

            return false;
        });
        this.incubatorButton.x = 500;
        this.incubatorButton.y = 210;
        this.incubatorButton.layer = 10;
        this.incubatorButton.onReady(()=>{
            this.incubatorButton.setLabel('Инкубатор', null, 16);
        })

        this.quantitySlider.hidden = true;
        this.coolerButton.hidden = true;
        this.incubatorButton.hidden = true;

        const conveyor = new Sprite(this, 1, [
            'public/images/rooms/backgrounds/details/sorting/conveyor_1.png',
            'public/images/rooms/backgrounds/details/sorting/conveyor_2.png',
            'public/images/rooms/backgrounds/details/sorting/conveyor_3.png',
        ]);
        conveyor.forever(() => {
            conveyor.nextCostume();
        }, 120);

        this.forever(this.control());
    }

    control() {
        return () => {

        }
    }

    getRoomType() {
        return GameState.SORTING_ROOM_TYPE;
    }

    resetRoom() {
        super.resetRoom();

        this.currentQuantity = 20;
        this.quantitySlider.hidden = false;
        this.coolerButton.hidden = false;
        this.incubatorButton.hidden = false;
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

        this.pollution = Math.min(this.pollution, 100);
    }

    getParameters() {
        return [
            ['Кол-во яиц', this.currentQuantity + '/' + this.maxQuantity],
            ['Загрязненность', this.pollution + '%'],
        ];
    }
}
