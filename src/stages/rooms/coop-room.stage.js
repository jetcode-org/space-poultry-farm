import { AbstractRootStage } from "./abstract-room.stage";
import { GameState } from "../../services/game.state";
import { LongButtonSprite } from "../../sprites/long-button.sprite";
import { Sprite } from "jetcode-scrubjs";

export class CoopRoomStage extends AbstractRootStage {
    eggsAmount = 0;
    maxEggsAmount = 50;
    foodConsumption = 0.5;
    maxQuantity = 50; // Максимальное количество куриц
    comfortQuantity = 40; // Комфортное количество куриц

    targetQuantity = 0;
    targetFlag = false; //Нужно, чтобы в первый раз просто приравнять количество куриц для правильного отображения (костыль)

    init() {
        super.init();

        this.forever(this.control.bind(this));

        this.harvestButton = new LongButtonSprite(this, 5);
        this.harvestButton.x = 150;
        this.harvestButton.y = 540;
        this.harvestButton.onReady(() => {
            this.harvestButton.setLabel('Собрать яйца')
        });

        this.onStart(()=>{
            if (!this.targetFlag) {
                this.targetQuantity = this.currentQuantity;
                this.targetFlag = true;
            }
        })

        this.harvestButton.onClick(() => {
            this.eggsUnderRoofSprite.hidden = true;

            for (let i = 0; i < this.gameState.rooms.length; i++) {
                if (this.gameState.rooms[i].getRoomType() === GameState.SORTING_ROOM_TYPE) {
                    const potentialSort = this.gameState.rooms[i];
                    if (potentialSort.currentQuantity != potentialSort.maxQuantity) {
                        if (potentialSort.maxQuantity - potentialSort.currentQuantity < this.eggsAmount) {
                            potentialSort.currentQuantity += potentialSort.maxQuantity - potentialSort.currentQuantity;
                            this.eggsAmount -= potentialSort.maxQuantity - potentialSort.currentQuantity;

                            continue;
                        } else {
                            potentialSort.currentQuantity += this.eggsAmount;
                            this.eggsAmount = 0;
                        }

                        return true;
                    }
                }
            }

            showModal('Внимание', 'Недостаточно места в сортировке, не все яйца удалось перенести', () => this.stop(), () => this.run());

            return false;
        })

        this.foodSprite = new Sprite(this, 1, [
            'public/images/rooms/backgrounds/details/coop/food.png',
        ]);
        this.foodSprite.hidden = true;

        this.trashSprite = new Sprite(this, 1, [
            'public/images/rooms/backgrounds/details/coop/trash.png',
        ]);
        this.trashSprite.hidden = true;

        this.eggsUnderRoofSprite = new Sprite(this, 1, [
            'public/images/rooms/backgrounds/details/coop/eggs_under_roof.png',
        ]);
        this.eggsUnderRoofSprite.hidden = true;

    }

    control() {
        if (this.eggsAmount > 0) {
            this.harvestButton.hidden = false;

        } else {
            this.harvestButton.hidden = true;
        }
        if (this.targetQuantity > this.currentQuantity) {
            this.targetQuantity = this.currentQuantity;
        }
        if (this.targetQuantity < this.currentQuantity && this.isVisualized) {
            for (let i = this.targetQuantity; i < this.currentQuantity; i++) {
                let visClone = this.visualiser.createClone();
                visClone.hidden = false;
                visClone.x = this.game.getRandom(200, 400)
                visClone.y = this.game.getRandom(200, 400)
                visClone.layer = 10
                visClone.rotateStyle = 'leftRight'
                visClone.size = 150
                visClone.xSpeed = this.game.getRandom(-10, 10) / 10
                visClone.ySpeed = this.game.getRandom(-10, 10) / 10
                visClone.number = i + 1;

                let randCos = this.game.getRandom(0, this.visualiser.costumes.length)
                visClone.switchCostume(randCos)


                if (this.visualiser.moving) {

                    visClone.forever(function () {

                        visClone.x += visClone.xSpeed
                        visClone.y += visClone.ySpeed

                        if (visClone.xSpeed > 0) {
                            visClone.direction = -90;
                        } else {
                            visClone.direction = 90;
                        }

                        if (visClone.x > 400) {
                            visClone.xSpeed *= -1
                        }

                        if (visClone.x < 100) {
                            visClone.xSpeed *= -1
                        }

                        if (visClone.y > 400) {
                            visClone.ySpeed *= -1
                        }

                        if (visClone.y < 200) {
                            visClone.ySpeed *= -1
                        }

                    })
                }
                visClone.forever(() => {
                    if (visClone.number > this.currentQuantity) {
                        visClone.delete();
                    }
                })

            }
            this.targetQuantity = this.currentQuantity;
        }
    }

    getRoomType() {
        return GameState.COOP_ROOM_TYPE;
    }

    roomTick() {
        super.roomTick();

        if (this.gameState.food >= this.currentQuantity * this.foodConsumption / 5) {
            this.gameState.food -= this.currentQuantity * this.foodConsumption / 5;

        } else {
            const withoutFood = this.currentQuantity - Math.floor(this.gameState.food * (1 / this.foodConsumption));
            this.currentQuantity = Math.floor(this.gameState.food * (1 / this.foodConsumption) + 0.95 * withoutFood);
            this.gameState.food = 0;
        }

        this.isRoomReady = false;
        this.tickCount += 1;
        if (this.tickCount > this.tickMaxCount) {
            this.tickCount = 0;

            this.pollution += Math.floor(0.7 * this.currentQuantity);

            let eggMultiplayer = 0.8 * this.pollution > 50 ? this.pollution >= 100 ? 0.4 : 0.75 : 1;
            this.eggsAmount += Math.round(this.currentQuantity * eggMultiplayer);
            this.currentQuantity = Math.floor(this.currentQuantity * 0.95)

            if (this.eggsAmount > this.maxEggsAmount) {
                this.eggsAmount = this.maxEggsAmount;
                this.isRoomReady = true;
            }

            this.pollution = Math.min(this.pollution, 100);
        }

        this.trashSprite.hidden = this.pollution < 10;
        this.foodSprite.hidden = this.gameState.food < 10;
        this.eggsUnderRoofSprite.hidden = this.eggsAmount === 0;
    }

    getParameters() {
        return [
            ['Кол-во куриц', this.currentQuantity + '/' + this.maxQuantity],
            ['Комфорт. кол-во', this.comfortQuantity],
            ['Кол-во яиц', this.eggsAmount + '/' + this.maxEggsAmount],
            ['Загрязненность', this.pollution + '%'],
        ];
    }

    setVisCostumes() {
        super.setVisCostumes();

        this.visualiser.addCostume('public/images/sprites/chicken/chicken_1.png');
        this.visualiser.addCostume('public/images/sprites/chicken/chicken_2.png');
        this.visualiser.addCostume('public/images/sprites/chicken/chicken_3.png');

        
    }
}
