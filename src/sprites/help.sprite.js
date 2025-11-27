import {Sprite} from "jetcode-scrubjs";

export class HelpSprite extends Sprite {
    help = null;

    init() {
        super.init();

        this.forever(() => {
            if (this.help !== null && this.touchMouse()) {
                this.stage.showHelp(this.help);
            }
        });
    }
}
