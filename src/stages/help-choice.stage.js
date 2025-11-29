import {Stage} from 'jetcode-scrubjs';

import {LayerBackgroundSprite} from '../sprites/layer-background.sprite.js';
import {ButtonSprite} from '../sprites/button.sprite.js';
import {IntroStage} from "./intro.stage.js";
import {HelperSprite } from "../sprites/helper.sprite.js";
import { GameState } from '../services/game.state.js';


export class HelpChoiceStage extends Stage {
    static instance;

    static getInstance() {
        if (!HelpChoiceStage.instance) {
            HelpChoiceStage.instance = new HelpChoiceStage();
        }

        return HelpChoiceStage.instance;
    }

    init() {
        LayerBackgroundSprite.create(0, 'public/images/menu/layer_1.jpg');

        const withHelp = new ButtonSprite();
        withHelp.layer = 4;
        withHelp.y -= 25
        withHelp.hidden = true;

        withHelp.onReady(()=>{
            withHelp.setLabel('С подсказками');
        });


        withHelp.onClick(() => {
            GameState.getInstance().teachingMode = true;
            this.game.run(IntroStage.getInstance());
        });

        const withoutHelp = new ButtonSprite();
        withoutHelp.layer = 4;
        withoutHelp.y += 25;
        withoutHelp.hidden = true;

        withoutHelp.onReady(()=>{
            GameState.getInstance().teachingMode = false;
            withoutHelp.setLabel('Без подсказок');
        });

        withoutHelp.onClick(() => {
            this.game.run(IntroStage.getInstance());
        });

        const helper = new HelperSprite()
        this.onStart(()=>{
            helper.show('Выберите, нужны ли вам посказки?', GameState.AI_PERSON, GameState.HAPPY_PERSON_EMOTION);
            helper.onClick(()=>{
                helper.hide();
                withHelp.hidden = false;
                withoutHelp.hidden = false;
            }, 'хорошо');
        })
    }
}
