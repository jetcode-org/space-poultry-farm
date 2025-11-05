import {Game} from 'jetcode-scrubjs';
import {MenuStage} from './stages/menu.stage.js';
import {IntroStage} from "./stages/intro.stage";
import {OutroStage} from "./stages/outro.stage";
import {MonitorStage} from "./stages/monitor.stage";

export const game = new Game(800, 600);
game.context.imageSmoothingEnabled = false;
// game.debugCollider = true;

MenuStage.getInstance();
IntroStage.getInstance();
OutroStage.getInstance();
MonitorStage.getInstance();





game.run(MonitorStage.getInstance());
//game.run(MenuStage.getInstance());
// game.run(IntroStage.getInstance());
// game.run(OutroStage.getInstance());
