import {AbstractSlideStageStage} from "./abstract-slide-stage.stage";
import {MonitorStage} from "./monitor.stage";
import {GameState} from "../services/game.state";

export class OutroStage extends AbstractSlideStageStage {
    static instance;
    textBlockHeight = 160;

    successSlides = [
        {
            'person': GameState.BOSS_PERSON,
            'emotion': GameState.HAPPY_PERSON_EMOTION,
            'text': 'Ваш космический птицеводческий комплекс успешно доставил жизненно важный груз яиц на целевые планеты.'
        },
        {
            'person': GameState.BOSS_PERSON,
            'emotion': GameState.HAPPY_PERSON_EMOTION,
            'text': 'Благодаря вашему грамотному управлению и своевременному выполнению всех производственных циклов, тысячи свежих яиц пополнили продовольственные запасы колонистов.'
        },
        {
            'person': GameState.BOSS_PERSON,
            'emotion': GameState.HAPPY_PERSON_EMOTION,
            'text': 'Признание Галактического Совета не заставило себя ждать - ваша птицефабрика получила статус "Образцовое предприятие космического сельского хозяйства".'
        },
        {
            'person': GameState.BOSS_PERSON,
            'emotion': GameState.HAPPY_PERSON_EMOTION,
            'text': 'Технологии, отработанные вами в ходе миссии, станут эталоном для создания подобных комплексов на новых планетах.'
        },
        {
            'person': GameState.BOSS_PERSON,
            'emotion': GameState.HAPPY_PERSON_EMOTION,
            'text': 'Новые горизонты открываются перед вашим предприятием. Успешное завершение миссии привлекло внимание инвесторов и научных организаций.'
        },
        {
            'person': GameState.BOSS_PERSON,
            'emotion': GameState.HAPPY_PERSON_EMOTION,
            'text': 'Теперь вам предстоит масштабировать производство, внедрять новые технологии и, возможно, заняться разведением других видов сельскохозяйственных животных в условиях космоса.'
        },
    ];

    failSlides = [
        {
            'person': GameState.BOSS_PERSON,
            'emotion': GameState.ANGRY_PERSON_EMOTION,
            'text': 'Миссия завершилась полным крахом.'
        },
        {
            'person': GameState.BOSS_PERSON,
            'emotion': GameState.ANGRY_PERSON_EMOTION,
            'text': 'Из-за ваших ошибок производственный комплекс вышел из строя. Большая часть поголовья погибла, оборудование повреждено.'
        },
        {
            'person': GameState.BOSS_PERSON,
            'emotion': GameState.ANGRY_PERSON_EMOTION,
            'text': 'Галактический Совет исключил ваше предприятие из списка надежных поставщиков. Лицензия аннулирована без права восстановления.'
        },
        {
            'person': GameState.BOSS_PERSON,
            'emotion': GameState.ANGRY_PERSON_EMOTION,
            'text': 'Ваши действия поставили под угрозу продовольственную безопасность нескольких колоний. Начато служебное расследование.'
        },
        {
            'person': GameState.BOSS_PERSON,
            'emotion': GameState.ANGRY_PERSON_EMOTION,
            'text': 'Убытки исчисляются миллионами космических кредитов. Все активы предприятия арестованы для покрытия ущерба.'
        },
        {
            'person': GameState.BOSS_PERSON,
            'emotion': GameState.ANGRY_PERSON_EMOTION,
            'text': 'Вам запрещено заниматься любыми видами космической деятельности. История этой птицефабрики станет учебным примером того, как не надо управлять производством.'
        },
    ];

    static getInstance() {
        if (!OutroStage.instance) {
            OutroStage.instance = new OutroStage();
        }

        return OutroStage.instance;
    }

    constructor() {
        super();

        if (OutroStage.instance) {
            throw new Error('OutroStage class: use getInstance() method instead.');
        }
    }

    init() {
        super.init();

        this.addBackground('public/images/outro/success.png');
        this.addBackground('public/images/outro/fail.png');
    }

    setResult(success) {
        if (success) {
            this.slides = this.successSlides;
            this.switchBackground(0);

        } else  {
            this.slides = this.failSlides;
            this.switchBackground(1);
        }

        this.currentSlide = 0;
    }

    onNextSlide() {
        if (this.currentSlide === this.slides.length - 1) {
            this.helper.onClick(()=>{
                this.restartGame();
                this.helper.hide();
            });
            this.helper.setButtonText('Еще раз');
        } else {
            this.helper.onClick(this.nextSlide.bind(this));
            this.helper.setButtonText('Дальше');
        }
        this.drawTextBlock();
    }

    restartGame() {
        MonitorStage.getInstance().resetGame();

        location.reload();
    }
}
