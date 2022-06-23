export default class Bullet1 extends Phaser.GameObjects.Sprite {

  public body: Phaser.Physics.Arcade.Body;

  // Stats
  private damage: number; 

  constructor (scene: Phaser.Scene, x: number, y: number, player: number) {
    let texture = ""
    if (player === 0 ) texture = "bullet_1";
    else texture = "bullet_2";
    super(scene, x, y, texture);

    this.init_sprite();
    this.init_body();
    this.init_stats();
  }

  private init_sprite = (): void => {
    this.scene.add.existing(this);
  }

  // We initialize the body (physics)
  private init_body = (): void => {
    this.scene.physics.add.existing(this);
    this.body.setCircle(2.5);
    this.body.setOffset(8 / 2 + 2.5, 8 / 2 + 2);
    this.body.setVelocity(0, 100);

  }

  private init_stats = (): void => {
    this.damage = 1;
  }

  // Getters
  public getDamage = (): number => {
    return this.damage;
  }


  // We destroy it once it leaves the canvas
  public out_of_bounds = () => {
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


  public pattern_angle = (speed: number, angle: number) => {
    this.body.setVelocity(0, speed);

    switch (angle) {
      case 0:
        this.setAngle(0);
        this.body.setVelocity(0, speed);
        break;
      case 45:
        this.setAngle(45);
        this.body.setVelocity(-speed, speed);
        break;
      case 90:
        this.setAngle(90);
        this.body.setVelocity(-speed, 0);
        break;
      case 135:
        this.setAngle(135);
        this.body.setVelocity(-speed, -speed);
        break;
      case 180:
        this.setAngle(180);
        this.body.setVelocity(0, -speed);
        break;
      case 225:
        this.setAngle(225);
        this.body.setVelocity(speed, -speed);
        break;
      case 270:
        this.setAngle(270);
        this.body.setVelocity(speed, 0);
        break;
      case 315:
        this.setAngle(315);
        this.body.setVelocity(speed, speed);
        break;
      default:
        break;
    }
  }
}