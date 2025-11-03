import { Sprite } from "jetcode-scrubjs";
import {AbstractRootStage} from "./abstract-room.stage";
import { SortingRoomStage } from "./sorting-room.stage";

export class CoopRoomStage extends AbstractRootStage { 
    init() {
        super.init();

        this.forever(this.control());
		this.pen(this.drawParameters, 4);

		this.chicken = new Sprite();
		this.chicken.addCostume('public/images/chicken_sprite_1.png')
		this.chicken.addCostume('public/images/chicken_sprite_2.png')
		this.chicken.addCostume('public/images/chicken_sprite_3.png')
		this.chicken.hidden = true

		this.onStart(() => {
			this.chickenSpawn();
		})
    }

	chickenSpawn() {
		this.chicken.deleteClones();

		for (let i = 0; i < this.currentQuantity; i++) {
			let chickenClone = this.chicken.createClone();
			chickenClone.hidden = false;
            chickenClone.x = this.game.getRandom(200, 400)
			chickenClone.y = this.game.getRandom(200, 400)
			chickenClone.layer = 10
			chickenClone.rotateStyle = 'leftRight'
			// chicken.direction = this.game.getRandom(0, 360)
			chickenClone.xSpeed = this.game.getRandom(-10, 10) / 10
			chickenClone.ySpeed = this.game.getRandom(-10, 10) / 10
			chickenClone.size = 150

			let randCos = this.game.getRandom(0, 3)
			chickenClone.switchCostume(randCos)
			
			chickenClone.forever(function() {
				chickenClone.x += chickenClone.xSpeed
				chickenClone.y += chickenClone.ySpeed

				if (chickenClone.xSpeed > 0) {
					chickenClone.direction = -90;
                } else {
					chickenClone.direction = 90;
                }

				if (chickenClone.x > 400) {
					chickenClone.xSpeed *= -1
                }

				if (chickenClone.x < 100) {
					chickenClone.xSpeed *= -1
                }

				if (chickenClone.y > 400) {
					chickenClone.ySpeed *= -1
                }

				if (chickenClone.y < 200) {
					chickenClone.ySpeed *= -1
                }
            })
        }
	}

    control() {
        return () => {

        }
    }

    getLabel() {
        return 'Стадо';
    }

    getBackgroundImage() {
        return 'public/images/rooms/background_coop.png';
    }

    getThumbnailImage() {
        return 'public/images/rooms/thumbnails/background_coop.png';
    }

    resetRoom() {

    }

    roomTick () {
        super.roomTick();
        // console.log('CoopRoomStage tick');
        if (this.active) {
            this.tickCount += 1;
            if (this.tickCount > this.tickMaxCount) {
                this.tickCount = 0;

                this.pollution += Math.floor(0.7 * this.currentQuantity);

                if (this.gameState.food >= this.currentQuantity) {
                    this.gameState.food -= this.currentQuantity;
                }
                else {
                    this.currentQuantity = this.gameState.food;
					this.gameState.food = 0;
					this.chickenSpawn();
                }

                let eggMultiplayer = 0.8 * this.pollution > 50 ? this.pollution >= 100 ? 0.4 : 0.75 : 1;
                let eggsToSort = Math.round(this.currentQuantity * eggMultiplayer);
                for (let i = 0; i < this.monitorStage.rooms.length; i++){
					if (this.monitorStage.rooms[i].getLabel() == 'Сортировка') {
						const potentialSort = this.monitorStage.rooms[i];
						if (potentialSort.active && potentialSort.currentQuantity != potentialSort.maxQuantity) {
							if (potentialSort.maxQuantity - potentialSort.currentQuantity < eggsToSort) {
								potentialSort.currentQuantity += potentialSort.maxQuantity - potentialSort.currentQuantity;
								eggsToSort -= potentialSort.maxQuantity - potentialSort.currentQuantity;
								potentialSort.quantitySlider.maxValue = potentialSort.currentQuantity;
								potentialSort.quantitySlider.setCurrentValue();
								continue;
							}
							else {
								potentialSort.currentQuantity += eggsToSort;
								potentialSort.quantitySlider.maxValue = potentialSort.currentQuantity;
								potentialSort.quantitySlider.setCurrentValue();
								return true;
							}
						}
					}
				}
            }
        }
    }

    drawParameters(context, coop) {
        if (coop.active) {
            context.font = '18px Arial';
            context.fillStyle = 'white';
            context.textAlign = 'start';

            context.fillText('Сколько куриц: ' + coop.currentQuantity, 615, 200);
            context.fillText('Загрязненность: ' + coop.pollution + '%', 615, 225);
        }
       
    }
}
