import Background from "../objects/background";

export default class PostGameScene extends Phaser.Scene {

  private background: Background;

  // UI
  private final_score : Phaser.GameObjects.Text;
  private back_to_menu: Phaser.GameObjects.Text;

  constructor () {
    super("PostGameScene");
  }

  public create = () => {
    this.background = new Background(this, 500, 400, 1000, 800);

    // The start button
    this.final_score = this.add.text(this.physics.world.bounds.width / 2, this.physics.world.bounds.height / 2, `SCORE: ${this.registry.get("score")}`, {fontSize: "16px"});
    this.final_score.setOrigin(0.5, 0.5);

    this.back_to_menu = this.add.text(this.physics.world.bounds.width / 2, this.physics.world.bounds.height / 2 + 100, `Back To Main Menu`, {fontSize: "16px"});
    this.back_to_menu.setOrigin(0.5, 0.5);
    this.back_to_menu.setInteractive({useHandCursor: true});
    this.back_to_menu.on('pointerdown', this.start_menu, this);
  }

  public update = () => {
    this.background.update();
  }

  private start_menu = () => {
    this.scene.start("MainMenuScene");
    this.scene.stop();
  }
}