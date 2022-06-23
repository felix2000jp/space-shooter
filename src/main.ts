import Phaser from "phaser";
import LoadScene from "./scenes/loadScene";
import GameScene from "./scenes/gameScene";
import HudScene from "./scenes/hudScene";
import MainMenuScene from "./scenes/mainMenuScene";
import PostGameScene from "./scenes/postGameScene";

const game: Phaser.Game = new Phaser.Game({
  type: Phaser.AUTO,
  pixelArt: true,
  zoom: 2.5,
  scale: {
    width: 400,
    height: 300,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  physics: {
    default: "arcade",
    arcade: {
      debug: false,
      gravity: {
        x: 0,
        y: 0,
      }
    }
  },
  scene: [LoadScene, MainMenuScene, HudScene, GameScene, PostGameScene]
}); 