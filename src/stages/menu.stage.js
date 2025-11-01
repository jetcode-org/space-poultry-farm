import {Stage} from 'jetcode-scrubjs';

import {MenuBackgroundSprite} from '../sprites/menu-background.sprite.js';
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
        MenuBackgroundSprite.getInstance(0, 1);
        MenuBackgroundSprite.getInstance(1, 2);
        MenuBackgroundSprite.getInstance(2, 3);
        MenuBackgroundSprite.getInstance(3, 4);

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
