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

        this.addBackground('public/images/outro/success.jpg');
        this.addBackground('public/images/outro/fail.jpg');

        this.startButton = new ButtonSprite();
        this.startButton.layer = 4;
        this.startButton.minSize = 90;
        this.startButton.maxSize = 110;
        this.startButton.x = 80;
        this.startButton.y = this.height - 30;
        this.startButton.hidden = true;
        this.startButton.onClick(this.runGame.bind(this));

        this.startButton.onReady(() => {
            this.startButton.setLabel('Еще раз', 'white', 70);
        });
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
            this.nextButton.hidden = true;
            this.startButton.hidden = false;
        }
    }

    runGame() {
        MonitorStage.getInstance().restartGame();

        this.game.run(MenuStage.getInstance());
    }
}
