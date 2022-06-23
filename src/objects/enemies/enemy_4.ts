import { ship_iddle_5 } from "../../animations/iddleShip5";
import { explosion } from "../../animations/explosion";
import Bullet1 from "../bullets/bullet_1";
import Bullet5 from "../bullets/bullet_5";
import Bullet3 from "../bullets/bullet_3";

export default class Enemy extends Phaser.GameObjects.Sprite {

  public body: Phaser.Physics.Arcade.Body;

  // Stats
  private speed_x      : number;
  private speed_y      : number;
  private fire_rate    : number;
  private last_shot    : number;
  private health_points: number;
  private score_points : number; 


  constructor (scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, "spaceship_5-1");
    this.scene.add.existing(this);
    this.scene.physics.add.existing(this);
    
    this.init_sprite();
    this.init_stats();
    this.init_body();
  }

  // We initialize the sprite
  private init_sprite = (): void => {
    this.anims.create(ship_iddle_5); 
    this.play("spaceship_5");
  }
  

  // We initialize the body (physics)
  private init_body = (): void => {
    this.body.setCircle(8);
    this.body.setOffset(16 / 2 + 0.5, 16 / 2);
    this.body.setVelocity(this.speed_x, this.speed_y);
  }

  // We initialize the body (physics)
  private init_stats = (): void => {
    this.speed_x = 0;
    this.speed_y = 50;
    this.fire_rate = 2000;
    this.last_shot = 0;
    this.health_points = 3;
    this.score_points = 40;
  }

  public move = () => {
    const max_y = 100;
    const min_x = 10;
    if (this.body.y > max_y) this.body.setVelocityY(0);
  }


  // Set up shooting pattern
  public shoot = (bullets: Phaser.GameObjects.Group) => {
    if (this.scene.time.now > this.last_shot) {
      const bullet1 = new Bullet1(this.scene, this.x - 1, this.y, 1);
      const bullet2 = new Bullet1(this.scene, this.x - 1, this.y, 1);
      const bullet3 = new Bullet1(this.scene, this.x - 1, this.y, 1);
      const bullet4 = new Bullet1(this.scene, this.x - 1, this.y, 1);
      const bullet5 = new Bullet1(this.scene, this.x - 1, this.y, 1);
      const bullet6 = new Bullet1(this.scene, this.x - 1, this.y, 1);
      const bullet7 = new Bullet1(this.scene, this.x - 1, this.y, 1);
      const bullet8 = new Bullet1(this.scene, this.x - 1, this.y, 1);
      bullet1.pattern_angle(100, 0);
      bullet2.pattern_angle(100, 45);
      bullet3.pattern_angle(100, 90);
      bullet4.pattern_angle(100, 135);
      bullet5.pattern_angle(100, 180);
      bullet6.pattern_angle(100, 225);
      bullet7.pattern_angle(100, 270);
      bullet8.pattern_angle(100, 315);
      bullets.add(bullet1);
      bullets.add(bullet2);
      bullets.add(bullet3);
      bullets.add(bullet4);
      bullets.add(bullet5);
      bullets.add(bullet6);
      bullets.add(bullet7);
      bullets.add(bullet8);
      this.last_shot = this.scene.time.now + this.fire_rate;
    }
  }

  // When the enemy gets hit
  public hit = (bullet: Bullet1 | Bullet3 | Bullet5) => {
    // We take away the health points based on the bullet damage
    this.health_points = this.health_points - bullet.getDamage();
    const explosion_sprite = this.scene.add.sprite(this.body.x, this.body.y, "explosion-1");
    explosion_sprite.anims.create(explosion);
    explosion_sprite.setPosition(bullet.body.x, bullet.body.y);
    explosion_sprite.play("explosion");

    if (this.health_points <= 0) {
      this.scene.registry.set('score', this.score_points + this.scene.registry.get("score"));
      this.scene.events.emit('update_score');
      explosion_sprite.once(Phaser.Animations.Events.ANIMATION_COMPLETE, () => {
        explosion_sprite.destroy();
        this.destroy();
      });
    }
    else {
      explosion_sprite.once(Phaser.Animations.Events.ANIMATION_COMPLETE, () => explosion_sprite.destroy());
    }
  }

  // We destroy it once it leaves the canvas
  public out_of_bounds = () => {
    const max_y = this.scene.physics.world.bounds.height + 10;
    if (this.body.y > max_y) {
      this.destroy();
    }
  }
}