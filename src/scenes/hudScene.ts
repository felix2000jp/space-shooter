export default class HudScene extends Phaser.Scene {

  // UI
  private health: Phaser.GameObjects.Text;
  private heart : Phaser.GameObjects.Image;
  private score : Phaser.GameObjects.Text;

  // Values
  private value_health: number;
  private value_score : number;

  constructor () {
    super("HudScene");
  }

  public create = () => {
    // The player health
    this.heart  = this.add.image(this.physics.world.bounds.width - 45, 13.25, "heart");
    this.health = this.add.text(this.physics.world.bounds.width - 5 , 5, `${this.registry.get("health")}`, {fontSize: "16px"});
    this.health.setOrigin(1, 0);

    // The score
    this.score = this.add.text(5, 5, `SCORE: ${this.registry.get("score")}`, {fontSize: "16px"});

    // Updating Health and Score
    const game_scene = this.scene.get("GameScene");
    game_scene.events.on("update_score", this.update_score, this); 
    game_scene.events.on("update_health", this.update_health, this); 
  }

  private update_score = () => {
    this.score.setText(`SCORE: ${this.registry.get('score')}`);
  }

  private update_health() {
    this.health.setText(`${this.registry.get('health')}`);
  }
}