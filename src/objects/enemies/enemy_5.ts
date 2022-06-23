import { ship_iddle_6 } from "../../animations/iddleShip6";
import { explosion } from "../../animations/explosion";
import Bullet3 from "../bullets/bullet_3";
import Bullet5 from "../bullets/bullet_5";
import Bullet1 from "../bullets/bullet_1";

export default class Enemy extends Phaser.GameObjects.Sprite {

  public body: Phaser.Physics.Arcade.Body;

  // Stats
  private speed_x        : number;
  private speed_y        : number;
  private fire_rate      : number;
  private last_shot      : number;
  private shots_per_burst: number;
  private current_shot   : number;
  private burst_interval : number;
  private health_points  : number; 
  private score_points : number;


  constructor (scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, "spaceship_6-1");
    this.scene.add.existing(this);
    this.scene.physics.add.existing(this);
    
    this.init_sprite();
    this.init_stats();
    this.init_body();
  }

  // We initialize the sprite
  private init_sprite = (): void => {
    this.anims.create(ship_iddle_6); 
    this.play("spaceship_6");
  }
  

  // We initialize the body (physics)
  private init_body = (): void => {
    this.body.setSize(21, 10);
    this.body.setOffset(16 / 2 - 2, 16 / 2 + 1);
    this.body.setVelocity(0, this.speed_y);
  }

  // We initialize the body (physics)
  private init_stats = (): void => {
    this.speed_x = 30;
    this.speed_y = 50;
    this.fire_rate = 1500;
    this.last_shot = 0;
    this.shots_per_burst = 8;
    this.current_shot    = 0;
    this.burst_interval  = 100;
    this.health_points = 3;
    this.score_points = 50;
  }

  public move = () => {
    const max_y = 50;
    const max_x = this.scene.physics.world.bounds.width - 30;
    const min_x = 10;

    // We move it until it gets to the desired Y position
    if (this.body.y > max_y){
      if (this.body.x < min_x) this.speed_x *= -1;
      else if (this.body.x > max_x) this.speed_x *= -1; 
      this.body.setVelocity(this.speed_x, 0);
    } 
    
  }

  // Set up shooting pattern
  public shoot = (bullets: Phaser.GameObjects.Group) => {
    if(this.current_shot < this.shots_per_burst && this.scene.time.now > this.last_shot) {
      const bullet1 = new Bullet3(this.scene, this.x, this.y, 1);
      const pattern = Phaser.Utils.Array.NumberArrayStep(-200, 200, 50);
      bullet1.pattern_zig_zag(100, pattern[this.current_shot]);      
      bullets.add(bullet1);
      
      this.current_shot += 1;
      this.last_shot = this.scene.time.now + this.burst_interval;
    }
    else if (this.current_shot >= this.shots_per_burst) {
      this.current_shot = 0;
      this.last_shot    = this.scene.time.now + this.fire_rate;
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