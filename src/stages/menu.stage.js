import {Stage} from 'jetcode-scrubjs';

import {MenuBackgroundSprite} from '../sprites/menu-background.sprite.js';
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
        MenuBackgroundSprite.getInstance(0, 1);
        MenuBackgroundSprite.getInstance(1, 2);
        MenuBackgroundSprite.getInstance(2, 3);
        MenuBackgroundSprite.getInstance(3, 4);

        const startButton = new ButtonSprite();
        startButton.layer = 4;

        startButton.onReady(()=>{
            startButton.setLabel('Играть');
        });

        startButton.onClick(() => {
            this.game.run(IntroStage.getInstance());
        });

        this.helper = new HelperSprite();
        this.helper.onClick(this.helper.hide)
        this.onReady(()=>{
            this.helper.show('Привет землянам asd asd asd asd asd asd asd asd asd asd asd asd asd!');
        })
    }

}
