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

    static CRITICAL_RATING = 0; // Критичный порог рейтинга, при котором игра заканчивается проигрышем

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
     * Параметры для посмещения комнат
     */

    visits = {
        [GameState.EMPTY_ROOM_TYPE] : true,
        [GameState.SORTING_ROOM_TYPE] : true,
        [GameState.INCUBATOR_ROOM_TYPE] : true,
        [GameState.NURSERY_ROOM_TYPE] : true,
        [GameState.COOP_ROOM_TYPE] : true,
        [GameState.FARM_ROOM_TYPE] : true,
    };

    /**
     * Корабли
     */
    shipsConfig = [
        [
            {
                'type': GameState.SORTING_ROOM_TYPE,
                'x': 315,
                'y': 198,
            },
            {
                'type': GameState.INCUBATOR_ROOM_TYPE,
                'x': 192,
                'y': 257,
            },
            {
                'type': GameState.NURSERY_ROOM_TYPE,
                'x': 291,
                'y': 257,
            },
            {
                'type': GameState.COOP_ROOM_TYPE,
                'x': 391,
                'y': 257,
            },
            {
                'type': GameState.FARM_ROOM_TYPE,
                'x': 491,
                'y': 257,
            },
            {
                'type': GameState.EMPTY_ROOM_TYPE,
                'x': 192,
                'y': 314,
            },
            {
                'type': GameState.EMPTY_ROOM_TYPE,
                'x': 291,
                'y': 314,
            },
            {
                'type': GameState.EMPTY_ROOM_TYPE,
                'x': 391,
                'y': 314,
            },
            {
                'type': GameState.EMPTY_ROOM_TYPE,
                'x': 491,
                'y': 314,
            },
            {
                'type': GameState.EMPTY_ROOM_TYPE,
                'x': 192,
                'y': 373,
            },
            {
                'type': GameState.EMPTY_ROOM_TYPE,
                'x': 291,
                'y': 373,
            },
            {
                'type': GameState.EMPTY_ROOM_TYPE,
                'x': 391,
                'y': 373,
            },
            {
                'type': GameState.EMPTY_ROOM_TYPE,
                'x': 491,
                'y': 373,
            },
        ]
    ];
    currentShip = 0;

    /**
     * Персонажи
     */
    static HERO_PERSON = 'hero_person';
    static BOSS_PERSON = 'boss_person';
    static AI_PERSON = 'ai_person';
    static CCC_PERSON = 'ccc_person';

    static NORMAL_PERSON_EMOTION = 'normal_person_emotion';
    static HAPPY_PERSON_EMOTION = 'happy_person_emotion';
    static ANGRY_PERSON_EMOTION = 'angry_person_emotion';

    personAnimations = {
        [GameState.HERO_PERSON]: {
            [GameState.NORMAL_PERSON_EMOTION]: ['public/images/persons/hero/normal.png'],
            [GameState.HAPPY_PERSON_EMOTION]: ['public/images/persons/hero/happy.png'],
            [GameState.ANGRY_PERSON_EMOTION]: ['public/images/persons/hero/angry.png'],
        },
        [GameState.BOSS_PERSON]: {
            [GameState.NORMAL_PERSON_EMOTION]: ['public/images/persons/boss/normal.png'],
            [GameState.HAPPY_PERSON_EMOTION]: ['public/images/persons/boss/happy.png'],
            [GameState.ANGRY_PERSON_EMOTION]: ['public/images/persons/boss/angry.png'],
        },
        [GameState.AI_PERSON]: {
            [GameState.NORMAL_PERSON_EMOTION]: ['public/images/persons/ai/normal.png'],
            [GameState.HAPPY_PERSON_EMOTION]: ['public/images/persons/ai/happy.png'],
            [GameState.ANGRY_PERSON_EMOTION]: ['public/images/persons/ai/angry.png'],
        },
        [GameState.CCC_PERSON]: {
            [GameState.NORMAL_PERSON_EMOTION]: ['public/images/persons/ccc/normal.png'],
            [GameState.HAPPY_PERSON_EMOTION]: ['public/images/persons/ccc/happy.png'],
            [GameState.ANGRY_PERSON_EMOTION]: ['public/images/persons/ccc/angry.png'],
        },
    }

    /**
     * Ответы героя
     */

    heroAnswers = {
        [GameState.NORMAL_PERSON_EMOTION]: ['Вас понял', 'Хорошо', 'Приму к сведению', 'Спасибо за информацию'],
        [GameState.ANGRY_PERSON_EMOTION]: ['Вас понял', 'Хорошо', 'Приму к сведению', 'Спасибо за информацию'],
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
            'thumbnailImages': [
                'public/images/rooms/thumbnails/empty_default.png',
                'public/images/rooms/thumbnails/empty_hovered.png'
            ],
            'shopImages': [],
        },
        [GameState.SORTING_ROOM_TYPE]: {
            'name': 'Сортировка',
            'cost': 0,
            'helpText': 'Сортировка: отсек для обработки и распределения яиц между криокамерой и инкубатором.',
            'instructionText': 'Распределяйте яйца между криокамерой (для выполнения миссии) и инкубатором (для пополнения поголовья)',
            'backgroundImage': 'public/images/rooms/backgrounds/sorting.png',
            'thumbnailImages': [
                'public/images/rooms/thumbnails/sorting_room_default.png',
                'public/images/rooms/thumbnails/sorting_room_hovered.png'
            ],
            'shopImages': [],
        },
        [GameState.INCUBATOR_ROOM_TYPE]: {
            'name': 'Инкубатор',
            'cost': 5000,
            'helpText': 'Инкубатор: отсек для искусственного выведения цыплят из яиц в контролируемых условиях.',
            'instructionText': 'Следите за вылуплением цыплят и своевременно очищайте аппараты от скорлупы. Не допускайте длительного нахождения цыплят в инкубаторе',
            'backgroundImage': 'public/images/rooms/backgrounds/incubator.png',
            'thumbnailImages': [
                'public/images/rooms/thumbnails/incubator_default.png',
                'public/images/rooms/thumbnails/incubator_hovered.png'
            ],
            'shopImages': [
                'public/images/rooms/shop/incubator_default.png',
                'public/images/rooms/shop/incubator_hovered.png',
                'public/images/rooms/shop/incubator_pressed.png',
            ],
        },
        [GameState.NURSERY_ROOM_TYPE]: {
            'name': 'Цыплятник',
            'cost': 9000,
            'helpText': 'Цыплятник: модуль для выращивания молодняка до взрослых особей.',
            'instructionText': 'Отслеживайте рост цыплят и переводите их в загон при достижении зрелости. Регулярно очищайте помещение от помета',
            'backgroundImage': 'public/images/rooms/backgrounds/nursery.png',
            'thumbnailImages': [
                'public/images/rooms/thumbnails/nursery_default.png',
                'public/images/rooms/thumbnails/nursery_hovered.png'
            ],
            'shopImages': [
                'public/images/rooms/shop/nursery_default.png',
                'public/images/rooms/shop/nursery_hovered.png',
                'public/images/rooms/shop/nursery_pressed.png',
            ],
        },
        [GameState.COOP_ROOM_TYPE]: {
            'name': 'Стадо',
            'cost': 5000,
            'helpText': 'Стадо: основное помещение содержания взрослых кур-несушек.',
            'instructionText': 'Собирайте яйца по завершении цикла кладки. Поддерживайте чистоту для сохранения продуктивности несушек',
            'backgroundImage': 'public/images/rooms/backgrounds/coop.png',
            'thumbnailImages': [
                'public/images/rooms/thumbnails/coop_default.png',
                'public/images/rooms/thumbnails/coop_hovered.png'
            ],
            'shopImages': [
                'public/images/rooms/shop/coop_default.png',
                'public/images/rooms/shop/coop_hovered.png',
                'public/images/rooms/shop/coop_pressed.png',
            ],
        },
        [GameState.FARM_ROOM_TYPE]: {
            'name': 'Ферма',
            'cost': 15000,
            'helpText': 'Ферма: гидропонный комплекс производства кормовых культур.',
            'instructionText': 'Используйте помет и скорлупу для производства комбикорма. Своевременно собирайте урожай кормовых культур',
            'backgroundImage': 'public/images/rooms/backgrounds/farm.png',
            'thumbnailImages': [
                'public/images/rooms/thumbnails/farm_default.png',
                'public/images/rooms/thumbnails/farm_hovered.png'
            ],
            'shopImages': [
                'public/images/rooms/shop/farm_default.png',
                'public/images/rooms/shop/farm_hovered.png',
                'public/images/rooms/shop/farm_pressed.png',
            ],
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
            'successChangeRating': 5,
            'failChangeRating': -5,
            'task': 'Планета: Марс-7 (Агрикультурный сектор). Доставьте 50 яиц первой партии для обеспечения белком научной колонии. Ученые проводят эксперименты по адаптации земной флоры и фауны к марсианским условиям. Ваш груз станет основой для создания устойчивой экосистемы',
            'success': 'УСПЕХ! Марс-7: Квота выполнена! Научная колония получила жизненно важные белки',
            'fail': 'ПРОВАЛ! Марс-7: Квота не выполнена! Колония осталась без жизненно важных ресурсов. Придется объясняться перед Советом...'
        },
        {
            'name': 'Аквария',
            'eggQuota': 125,
            'distance': 200,
            'successChangeRating': 10,
            'failChangeRating': -10,
            'task': 'Планета: Аквария (Водный мир). Требуется 125 яиц для плавучих городов-архипелагов. Местное население страдает от дефицита белка из-за ограниченности земельных ресурсов. Ваш груз поможет стабилизировать пищевую ситуацию на планете.',
            'success': 'УСПЕХ! Аквария: Груз доставлен! Плавучие города спасены от белкового голодания.',
            'fail': 'ПРОВАЛ! Аквария: Груз не доставлен! Население водного мира продолжает страдать от дефицита белка. Летим дальше с пустыми трюмами.'
        },
        {
            'name': 'Гелиос-Прайм',
            'eggQuota': 250,
            'distance': 300,
            'successChangeRating': 15,
            'failChangeRating': -15,
            'task': 'Планета: Гелиос-Прайм (Приполярная зона). Срочно доставьте 250 яиц в криогенной упаковке для полярных исследовательских станций. Экстремальные температуры требуют особых условий транспортировки и максимальной свежести продукции.',
            'success': 'УСПЕХ! Гелиос-Прайм: Миссия выполнена! Полярные исследователи обеспечены провизией.',
            'fail': 'ПРОВАЛ! Гелиос-Прайм: Миссия провалена! Исследователи остались без провизии в ледяной пустыне. Время не ждет - движемся к следующей цели.'
        },
        {
            'name': 'Терра-Нова',
            'eggQuota': 400,
            'distance': 400,
            'successChangeRating': 20,
            'failChangeRating': -20,
            'task': 'Планета: Терра-Нова (Землеподобный мир). Финальная миссия - 400 яиц для восстановления биосферы после экологической катастрофы. Ваш вклад поможет реанимировать планетарную экосистему и дать начало новой цивилизации.',
            'success': 'УСПЕХ! Терра-Нова: Финальный груз доставлен! Биосфера планеты спасена. Вы стали героем Галактического Совета!',
            'fail': 'ПРОВАЛ! Терра-Нова: Финальная миссия сорвана! Шанс восстановить планету упущен. Ваша репутация серьезно пострадала.'
        },
    ];

    /**
     * События
     */
    static EVENT_TIMER_MAX = 250; // При достижении этого значение событие сработает на 100%
    static EVENT_TIMER_MIN = 50; // До этого значения событие не сработает
    eventTimer = 0; // Чем выше значение, тем более вероятно наступление события
    eventAnswers = []; // Структура: [{event: eventId, variant: variantId}]

    events = [
        {
            'name': 'Поломка системы климат-контроля',
            'description': 'В инкубаторе отказала система поддержания температуры. Эмбрионы могут погибнуть.',
            'question': 'Как спасти инкубационную партию?',
            'image': 'public/images/events/event_background_1.png',
            'variants': [
                {
                    'answer': 'Экстренно перенести яйца в резервный инкубатор',
                    'comment': 'Потеря 10% яиц при переносе, задержка цикла на 1 день.',
                    'correct': true,
                    'changeRating': 5,
                },
                {
                    'answer': 'Вручную регулировать температуру с помощью аварийных нагревателей',
                    'comment': 'Риск человеческой ошибки (50% шанс потери всей партии).',
                    'correct': false,
                    'changeRating': -5,
                },
                {
                    'answer': 'Увеличить температуру во всем модуле на 2°C',
                    'comment': 'Перегрев 60% эмбрионов, рождение нежизнеспособных цыплят.',
                    'correct': false,
                    'changeRating': -20,
                },
                {
                    'answer': 'Смириться с потерей и начать новую закладку',
                    'comment': '-100% текущей партии, но минимальные затраты на запуск нового цикла.',
                    'correct': true,
                    'changeRating': 10,
                }
            ]
        },
        {
            'name': 'Обнаружение бракованной партии яиц',
            'description': 'В цехе сортировки выявлена партия яиц с микротрещинами скорлупы.',
            'question': 'Как поступить с бракованной продукцией?',
            'image': 'public/images/events/event_background_2.png',
            'variants': [
                {
                    'answer': 'Отправить на переработку в корм для животных',
                    'comment': '+15% к производству корма, но потеря доходов от продажи.',
                    'correct': true,
                    'changeRating': 10,
                },
                {
                    'answer': 'Реализовать со скидкой 70% как продукцию второго сорта',
                    'comment': '+30% дохода vs риск репутационных потерь.',
                    'correct': false,
                    'changeRating': -15,
                },
                {
                    'answer': 'Утилизировать как биологические отходы',
                    'comment': 'Полная потеря продукции и затраты на утилизацию.',
                    'correct': false,
                    'changeRating': -20,
                },
                {
                    'answer': 'Отправить на дополнительную обработку и герметизацию',
                    'comment': '+80% сохраненной продукции, но дополнительные затраты на обработку.',
                    'correct': true,
                    'changeRating': 15,
                }
            ]
        },
        {
            'name': 'Конфликт экологии и эффективности',
            'description': 'Новый стимулятор роста обещает +25% к яйценоскости, но может навредить экобалансу фермы.',
            'question': 'Использовать ли новый препарат?',
            'image': 'public/images/events/event_background_3.png',
            'variants': [
                {
                    'answer': 'Применить ко всему поголовью для максимизации прибыли',
                    'comment': '+25% производства, но -30% к качеству яиц и -15% к здоровью кур.',
                    'correct': false,
                    'changeRating': -5,
                },
                {
                    'answer': 'Использовать только в критических ситуациях',
                    'comment': '+10% производства при редком использовании, минимальный экологический ущерб.',
                    'correct': false,
                    'changeRating': -10,
                },
                {
                    'answer': 'Отказаться в пользу экологичных методов',
                    'comment': 'Сохранение экобаланса, +5% к качеству яиц за счет натуральности.',
                    'correct': true,
                    'changeRating': 10,
                },
                {
                    'answer': 'Провести дополнительные испытания на малой группе',
                    'comment': 'Задержка внедрения на 5 дней, но точные данные о последствиях.',
                    'correct': true,
                    'changeRating': 20,
                }
            ]
        },
        {
            'name': 'Сбой системы увлажнения инкубатора',
            'description': 'В инкубаторе отказала система контроля влажности. Эмбрионы могут погибнуть из-за потери влаги.',
            'question': 'Как спасти инкубационную партию?',
            'image': 'public/images/events/event_background_4.png',
            'variants': [
                {
                    'answer': 'Экстренно перенести яйца в резервный инкубатор',
                    'comment': 'Экстренный перенос в другой инкубатор предварительного увлажнения грозит потерей части партии',
                    'correct': true,
                    'changeRating': 5,
                },
                {
                    'answer': 'Установить дополнительные увлажнители и перенести яйца в резервный инкубатор. ',
                    'comment': 'Вовремя установив увлажнители, мы сохранили почти всю партию',
                    'correct': true,
                    'changeRating': 10,
                },
                {
                    'answer': 'Увеличить влажность во всем модуле на 4%.',
                    'comment': 'Сильно затратно и много энергоресурсов',
                    'correct': false,
                    'changeRating': -5,
                },
                {
                    'answer': 'Смириться с потерей и начать новую закладку',
                    'comment': 'Полная потеря текущей партии, отсрочка производства на несколько дней.',
                    'correct': false,
                    'changeRating': -10,
                }
            ]
        },
        {
            'name': 'Перегрев в птичнике',
            'description': 'В боксе со взрослой птицей вышли из строя приборы для поддержания температуры. Температура достигла критической отметки.',
            'question': 'Как предотвратить тепловой стресс у кур?',
            'image': 'public/images/events/event_background_5.png',
            'variants': [
                {
                    'answer': 'Экстренно переселить птицу к другой взрослой птице.',
                    'comment': 'Переселив птицу к другой, мы сталкиваемся с конфликтам между птицами, так как происходит распределение по иерархии на сильную и слабую птицу.',
                    'correct': false,
                    'changeRating': 0,
                },
                {
                    'answer': 'Снизить мощность вентиляции для самообогрева птицы',
                    'comment': 'Снизив мощность вентиляции на не продолжительное время можно выделить время для ремонта, если ремонт не сложны то даже не будет необходимости переселять птицу.',
                    'correct': true,
                    'changeRating': 5,
                },
                {
                    'answer': 'Не предпринимать действий до ремонта',
                    'comment': 'Тепловой стресс приводит к падежу 15% поголовья.',
                    'correct': false,
                    'changeRating': -10,
                },
                {
                    'answer': 'Экстренно переселить птицу в любой свободный бокс',
                    'comment': 'Снижение плотности посадки предотвращает падеж, но требует дополнительного места.',
                    'correct': true,
                    'changeRating': 10,
                },
            ]
        },
        {
            'name': 'Авария системы водоснабжения',
            'description': 'В основном птичнике произошел разрыв водопровода. Птица осталась без воды.',
            'question': 'Как спасти курицу несушку?',
            'image': 'public/images/events/event_background_6.png',
            'variants': [
                {
                    'answer': 'Организовать временный водопой из резервных емкостей',
                    'comment': 'Минимальное снижение продуктивности при быстром восстановлении',
                    'correct': true,
                    'changeRating': 5,
                },
                {
                    'answer': 'Экстренно переселить птицу к другой взрослой птице.',
                    'comment': 'Продуктивность птицы снизиться на 10% и восстановиться в 2 раза длиннее чем при варианте прекратить кормление.',
                    'correct': false,
                    'changeRating': -5,
                },
                {
                    'answer': 'Прекратить кормление птицы до появления воды в боксе',
                    'comment': 'Если авария не продолжительная то необходимо отключить кормление птицы, при этом снизиться производство яйца на 5%, но птица достаточно быстро восстановиться.',
                    'correct': true,
                    'changeRating': 10,
                },
                {
                    'answer': 'Дождаться ремонта системы',
                    'comment': 'Обезвоживание приводит к потере 20% поголовья и остановке яйцекладки',
                    'correct': false,
                    'changeRating': -10,
                }
            ]
        },
    ];

    isDraggableObjectActive = false;
    isReadingHelper = false;

    // Рейтинг (Лицензия Таврос)
    rating  = 50;

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

    violations = {
        'clean': {
            'success': {
                'changeQuality': 10,
            },
            'fail': {
                'changeRating': -10,
                'changeQuality': -10,
            }
        },
        'feeding': {
            'success': {
                'changeQuality': 20,
            },
            'fail': {
                'changeRating': -20,
                'changeQuality': -20,
            }
        },
        'condition': {
            'success': {
                'changeQuality': 30,
            },
            'fail': {
                'changeRating': -30,
                'changeQuality': -30,
            }
        },
    }

    _formatter;

    constructor() {
        if (GameState.instance) {
            throw new Error('GameState class: use getInstance() method instead.');
        }

        this._formatter = new Intl.NumberFormat('ru-RU');
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
        this.rating = 50;

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
            cleanViolation: this.cleanViolation ? this.violations.clean.fail.changeQuality : this.violations.clean.success.changeQuality,
            feedingViolation: this.feedingViolation ? this.violations.feeding.fail.changeQuality : this.violations.feeding.success.changeQuality,
            chickenConditionViolation: this.conditionViolation ? this.violations.condition.fail.changeQuality : this.violations.condition.success.changeQuality,
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
            showModal('Ошибка', 'Недостаточно денег');

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

    getFormattedMoney(money) {
        return this._formatter.format(money) + '₽';
    }
}
