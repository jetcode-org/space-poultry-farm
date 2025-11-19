import {Sprite} from "jetcode-scrubjs";
import {GameState} from "../services/game.state";
import {ButtonSprite} from "./button.sprite";

export class HelperSprite extends Sprite {
    startY = 700;
    shouldShow = false;
    speed = 1;
    active = false;

    currentText = '';
    currentTextIndex = 0;
    needText = '';
    
    init(){
        this.drawCostume((context)=>{
            context.fillRect(0, 0, 800, 200)
        }, {width:800, height:200})

        this.nextButton = new ButtonSprite();
        this.nextButton.x = this.game.width - this.nextButton.width / 2 - 100;
        this.nextButton.y = this.game.height - this.nextButton.height / 2 - 50;
        this.nextButton.hidden = true;
        
        this.personImage = new Sprite();
        this.personImage.drawCostume((context)=>{
            context.fillStyle = 'white';
            context.fillRect(0, 0, 100, 100);
        }, {width: 100, height: 100})
        this.personImage.x = 100;
        this.personImage.y = 500;
        this.personImage.hidden = true;

        this.layer = 10;
        this.nextButton.layer = 11;
        this.personImage.layer = 11;

        this.y = 700

        this.forever(this.control);
        this.pen(this.showText, this.layer + 1);
    }

    control(){
        if (this.shouldShow) {
            if (this.y > this.startY - 200) {
                this.y -= this.speed;
            } else {
                this.y = this.startY - 200;
                this.active = true;
                this.nextButton.hidden = false;
                this.personImage.hidden = false;
            }
        } else {
            if (this.y < this.startY) {
                this.y += this.speed;
            } else {
                this.y = this.startY;
                
            }
        }
    }

    onReadyCallback() {
        
    }

    onClick(callback) {
        this.nextButton.onClick(callback.bind(this))
    }

    showText(context, helper) {
        if (helper.active) {
            if (helper.currentTextIndex < helper.needText.length) {
                helper.currentText += helper.needText[helper.currentTextIndex];
                helper.currentTextIndex += 1;            
            }
            //context, helper.currentText, 200, 650, 550, 30
            context.fillStyle = '#ffffff';
            context.font = '30px Arial'
            helper.drawMultilineText(context, helper.currentText, 200, 450, 550, 30);
        }
    }

    show(text) {
        GameState.isReadingHelper = true;
        this.shouldShow = true;
        this.currentText = '';
        this.currentTextIndex = 0;
        this.needText = text;
    }

    hide() {
        GameState.isReadingHelper = false;
        this.shouldShow = false;
        this.active = false;
        this.nextButton.hidden = true;
        this.personImage.hidden = true;
    }

    drawMultilineText(context, text, x, y, maxWidth, lineHeight) {
        const words = text.split(' ');
        let line = '';
        let testLine = '';
        let lineArray = [];


        for (let n = 0; n < words.length; n++) {
            testLine = line + words[n] + ' ';
            const metrics = context.measureText(testLine);
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
            context.fillText(lineArray[i], x, y + i * lineHeight);
        }
    }
}