
export class GameState {
    static instance;

    static CHARGE_VALUE_FULL = 100;

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
    quotas = [50, 125, 250, 400];
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
    distance_planet = [100, 200, 300, 400];
    quotasLimitTime = [100, 200, 300, 400];
    planetNames = ['Марс-7', 'Аквария', 'Гелиос-Прайм', 'Терра-Нова'];

    isDraggableObjectActive = false;
    ifReadingHelper = false;

    thereWasFood = true;

    // Рейтинг (Лицензия Таврос)
    rating = 50;

    static CRITICAL_RATING = 0; // Критичный порог рейтинга, при котором игра заканчивается проигрышем

    // Деньги - основная игровая валюта
    money = 1000;

    /**
     * Породы куриц
     */
    static CHICKEN_BREED_STANDARD = 'chicken_breed_standard';
    static CHICKEN_BREED_PRO = 'chicken_breed_pro';

    // Порода текущих куриц
    chickenBreed = GameState.CHICKEN_BREED_STANDARD;

    // Сколько баллов качества дает определенная порода куриц
    chickenBreedQuality = {
        [GameState.CHICKEN_BREED_STANDARD]: 5,
        [GameState.CHICKEN_BREED_PRO]: 20,
    };

    chickenBreedNames = {
        [GameState.CHICKEN_BREED_STANDARD]: 'Обычная курица',
        [GameState.CHICKEN_BREED_PRO]: 'Продвинутая курица',
    };

    /**
     * Качество яйца
     */
    static EGG_QUALITY_C3 = 'C3';
    static EGG_QUALITY_C2 = 'C2';
    static EGG_QUALITY_C1 = 'C1';
    static EGG_QUALITY_C0 = 'C0';

    // Сколько нужно баллов качества для определения класса
    eggQualityClasses = {
        [GameState.EGG_QUALITY_C3]: 0,
        [GameState.EGG_QUALITY_C2]: 30,
        [GameState.EGG_QUALITY_C1]: 60,
        [GameState.EGG_QUALITY_C0]: 100
    };

    // Сколько денег дает определенный класс
    eggQualityMoney = {
        [GameState.EGG_QUALITY_C3]: 50,
        [GameState.EGG_QUALITY_C2]: 60,
        [GameState.EGG_QUALITY_C1]: 70,
        [GameState.EGG_QUALITY_C0]: 80
    };

    /**
     * Нарушения
     */
    cleanViolation = false; // Нарушение чистоты
    feedingViolation = false; // Нарушение кормления
    chickenConditionViolation = false; // Нарушение условий содержания

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
        this.currentQuota = 0;

        this.manure = 0;
        this.eggshell = 0;
        this.food = 500;
    }

    isEnoughCharge() {
        return this.chargeValue >= GameState.CHARGE_VALUE_FULL;
    }

    getChickenBreedName() {
        return this.chickenBreedNames[this.chickenBreed];
    }

    getEggQualityInfo() {
        return {
            chickenBreed: this.chickenBreedQuality[this.chickenBreed],
            cleanViolation: this.cleanViolation ? -10 : 10,
            feedingViolation: this.feedingViolation ? -20 : 20,
            chickenConditionViolation: this.chickenConditionViolation ? -30 : 30,
        };
    }

    getEggQuality() {
        return Object.values(this.getEggQualityInfo()).reduce(
            (accumulator, currentValue) => accumulator + currentValue,
            0
        );
    }

    getEggQualityClass() {
        const quality = this.getEggQuality();

        let currentQualityClass = GameState.EGG_QUALITY_C3;
        for (const [qualityClass, value] of Object.entries(this.eggQualityClasses)) {
            if (value < quality) {
                currentQualityClass = qualityClass;
            }
        }

        return currentQualityClass;
    }

    getEggQualityMoney(qualityClass = null) {
        qualityClass = qualityClass ? qualityClass : this.getEggQualityClass();

        return this.eggQualityMoney[qualityClass];
    }

    getEggQualityPoint(qualityClass = null) {
        qualityClass = qualityClass ? qualityClass : this.getEggQualityClass();

        return this.eggQualityClasses[qualityClass];
    }

    getNextEggQualityClass(qualityClass = null) {
        qualityClass = qualityClass ? qualityClass : this.getEggQualityClass();

        const keys = Object.keys(this.eggQualityClasses);
        const index = keys.indexOf(qualityClass);

        if (index === -1 || index === keys.length - 1) {
            return null;
        }

        return keys[index + 1];
    }
}
