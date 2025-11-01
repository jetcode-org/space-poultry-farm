import {Sprite, Stage} from 'jetcode-scrubjs';
import {ButtonSprite} from "../../sprites/button.sprite";
import {MonitorStage} from "../monitor.stage";
import {AbstractStage} from "../abstract.stage";
import {GameState} from "../../services/game.state";

export class AbstractRootStage extends AbstractStage {
   active = false;
   thumbnail;

   init() {
      this.gameState = GameState.getInstance();

      this.addBackground('public/images/background_main_monitor.png');

      this.backgroundSprite = new Sprite();
      this.backgroundSprite.addCostume(this.getBackgroundImage());
      this.backgroundSprite.layer = 1;
      this.backgroundSprite.x = 300;
      this.backgroundSprite.y = 300
      this.backgroundSprite.filter = 'grayscale(100%)';

      this.createBackButton();
      this.createActivateButton();

      this.forever(this.gameTickAllRooms, 1000);

      this.pen(this.drawTextBlock.bind(this), 3);
   }

   createBackButton() {
      const backButton = new ButtonSprite();
      backButton.layer = 3;
      backButton.x = 690;
      backButton.y = 130;

      backButton.onReady(()=>{
         backButton.setLabel('Назад');
      });

      backButton.onClick(() => {
         this.game.run(MonitorStage.getInstance());
      });
   }

   createActivateButton() {
      this.activateButton = new ButtonSprite();
      this.activateButton.layer = 3;
      this.activateButton.x = 250;
      this.activateButton.y = 400;

      this.activateButton.onReady(()=>{
         this.activateButton.setLabel('Актив.');
      });

      this.activateButton.onClick(() => {
         this.activate();
      });
   }

   getLabel() {
      console.error('Метод не определен.');
   }

   getBackgroundImage() {
      console.error('Метод не определен.');
   }

   getThumbnailImage() {
      console.error('Метод не определен.');
   }

   resetRoom() {

   }

   roomTick () {
   }

   setThumbnail(thumbnailSprite) {
      this.thumbnail = thumbnailSprite;
   }

   activate() {
      if (this.active) {
         return;
      }

      this.active = true;

      this.backgroundSprite.filter = 'grayscale(0)';
      this.activateButton.hidden = true;
      this.gameState.chargeValue = 0;

      if (this.thumbnail) {
         this.thumbnail.activate();
      }
   }

   gameTickAllRooms () {
      MonitorStage.getInstance().gameTick();
   }

   drawTextBlock(context) {
      if (this.active) {
         return false;
      }

      if (this.activateButton && this.gameState.isEnoughCharge()) {
         this.activateButton.hidden = false;

      } else {
         this.activateButton.hidden = true;
      }

      context.fillStyle = "rgba(0, 0, 0, 0.5)";
      context.fillRect(100, 150, 400, 300);

      context.font = '18px Arial';
      context.fillStyle = 'white';
      const text = 'В данный момент отсек обесточен. Он не работает';

      this.drawMultilineText(context, text, 120, 200, 350, 30);

   }

}
