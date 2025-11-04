
export class GameState {
    static instance;

    static CHARGE_VALUE_FULL = 1;

    passedTime = 0;
    limitTime = 1000;
    chargeValue = 0;
    cooledEggs = 0;

    eggshell = 0;
    manure = 0;
    food = 1000;
    chick = 0;
    chicken = 0;

    quotas = [20, 50, 100, 200];
    currentQuota = 0;

    isDraggableObjectActive = false;
	
    constructor() {
        if (GameState.instance) {
            throw new Error('GameState class: use getInstance() method instead.');
        }
    }

    static getInstance() {
        if (!GameState.instance) {
            GameState.instance = new GameState();
        }

        return GameState.instance;
    }

    reset() {
        this.passedTime = 0;
        this.limitTime = 100;
        this.chargeValue = 0;
        this.cooledEggs = 0;

        this.manure = 0;
        this.eggshell = 0;
        this.food = 100;
    }

    isEnoughCharge() {
        return this.chargeValue >= GameState.CHARGE_VALUE_FULL;
    }

}
