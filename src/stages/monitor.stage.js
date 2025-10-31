import {Stage} from 'jetcode-scrubjs';

export class MonitorStage extends Stage {
    static instance;

    static getInstance() {
        if (!MonitorStage.instance) {
            MonitorStage.instance = new MonitorStage();
        }

        return MonitorStage.instance;
    }

    init() {
        this.addBackground('public/images/background_main_monitor.png');
    }

    restartGame() {
    }
}
