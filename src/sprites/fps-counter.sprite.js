import {Sprite} from "jetcode-scrubjs";

export class FpsCounterSprite extends Sprite {
    init(){
        this.fps = 0;
        this.frameCount = 0;
        this.lastTime = performance.now();

        this.forever(this.control);
        this.pen(this.drawCount);
    }

    control(){
        this.frameCount++;
        const currentTime = performance.now();

        if (currentTime >= this.lastTime + 1000) {
            this.fps = this.frameCount;
            this.frameCount = 0;
            this.lastTime = currentTime;
        }
    }

    drawCount(context, sprite) {
        context.fillStyle = '#ffffff';
        context.font = '16px Arial';

        context.fillText(`FPS: ${sprite.fps}`, sprite.x, sprite.y);
    }
}
