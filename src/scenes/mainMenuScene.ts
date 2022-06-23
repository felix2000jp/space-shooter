import Background from "../objects/background";

export default class MainMenuScene extends Phaser.Scene {

  // UI
  private start_button: Phaser.GameObjects.Text;
  private background  : Background;

  constructor () {
    super("MainMenuScene");
  }

  public create = () => {
    // Background
    this.background = new Background(this, 500, 400, 1000, 800);

    // The start button
    this.start_button = this.add.text(this.physics.world.bounds.width / 2, this.physics.world.bounds.height / 2, "START", {fontSize: "16px"});
    this.start_button.setOrigin(0.5, 0.5);
    this.start_button.setInteractive({useHandCursor: true});
    this.start_button.on('pointerdown', this.start_game, this);

    // We init a registry for values that are going to be shared between scenes
    this.registry.set('score' , 0);
    this.registry.set('health', 10);
  }

  public update = () => {
    this.background.update();
  }

  private start_game = () => {
    this.scene.start("GameScene");
    this.scene.start("HudScene");
    this.scene.bringToTop("HudScene");
    this.scene.stop();
  }
}