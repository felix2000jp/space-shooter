import { explosion } from "../animations/explosion";
import { ship_iddle_1 } from "../animations/iddleShip1";
import Bullet1 from "./bullets/bullet_1";
import Bullet3 from "./bullets/bullet_3";
import Bullet5 from "./bullets/bullet_5";

export default class Player extends Phaser.GameObjects.Sprite {

  public body: Phaser.Physics.Arcade.Body;

  // Explosion
  private explosion: Phaser.GameObjects.Sprite;

  // Controls
  private keyRight: Phaser.Input.Keyboard.Key; 
  private keyLeft : Phaser.Input.Keyboard.Key; 
  private keyUp   : Phaser.Input.Keyboard.Key; 
  private keyDown : Phaser.Input.Keyboard.Key; 
  private keyShoot: Phaser.Input.Keyboard.Key;

  // Stats
  private speed         : number;
  private speed_diagonal: number;
  private fire_rate     : number;
  private last_shot     : number;
  private health_points : number;
  private score         : number;


  constructor (scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, "spaceship_1-1");
    this.scene.add.existing(this);
    this.scene.physics.add.existing(this);
    
    this.init_sprite();
    this.init_body();
    this.init_controls();
    this.init_stats();
  }


  // We initialize the sprite
  private init_sprite = (): void => {
    this.anims.create(ship_iddle_1); 
    this.play("spaceship_1");

    this.explosion = this.scene.add.sprite(this.body.x, this.body.y, "explosion-1");
    this.explosion.anims.create(explosion);
    this.explosion.setVisible(false);
  }

  // We initialize the body (physics)
  private init_body = (): void => {
    this.body.setSize(10, 10);
    this.body.setOffset(16 / 2 + 4, 16 / 2 + 5)
    this.body.setCollideWorldBounds(true);
  }

   // We initialize the body (physics)
  private init_stats = (): void => {
    this.speed = 100;
    this.speed_diagonal = this.speed * (1 / Math.sqrt(2));
    this.fire_rate = 300;
    this.last_shot = 0;
    this.health_points = this.scene.registry.get("health");
    this.score = this.scene.registry.get("score");
  }

  // We initialize the controls
  private init_controls = (): void => {
    this.keyRight = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    this.keyLeft  = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    this.keyUp    = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    this.keyDown  = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    this.keyShoot = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.L);
  }


  // Player movement and combat
  public move = (): void => {
    // Diagonal Movement
    if (this.keyLeft.isDown && this.keyDown.isDown) {
      this.body.setVelocity(-this.speed_diagonal, this.speed_diagonal);
    }
    else if (this.keyLeft.isDown && this.keyUp.isDown) {
      this.body.setVelocity(-this.speed_diagonal, -this.speed_diagonal);
    }
    else if (this.keyRight.isDown && this.keyDown.isDown) {
      this.body.setVelocity(this.speed_diagonal, this.speed_diagonal);
    }
    else if (this.keyRight.isDown && this.keyUp.isDown) {
      this.body.setVelocity(this.speed_diagonal, -this.speed_diagonal);
    }
    else if (this.keyUp.isDown) {
      this.body.setVelocity(0, -this.speed);
    }
    else if (this.keyDown.isDown) {
      this.body.setVelocity(0, this.speed);
    }
    else if (this.keyLeft.isDown) {
      this.body.setVelocity(-this.speed, 0);
    }
    else if (this.keyRight.isDown) {
      this.body.setVelocity(this.speed, 0);
    }
    else {
      this.body.setVelocity(0, 0);
    }
  }
  
  public shoot = (bullets: Phaser.GameObjects.Group): void => {
    // We must control the fire rate other wise we will be able to shoot non stop
    if (this.keyShoot.isDown && this.scene.time.now > this.last_shot) {
      const bullet = new Bullet1(this.scene, this.x, this.y, 0);
      bullet.pattern_straight(-200)
      bullets.add(bullet);
      this.last_shot = this.scene.time.now + this.fire_rate;
    }
  }


  // When the enemy gets hit
  public hit = (bullet: Bullet1 | Bullet3 | Bullet5) => {
    // We take away the health points based on the bullet damage
    this.health_points = this.health_points - bullet.getDamage();
    this.scene.registry.set('health', this.health_points);
    this.scene.events.emit('update_health');

    this.explosion.setVisible(true);
    this.explosion.setPosition(bullet.body.x, bullet.body.y);
    this.explosion.play("explosion");

    if (this.health_points <= 0) {
      this.scene.scene.start("PostGameScene");
      this.scene.scene.stop("HudScene");
      this.scene.scene.stop("GameScene");
      this.explosion.once(Phaser.Animations.Events.ANIMATION_COMPLETE, () => {
        this.explosion.destroy();
        this.destroy();
      });
    }
    else {
      this.explosion.on(Phaser.Animations.Events.ANIMATION_COMPLETE, () => this.explosion.setVisible(false));
    }
  }
}