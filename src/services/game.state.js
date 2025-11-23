export class GameState {
    static instance;

    passedTime = 0; // Пошло времени
    limitTime = 400;
    frozenEggs = 0; // Количество замороженных яиц

    eggshell = 0;
    manure = 0;
    food = 500;
    chick = 0;
    chicken = 0;
    pollution = 0; // Показатель загрязнения
    comfortChickenQuantity = 0; // Общее количество комфортных мест для куриц

    teachingMode = true; // Режим обучения

    rooms = [];
    drones = [];

    /**
     * Критичные показатели которые вызывают нарушения
     */
    static CRITICAL_FOOD = 0;
    static CRITICAL_POLLUTION = 75;

    /**
     * Комнаты
     */
    static EMPTY_ROOM_TYPE = 'empty_room_type';
    static SORTING_ROOM_TYPE = 'sorting_room_type';
    static INCUBATOR_ROOM_TYPE = 'incubator_room_type';
    static NURSERY_ROOM_TYPE = 'nursery_room_type';
    static COOP_ROOM_TYPE = 'coop_room_type';
    static FARM_ROOM_TYPE = 'farm_room_type';

    /**
     * Корабли
     */
    shipsConfig = [
        [
            {
                'type': GameState.SORTING_ROOM_TYPE,
                'x': 206,
                'y': 152,
            },
            {
                'type': GameState.INCUBATOR_ROOM_TYPE,
                'x': 292,
                'y': 152,
            },
            {
                'type': GameState.NURSERY_ROOM_TYPE,
                'x': 377,
                'y': 152,
            },
            {
                'type': GameState.COOP_ROOM_TYPE,
                'x': 477,
                'y': 200,
            },
            {
                'type': GameState.FARM_ROOM_TYPE,
                'x': 477,
                'y': 357,
            },
            {
                'type': GameState.EMPTY_ROOM_TYPE,
                'x': 206,
                'y': 244,
            },
            {
                'type': GameState.EMPTY_ROOM_TYPE,
                'x': 292,
                'y': 198,
            },
            {
                'type': GameState.EMPTY_ROOM_TYPE,
                'x': 378,
                'y': 198,
            },
            {
                'type': GameState.EMPTY_ROOM_TYPE,
                'x': 377,
                'y': 357,
            },
            {
                'type': GameState.EMPTY_ROOM_TYPE,
                'x': 206,
                'y': 198,
            },
            {
                'type': GameState.EMPTY_ROOM_TYPE,
                'x': 292,
                'y': 244,
            },
            {
                'type': GameState.EMPTY_ROOM_TYPE,
                'x': 377,
                'y': 244,
            },
            {
                'type': GameState.EMPTY_ROOM_TYPE,
                'x': 476,
                'y': 244,
            },
            {
                'type': GameState.EMPTY_ROOM_TYPE,
                'x': 206,
                'y': 288,
            },
            {
                'type': GameState.EMPTY_ROOM_TYPE,
                'x': 330,
                'y': 291,
            },
            {
                'type': GameState.EMPTY_ROOM_TYPE,
                'x': 422,
                'y': 291,
            }
        ]
    ];
    currentShip = 0;

    /**
     * Анимации персонажей
     */

    personAnimations = {
        'HeroNormal': ['public/images/persons/hero/normal_1.png',
                       'public/images/persons/hero/normal_2.png',
                       'public/images/persons/hero/normal_3.png',
                       'public/images/persons/hero/normal_4.png'
        ],
        'BossNormal': ['public/images/persons/boss/normal_1.png',
                       'public/images/persons/boss/normal_2.png',
                       'public/images/persons/boss/normal_3.png',
                       'public/images/persons/boss/normal_4.png'
        ],
        'RicoNormal': ['public/images/persons/rico/normal_1.png',
                       'public/images/persons/rico/normal_2.png',
                       'public/images/persons/rico/normal_3.png',
                       'public/images/persons/rico/normal_4.png'
        ],
        'CCCNormal': ['public/images/persons/ccc/normal_1.png',
                      'public/images/persons/ccc/normal_2.png',
                      'public/images/persons/ccc/normal_3.png',
                      'public/images/persons/ccc/normal_4.png'
        ],
        'HeroAngry':  ['public/images/persons/hero/angry_1.png',
                       'public/images/persons/hero/angry_2.png',
                       'public/images/persons/hero/angry_3.png',
                       'public/images/persons/hero/angry_4.png'
        ],
        'BossAngry':  ['public/images/persons/boss/angry_1.png',
                       'public/images/persons/boss/angry_2.png',
                       'public/images/persons/boss/angry_3.png',
                       'public/images/persons/boss/angry_4.png'
        ],
        'RicoAngry':  ['public/images/persons/rico/angry_1.png',
                       'public/images/persons/rico/angry_2.png',
                       'public/images/persons/rico/angry_3.png',
                       'public/images/persons/rico/angry_4.png'
        ],
        'CCCAngry':  ['public/images/persons/ccc/angry_1.png',
                      'public/images/persons/ccc/angry_2.png',
                      'public/images/persons/ccc/angry_3.png',
                      'public/images/persons/ccc/angry_4.png'
        ],
    }

    /**
     * Ответы героя
     */

    heroAnswers = {
        'Normal': ['Вас понял', 'Хорошо', 'Приму к сведению', 'Спасибо за информацию'],
        'Angry': ['Вас понял', 'Хорошо', 'Приму к сведению', 'Спасибо за информацию'],
    }

    /**
     * Комнаты
     */
    roomsConfig = {
        [GameState.EMPTY_ROOM_TYPE]: {
            'name': 'Незанятый модуль',
            'cost': 0,
            'helpText': 'Незанятый модуль, готовый к преобразованию в любой производственный отсек.',
            'instructionText': 'Изучите доступные варианты и создайте отсек, который максимально соответствует вашим текущим производственным задачам',
            'backgroundImage': 'public/images/rooms/backgrounds/empty.png',
            'thumbnailImage': 'public/images/rooms/thumbnails/empty.png',
            'shopImage': null,
        },
        [GameState.SORTING_ROOM_TYPE]: {
            'name': 'Сортировка',
            'cost': 0,
            'helpText': 'Сортировка - отсек для обработки и распределения яиц между криокамерой и инкубатором.',
            'instructionText': 'Распределяйте яйца между криокамерой (для выполнения миссии) и инкубатором (для пополнения поголовья)',
            'backgroundImage': 'public/images/rooms/backgrounds/sorting.png',
            'thumbnailImage': 'public/images/rooms/thumbnails/sorting.png',
            'shopImage': null,
        },
        [GameState.INCUBATOR_ROOM_TYPE]: {
            'name': 'Инкубатор',
            'cost': 5000,
            'helpText': 'Инкубатор - отсек для искусственного выведения цыплят из яиц в контролируемых условиях.',
            'instructionText': 'Следите за вылуплением цыплят и своевременно очищайте аппараты от скорлупы. Не допускайте длительного нахождения цыплят в инкубаторе',
            'backgroundImage': 'public/images/rooms/backgrounds/incubator.png',
            'thumbnailImage': 'public/images/rooms/thumbnails/incubator.png',
            'shopImage': 'public/images/rooms/shop/incubator.png',
        },
        [GameState.NURSERY_ROOM_TYPE]: {
            'name': 'Цыплятник',
            'cost': 9000,
            'helpText': 'Цыплятник - модуль для выращивания молодняка до взрослых особей.',
            'instructionText': 'Отслеживайте рост цыплят и переводите их в загон при достижении зрелости. Регулярно очищайте помещение от помета',
            'backgroundImage': 'public/images/rooms/backgrounds/nursery.png',
            'thumbnailImage': 'public/images/rooms/thumbnails/nursery.png',
            'shopImage': 'public/images/rooms/shop/nursery.png',
        },
        [GameState.COOP_ROOM_TYPE]: {
            'name': 'Стадо',
            'cost': 5000,
            'helpText': 'Стадо - основное помещение содержания взрослых кур-несушек.',
            'instructionText': 'Собирайте яйца по завершении цикла кладки. Поддерживайте чистоту для сохранения продуктивности несушек',
            'backgroundImage': 'public/images/rooms/backgrounds/coop.png',
            'thumbnailImage': 'public/images/rooms/thumbnails/coop.png',
            'shopImage': 'public/images/rooms/shop/coop.png',
        },
        [GameState.FARM_ROOM_TYPE]: {
            'name': 'Ферма',
            'cost': 15000,
            'helpText': 'Ферма - гидропонный комплекс производства кормовых культур.',
            'instructionText': 'Используйте помет и скорлупу для производства комбикорма. Своевременно собирайте урожай кормовых культур',
            'backgroundImage': 'public/images/rooms/backgrounds/farm.png',
            'thumbnailImage': 'public/images/rooms/thumbnails/farm.png',
            'shopImage': 'public/images/rooms/shop/farm.png',
        },
    };

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

    /**
     * События
     */
    static EVENT_TIMER_MAX = 200; // При достижении этого значение событие сработает на 100%
    static EVENT_TIMER_MIN = 50; // До этого значения событие не сработает
    eventTimer = 0; // Чем выше значение, тем более вероятно наступление события
    eventAnswers = []; // Структура: [{event: eventId, variant: variantId}]

    events = [
        {
            'description': 'От чего не может умереть цыпленок?',
            'image': 'public/images/events/event_1.jpg',
            'variants': [
                {
                    'answer': 'От старости',
                    'correct': true,
                    'changeRating': 10,
                },
                {
                    'answer': 'От холода',
                    'correct': false,
                    'changeRating': -15,
                },
                {
                    'answer': 'От голода',
                    'correct': false,
                    'changeRating': -10,
                },
                {
                    'answer': 'От болезней',
                    'correct': false,
                    'changeRating': -5,
                }
            ]
        },
        {
            'description': 'Вопрос 2',
            'image': 'public/images/events/event_2.jpg',
            'variants': [
                {
                    'answer': 'Вариант 1',
                    'correct': false,
                    'changeRating': -10,
                },
                {
                    'answer': 'Вариант 2',
                    'correct': true,
                    'changeRating': 15,
                },
                {
                    'answer': 'Вариант 3',
                    'correct': false,
                    'changeRating': -20,
                },
                {
                    'answer': 'Вариант 4',
                    'correct': false,
                    'changeRating': -15,
                }
            ]
        },
        {
            'description': 'Вопрос 3',
            'image': 'public/images/events/event_3.jpg',
            'variants': [
                {
                    'answer': 'Вариант 1',
                    'correct': false,
                    'changeRating': -5,
                },
                {
                    'answer': 'Вариант 2',
                    'correct': false,
                    'changeRating': -10,
                },
                {
                    'answer': 'Вариант 3',
                    'correct': true,
                    'changeRating': 20,
                },
                {
                    'answer': 'Вариант 4',
                    'correct': false,
                    'changeRating': -15,
                }
            ]
        },
    ];

    isDraggableObjectActive = false;
    isReadingHelper = false;

    // Рейтинг (Лицензия Таврос)
    rating = 50;

    static CRITICAL_RATING = 0; // Критичный порог рейтинга, при котором игра заканчивается проигрышем

    // Деньги - основная игровая валюта
    money = 20000;

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
    conditionViolation = false; // Нарушение условий содержания

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
        this.frozenEggs = 0;
        this.currentMission = -1;

        this.manure = 0;
        this.eggshell = 0;
        this.food = 500;

        this.eventTimer = 0;
        this.eventAnswers = [];

        // Обнулить все параметры всех комнат
        for (const room of this.rooms) {
            room.resetRoom();
        }

        this.resetViolations();
    }

    addRoom(room) {
        this.rooms.push(room);
    }

    deleteRoom(room) {
        const roomIndex = this.rooms.indexOf(room);
        this.rooms.splice(roomIndex, 1);
    }

    addDrone(drone) {
        this.drones.push(drone);
    }

    getChickenBreedName() {
        return this.chickenBreedNames[this.chickenBreed];
    }

    getEggQualityInfo() {
        return {
            chickenBreed: this.chickenBreedQuality[this.chickenBreed],
            cleanViolation: this.cleanViolation ? -10 : 10,
            feedingViolation: this.feedingViolation ? -20 : 20,
            chickenConditionViolation: this.conditionViolation ? -30 : 30,
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

    getEggQualityCost(qualityClass = null) {
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

    getShipConfig() {
        return this.shipsConfig[this.currentShip];
    }

    buy(cost) {
        if (this.money < cost) {
            showModal('Недостаточно денег');

            return false;
        }

        this.money -= cost;

        return true;
    }

    getHeroAnswer(emotion) {
        const randomAnswerIndex = Math.floor(Math.random() * this.heroAnswers[emotion].length);
        return this.heroAnswers[emotion][randomAnswerIndex];
    }

    getRandomEventId() {
        const answerEventIds = this.eventAnswers.map(answer => answer.event);

        let eventCandidates = Array.from(this.events.keys());
        eventCandidates = eventCandidates.filter(item => !answerEventIds.includes(item));

        return eventCandidates[Math.floor(Math.random() * eventCandidates.length)];
    }

    getEventCorrectAnswer(eventId) {
        const event = this.events[eventId];

        for (const variant of event.variants) {
            if (variant.correct) {
                return variant.answer;
            }
        }

        return null;
    }

    changeRating(value) {
        this.rating += value;

        this.rating = Math.min(this.rating, 100);
        this.rating = Math.max(this.rating, 0);
    }

    resetViolations() {
        this.cleanViolation = false;
        this.feedingViolation = false;
        this.conditionViolation = false;
    }
}
