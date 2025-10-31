import {Stage} from 'jetcode-scrubjs';

import {ButtonSprite} from '../sprites/button.sprite.js';
import {AbstractSlideStageStage} from "./abstract-slide-stage.stage";
import {MonitorStage} from "./monitor.stage";

export class IntroStage extends AbstractSlideStageStage {
    static instance;

    slides = [
        {
            'text': 'Когда-то задолго до того, как о нём узнала вся вселенная ScrubJS, наш герой был обычным крабом, жившим на окраине цифрового океана. В те времена SuperCrub не обладал ни суперсилой, ни славой, ни даже своим знаменитым плащом. Его жизнь была простой и ничем не примечательной - до того самого дня, когда прошлое напомнило о себе.'
        },
        {
            'text': 'Однажды, исследуя старую прибрежную пещеру, молодой краб оказался втянут в загадочный подземный лабиринт. Этот лабиринт был наполнен эхо забытых событий и опасными монстрами, порождёнными ошибками и багами старых программ. А в глубине подземелья скрывался финальный босс - древний баг, угрожающий всей вселенной ScrubJS.'
        },
        {
            'text': 'Чтобы выбраться наружу, наш герой должен был не только победить монстров, но и разобраться с собственными страхами и ошибками прошлого. Именно в этих испытаниях закалялся характер будущего супергероя. Каждый шаг по лабиринту приближал его к превращению в того самого SuperCrub, которого теперь знает и любит вся команда ScrubJS.'
        },
        {
            'text': '"SuperCrub: Начало" - это история о том, как даже самый обычный герой может обрести силу, если не боится встретиться лицом к лицу с эхо прошлого и преодолеть лабиринт собственных испытаний.'
        },
    ];

    static getInstance() {
        if (!IntroStage.instance) {
            IntroStage.instance = new IntroStage();
        }

        return IntroStage.instance;
    }

    constructor() {
        super();

        if (IntroStage.instance) {
            throw new Error('IntroStage class: use getInstance() method instead.');
        }
    }

    init() {
        super.init();

        this.addBackground('public/images/intro.jpg');

        this.startButton = new ButtonSprite();
        this.startButton.layer = 4;
        this.startButton.minSize = 1000;
        this.startButton.maxSize = 1100;
        this.startButton.x = this.width - 80;
        this.startButton.y = this.height - 30;
        this.startButton.hidden = true;
        this.startButton.onClick(this.runGame.bind(this));

        this.startButton.onReady(() => {
            this.startButton.setLabel('Играть');
        });
    }

    onNextSlide() {
        if (this.currentSlide === this.slides.length - 1) {
            this.nextButton.hidden = true;
            this.startButton.hidden = false;
        }
    }

    runGame() {
        this.game.run(MonitorStage.getInstance());
    }
}
