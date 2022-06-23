export default class Bullet5 extends Phaser.GameObjects.Sprite {

  public body: Phaser.Physics.Arcade.Body;

  // Stats
  private damage: number; 

  constructor (scene: Phaser.Scene, x: number, y: number, player: number) {
    let texture = "";
    if (player === 0) texture = "bullet_5";
    else texture = "bullet_6";
    super(scene, x, y, texture);

    this.init_sprite();
    this.init_body();
    this.init_stats();
  }

  private init_sprite = (): void => {
    this.scene.add.existing(this);
  }

  private init_stats = (): void => {
    this.damage = 5;
  }

  // Getters
  public getDamage = (): number => {
    return this.damage;
  }


  // We initialize the body (physics)
  private init_body = (): void => {
    this.scene.physics.add.existing(this);
    this.body.setSize(6, 7);
    this.body.setOffset(8 / 2 + 2, 8 / 2);
  }

  public out_of_bounds = () => {
    // We destroy it once it leaves the canvas
    if (this.body.checkWorldBounds()) {
      this.destroy();
    }
  }


  public pattern_straight = (speed: number) => {
    this.body.setVelocity(0, speed);
  }

  public pattern_split = (speed: number, gravity: number) => {
    this.body.setMaxVelocity(speed);
    this.body.setVelocity(0, speed);
    this.body.setGravityX(gravity);
  }

  public pattern_zig_zag = (speed: number, gravity: number) => {
    this.body.setVelocity(0, speed);
    this.body.setGravityX(gravity);
    this.body.setMaxSpeed(speed)
  }
}