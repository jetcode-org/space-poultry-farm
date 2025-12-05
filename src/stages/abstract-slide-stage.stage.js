import {Stage} from 'jetcode-scrubjs';

import {ButtonSprite} from '../sprites/button.sprite.js';
import {AbstractStage} from "./abstract.stage";
import { HelperSprite } from '../sprites/helper.sprite.js';
import {GameState} from "../services/game.state";

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

        const slide = this.slides[this.currentSlide];

        const text = slide.text;
        const person = slide.person !== undefined ? slide.person : null;
        const emotion = slide.emotion !== undefined ? slide.emotion : GameState.NORMAL_PERSON_EMOTION;

        this.helper.show(text, person, emotion);
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
