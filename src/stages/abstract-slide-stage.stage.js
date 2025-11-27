import {Stage} from 'jetcode-scrubjs';

import {ButtonSprite} from '../sprites/button.sprite.js';
import {AbstractStage} from "./abstract.stage";
import { HelperSprite } from '../sprites/helper.sprite.js';

export class AbstractSlideStageStage extends AbstractStage {
    currentSlide = 0;
    slides = [];
    textBlockHeight = 200;
    textBlockReady = false;
    currentTextBlockHeight = 0;
    slideTimer = 0;
    nextButtonLabel = 'Далее';

    init() {
        this.helper = new HelperSprite();

        this.onStart(()=>{
            this.drawTextBlock();
            this.helper.onClick(()=>{
                this.nextSlide();
            }, 'Дальше');
        })
    }

    drawTextBlock() {
        if (!this.slides[this.currentSlide]) {
            return;
        }

        this.helper.show(this.slides[this.currentSlide].text);
    }

    nextSlide() {
        this.currentSlide++;

        this.onNextSlide();
    }

    reset() {
        this.currentSlide = 0;
        this.textBlockReady = false;
        this.currentTextBlockHeight = 0;
        this.slideTimer = 0;
    }
}
