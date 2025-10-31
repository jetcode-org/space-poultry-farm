import {Stage} from 'jetcode-scrubjs';

import {MenubackgroundSprite} from '../sprites/menubackground.sprite.js';
import {ButtonSprite} from '../sprites/button.sprite.js';
import {IntroStage} from "./intro.stage";

export class MenuStage extends Stage {
    static instance;

    static getInstance() {
        if (!MenuStage.instance) {
            MenuStage.instance = new MenuStage();
        }

        return MenuStage.instance;
    }

    init() {
        MenubackgroundSprite.getInstance(0, 1);
        MenubackgroundSprite.getInstance(1, 2);
        MenubackgroundSprite.getInstance(2, 3);
        MenubackgroundSprite.getInstance(3, 4);

        const startButton = new ButtonSprite();
        startButton.layer = 4;

        startButton.onReady(()=>{
            startButton.setLabel('start');
        });

        startButton.onClick(() => {
            this.game.run(IntroStage.getInstance());
        });
    }

}
