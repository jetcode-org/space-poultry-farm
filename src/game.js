import {Game} from 'jetcode-scrubjs';
import {MenuStage} from './stages/menu.stage.js';
import {IntroStage} from "./stages/intro.stage";
import {OutroStage} from "./stages/outro.stage";
import {MonitorStage} from "./stages/monitor.stage";
import {MissionStage} from "./stages/mission.stage";

export const game = new Game(800, 600, null, false);
game.context.imageSmoothingEnabled = false;
game.showFps = true;
// game.debugCollider = true;

MenuStage.getInstance();
IntroStage.getInstance();
MissionStage.getInstance();
OutroStage.getInstance();
MonitorStage.getInstance();

game.run(MenuStage.getInstance());
// game.run(MonitorStage.getInstance());
// game.run(MissionStage.getInstance());
// game.run(IntroStage.getInstance());
// game.run(OutroStage.getInstance());
