import {Sprite} from "jetcode-scrubjs";
import {GameState} from "../services/game.state";
import {ButtonSprite} from "./button.sprite";

export class HelperSprite extends Sprite {
    startY = 700;
    shouldShow = false;
    speed = 8;
    active = false;

    currentText = '';
    currentTextIndex = 0;
    needText = '';

    imageTick = 0;
    imageTickSpeed = 6;

    showPerson = false;

    currentPerson = null;

    init(){
        this.drawCostume((context)=>{
            context.fillRect(0, 0, 800, 200)
        }, {width:800, height:200})

        this.nextButton = new ButtonSprite();
        this.nextButton.x = this.game.width - this.nextButton.width / 2 - 100;
        this.nextButton.y = this.game.height - this.nextButton.height / 2 - 50;
        this.nextButton.hidden = true;

        this.personImage = new Sprite();
        this.personImage.x = 100;
        this.personImage.y = 500;
        this.personImage.size = 27;
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
                if (this.showPerson) {
                    this.personImage.hidden = false;
                }
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

    onClick(callback, newText='') {
        this.nextButton.onClick(callback.bind(this))
        if (newText){
            this.nextButton.setLabel(newText);
        }
    }

    setButtonText(text) {
        this.nextButton.setLabel(text);
    }

    showText(context, helper) {
        if (helper.active) {
            if (helper.currentTextIndex < helper.needText.length) {
                helper.currentText += helper.needText[helper.currentTextIndex];
                helper.currentTextIndex += 1;
                helper.imageTick += 1;
                if (helper.imageTick >= helper.imageTickSpeed) {
                    helper.personImage.nextCostume();
                    helper.imageTick = 0;
                }
            } else {
                helper.personImage.switchCostume(0);
            }

            context.fillStyle = '#ffffff';
            context.font = '20px Arial';
            if (helper.showPerson) {
                helper.drawMultilineText(context, helper.currentText, 200, 450, 550, 30);
            } else {
                helper.drawMultilineText(context, helper.currentText, 50, 450, 700, 30);
            }
        }
    }

    show(text, person = null, emotion = 'Normal') {
        GameState.getInstance().isReadingHelper = true;
        this.shouldShow = true;
        this.currentText = '';
        this.currentTextIndex = 0;
        this.needText = text;
        this.showPerson = person != null;
        if (person && this.currentPerson != person + emotion) {
            this.clearPersonCostumes();
            this.setPerson(person, emotion);
        }
    }

    hide() {
        GameState.getInstance().isReadingHelper = false;
        this.shouldShow = false;
        this.active = false;
        this.nextButton.hidden = true;
        this.personImage.hidden = true;
        this.showPerson = false;
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

    clearPersonCostumes() {
        if (this.personImage.getCostume() == null){
            return;
        }
        while(this.personImage.getCostume() != null) {
            this.personImage.removeCostume(this.personImage.getCostumeIndex())
        }
    }

    setPerson(person, emotion) {
        for(const costume of GameState.getInstance().personAnimations[person + emotion]) {
            this.personImage.addCostume(costume);
        }
        this.currentPerson = person + emotion;
    }
}
