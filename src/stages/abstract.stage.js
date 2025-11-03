import {Stage} from 'jetcode-scrubjs';

import {ButtonSprite} from '../sprites/button.sprite.js';

export class AbstractStage extends Stage {
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
    // хз как это вызывать, отсюда напишу пока в монитор стрейжд
    drawResoursesPanel() {
        let mainResPanel = new Sprite()
        mainResPanel.addCostume('public/images/top_panel_base.png')
    }
}
