import {ButtonSprite} from '../sprites/button.sprite.js';
import {AbstractSlideStageStage} from "./abstract-slide-stage.stage";
import {MonitorStage} from "./monitor.stage";
import {MenuStage} from "./menu.stage";

export class OutroStage extends AbstractSlideStageStage {
    static instance;
    textBlockHeight = 160;

    successSlides = [
        {
            'text': 'Ваш космический птицеводческий комплекс успешно доставил жизненно важный груз яиц на целевые планеты. Благодаря вашему грамотному управлению и своевременному выполнению всех производственных циклов, тысячи свежих яиц пополнили продовольственные запасы колонистов.'
        },
        {
            'text': 'Признание Галактического Совета не заставило себя ждать - ваша птицефабрика получила статус "Образцовое предприятие космического сельского хозяйства". Технологии, отработанные вами в ходе миссии, станут эталоном для создания подобных комплексов на новых планетах.'
        },
        {
            'text': 'Новые горизонты открываются перед вашим предприятием. Успешное завершение миссии привлекло внимание инвесторов и научных организаций. Теперь вам предстоит масштабировать производство, внедрять новые технологии и, возможно, заняться разведением других видов сельскохозяйственных животных в условиях космоса.'
        },
    ];

    failSlides = [
        {
            'text': 'Плохая концовка, сообщение 1.'
        },
        {
            'text': 'Плохая концовка, сообщение 2.'
        },
        {
            'text': 'Плохая концовка, сообщение 3.'
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
        this.addBackground('public/images/outro/fail.jpg');
        
    }

    setResult(success) {
        if (success) {
            this.slides = this.successSlides;
            this.switchBackground(0);

        } else  {
            this.slides = this.failSlides;
            this.switchBackground(1);
        }
    }

    onNextSlide() {
        if (this.currentSlide === this.slides.length - 1) {
            this.helper.onClick(()=>{
                this.runGame();
                this.helper.hide();
            });
            this.helper.setButtonText('Еще раз');
        } else {
            this.helper.onClick(this.nextSlide.bind(this));
            this.helper.setButtonText('Дальше');
        }
        this.drawTextBlock();
    }

    runGame() {
        MonitorStage.getInstance().restartGame();

        this.game.run(MenuStage.getInstance());
    }
}
