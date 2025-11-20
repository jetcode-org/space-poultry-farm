
export class GameState {
    static instance;

    static CHARGE_VALUE_FULL = 100;

    passedTime = 0; // Пошло времени
    limitTime = 400;
    chargeValue = 0;
    frozenEggs = 0; // Количество замороженных яиц

    eggshell = 0;
    manure = 0;
    food = 500;
    chick = 0;
    chicken = 0;

    /**
     * Миссии
     */
    currentMission = -1; // Текущая миссия
    successfulCompletedMissions = 0; // общее количество успешно выполненных миссий
    missions = [
        {
            'name': 'Марс-7',
            'eggQuota': 50,
            'distance': 100,
            'task': 'Планета: Марс-7 (Агрикультурный сектор). Доставьте 50 яиц первой партии для обеспечения белком научной колонии. Ученые проводят эксперименты по адаптации земной флоры и фауны к марсианским условиям. Ваш груз станет основой для создания устойчивой экосистемы',
            'success': 'УСПЕХ! Марс-7: Квота выполнена! Научная колония получила жизненно важные белки',
            'fail': 'ПРОВАЛ! Марс-7: Квота не выполнена! Колония осталась без жизненно важных ресурсов. Придется объясняться перед Советом...'
        },
        {
            'name': 'Аквария',
            'eggQuota': 125,
            'distance': 200,
            'task': 'Планета: Аквария (Водный мир). Требуется 125 яиц для плавучих городов-архипелагов. Местное население страдает от дефицита белка из-за ограниченности земельных ресурсов. Ваш груз поможет стабилизировать пищевую ситуацию на планете.',
            'success': 'УСПЕХ! Аквария: Груз доставлен! Плавучие города спасены от белкового голодания.',
            'fail': 'ПРОВАЛ! Аквария: Груз не доставлен! Население водного мира продолжает страдать от дефицита белка. Летим дальше с пустыми трюмами.'
        },
        {
            'name': 'Гелиос-Прайм',
            'eggQuota': 250,
            'distance': 300,
            'task': 'Планета: Гелиос-Прайм (Приполярная зона). Срочно доставьте 250 яиц в криогенной упаковке для полярных исследовательских станций. Экстремальные температуры требуют особых условий транспортировки и максимальной свежести продукции.',
            'success': 'УСПЕХ! Гелиос-Прайм: Миссия выполнена! Полярные исследователи обеспечены провизией.',
            'fail': 'ПРОВАЛ! Гелиос-Прайм: Миссия провалена! Исследователи остались без провизии в ледяной пустыне. Время не ждет - движемся к следующей цели.'
        },
        {
            'name': 'Терра-Нова',
            'eggQuota': 400,
            'distance': 400,
            'task': 'Планета: Терра-Нова (Землеподобный мир). Финальная миссия - 400 яиц для восстановления биосферы после экологической катастрофы. Ваш вклад поможет реанимировать планетарную экосистему и дать начало новой цивилизации.',
            'success': 'УСПЕХ! Терра-Нова: Финальный груз доставлен! Биосфера планеты спасена. Вы стали героем Галактического Совета!',
            'fail': 'ПРОВАЛ! Терра-Нова: Финальная миссия сорвана! Шанс восстановить планету упущен. Ваша репутация серьезно пострадала.'
        },
    ];

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
        this.frozenEggs = 0;
        this.currentMission = -1;

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
