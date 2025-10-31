import {Stage} from 'jetcode-scrubjs';

import {ButtonSprite} from '../sprites/button.sprite.js';

export class AbstractSlideStageStage extends Stage {
    currentSlide = 0;
    slides = [];
    textBlockHeight = 200;
    textBlockReady = false;
    currentTextBlockHeight = 0;
    slideTimer = 0;


    init() {
        this.nextButton = new ButtonSprite();
        this.nextButton.layer = 4;
        this.nextButton.minSize = 900;
        this.nextButton.maxSize = 1050;
        this.nextButton.x = this.width - 80;
        this.nextButton.y = this.height - 30;
        this.nextButton.hidden = true;
        this.nextButton.onClick(this.nextSlide.bind(this));

        this.nextButton.onReady(() => {
            this.nextButton.setLabel('Далее', 'white', 9);
        });

        this.pen(this.drawTextBlock.bind(this));
    }

    drawTextBlock(context) {
        if (!this.slides[this.currentSlide]) {
            return;
        }

        this.slideTimer++;

        if (this.slideTimer < 35) {
            return;
        }

        context.fillStyle = "rgba(0, 0, 0, 0.9)";
        context.fillRect(0, this.height - this.currentTextBlockHeight, this.width, this.currentTextBlockHeight);

        if (this.currentTextBlockHeight >= this.textBlockHeight) {
            context.font = '18px Arial';
            context.fillStyle = 'white';
            const text = this.slides[this.currentSlide].text;

            this.drawMultilineText(context, text, 20, this.height - this.currentTextBlockHeight + 30, this.width - 40, 22);

            if (!this.textBlockReady) {
                this.nextButton.hidden = false;
            }

            this.textBlockReady = true;

        } else {
            this.currentTextBlockHeight += 5;
        }
    }

    nextSlide() {
        this.currentSlide++;

        this.onNextSlide();
    }

    drawMultilineText(ctx, text, x, y, maxWidth, lineHeight) {
        const words = text.split(' ');
        let line = '';
        let testLine = '';
        let lineArray = [];

        for (let n = 0; n < words.length; n++) {
            testLine = line + words[n] + ' ';
            const metrics = ctx.measureText(testLine);
            const testWidth = metrics.width;

            if (testWidth > maxWidth && n > 0) {
                lineArray.push(line.trim());
                line = words[n] + ' ';
            } else {
                line = testLine;
            }
        }
        lineArray.push(line.trim());

        for (let i = 0; i < lineArray.length; i++) {
            ctx.fillText(lineArray[i], x, y + i * lineHeight);
        }
    }
}
