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

    readyCallback = null;
    readyText = '';

    fontSize = 20;

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
        this.personImage.size = 100;
        this.personImage.hidden = true;

        this.layer = 10;
        this.nextButton.layer = 11;
        this.personImage.layer = 11;

        this.y = 700

        this.forever(this.control);
        this.pen(this.showText.bind(this), this.layer + 1);
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
        this.readyCallback = callback.bind(this);
        if (newText){
            this.readyText = newText;
        }
    }

    setReady() {
        if (this.readyCallback) {
            this.nextButton.onClick(this.readyCallback);
        } else {
            this.nextButton.onClick(this.hide);
        }
        if (this.readyText) {
            this.nextButton.setLabel(this.readyText);
        } else {
            this.nextButton.setLabel('');
        }
    }

    setButtonText(text) {
        this.readyText = text;
    }

    showText(context) {
        if (this.active) {
            if (this.currentTextIndex < this.needText.length) {
                this.currentText += this.needText[this.currentTextIndex];
                this.currentTextIndex += 1;
                this.imageTick += 1;
                if (this.imageTick >= this.imageTickSpeed) {
                    this.personImage.nextCostume();
                    this.imageTick = 0;
                }
            } else {
                this.personImage.switchCostume(0);
                this.setReady();
            }

            context.fillStyle = '#ffffff';
            context.font = this.fontSize + 'px Arial';
            context.textAlign = 'start';
            if (this.showPerson) {
                this.drawMultilineText(context, this.currentText, 200, 450, 550, 30);
            } else {
                this.drawMultilineText(context, this.currentText, 50, 450, 700, 30);
            }
        }
    }

    show(text, person = null, emotion = GameState.NORMAL_PERSON_EMOTION) {
        GameState.getInstance().isReadingHelper = true;
        this.shouldShow = true;
        this.currentText = '';
        this.currentTextIndex = 0;
        this.needText = text;
        this.showPerson = person != null;

        if (person && this.currentPerson !== person + emotion) {
            this.clearPersonCostumes();
            this.setPerson(person, emotion);
        }

        this.nextButton.onClick(()=>{
            this.currentTextIndex = this.needText.length;
            this.currentText = this.needText;
        });

        this.nextButton.setLabel('Пропустить');
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
        for (const costume of GameState.getInstance().personAnimations[person][emotion]) {
            this.personImage.addCostume(costume);
        }

        this.currentPerson = person + emotion;
    }
}
