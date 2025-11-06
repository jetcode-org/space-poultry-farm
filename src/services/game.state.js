
export class GameState {
    static instance;

    static CHARGE_VALUE_FULL = 1;

    passedTime = 0;
    limitTime = 400;
    chargeValue = 0;
    cooledEggs = 0;

    eggshell = 0;
    manure = 0;
    food = 500;
    chick = 0;
    chicken = 0;

    // сколько нужно набрать
    quotas = [25, 50, 100, 150];
    currentQuota = 0;

    // для переключателей
    quota_0 = false;
    quota_1 = false;
    quota_2 = false;
    quota_3 = false;
    quota_4 = false;

    // общее количество выполненных квот
    quotas_complete = 0;

    // дистанция до планет
    distance_planet = [100, 200, 350, 400];
    quotasLimitTime = [100, 200, 300, 400];
    planetNames = ['Марс-7', 'Аквария', 'Гелиос-Прайм', 'Терра-Нова'];

    isDraggableObjectActive = false;
    ifReadingHelper = false;

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
        this.food = 500;
    }

    isEnoughCharge() {
        return this.chargeValue >= GameState.CHARGE_VALUE_FULL;
    }

}
