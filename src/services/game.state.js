
export class GameState {
    static instance;

    static CHARGE_VALUE_FULL = 1;

    passedTime = 0;
    limitTime = 100;
    chargeValue = 0;
    cooledEggs = 0;

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
    }

    isEnoughCharge() {
        return this.chargeValue >= GameState.CHARGE_VALUE_FULL;
    }

}
