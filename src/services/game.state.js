
export class GameState {
    static instance;

    static CHARGE_VALUE_FULL = 1;

    passedTime = 0;
    limitTime = 200;
    chargeValue = 0;
    cooledEggs = 0;

    eggshell = 0;
    manure = 0;
    food = 1000;
    chick = 0;
    chicken = 0;

    // сколько нужно набрать 
    quotas = [25, 50, 100, 150];
    currentQuota = 0;

    // для переключателей
    quota_1 = false
    quota_2 = false
    quota_3 = false
    quota_4 = false

    // общее количество выполненных квот
    quotas_complete = 0

    // дистанция до планет
    distance_planet = [50, 100, 150, 200]

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
