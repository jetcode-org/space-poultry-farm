import { Sprite } from "jetcode-scrubjs";
import { GameState } from "../services/game.state";
import { AbstractProgressBarSprite } from "./abstract-progress-bar.sprite";

export class ProgressBarSprite extends AbstractProgressBarSprite {
    
    control(){
        super.control();
        if (this.game.keyPressed('d')) {
            this.targetValue += 5;
        }
        if (this.game.keyPressed('a')) {
            this.targetValue -= 5;
        }
    }

}
