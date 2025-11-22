import {Stage} from 'jetcode-scrubjs';

import {LayerBackgroundSprite} from '../sprites/layer-background.sprite.js';
import {ButtonSprite} from '../sprites/button.sprite.js';
import {IntroStage} from "./intro.stage";
import {HelperSprite } from "../sprites/helper.sprite.js";


export class MenuStage extends Stage {
    static instance;

    static getInstance() {
        if (!MenuStage.instance) {
            MenuStage.instance = new MenuStage();
        }

        return MenuStage.instance;
    }

    init() {
        LayerBackgroundSprite.create(0, 'public/images/menu/layer_1.jpg');

        const startButton = new ButtonSprite();
        startButton.layer = 4;

        startButton.onReady(()=>{
            startButton.setLabel('Играть');
        });

        startButton.onClick(() => {
            this.game.run(IntroStage.getInstance());
        });
    }
}
