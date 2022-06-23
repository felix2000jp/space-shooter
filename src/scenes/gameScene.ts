import Background from "../objects/background";
import Player from "../objects/player";
import Enemy1 from "../objects/enemies/enemy_1";
import Enemy2 from "../objects/enemies/enemy_2";
import Enemy3 from "../objects/enemies/enemy_3";
import Enemy4 from "../objects/enemies/enemy_4";
import Enemy5 from "../objects/enemies/enemy_5";
import Enemy6 from "../objects/enemies/enemy_6";
import Enemy7 from "../objects/enemies/enemy_7";

export default class GameScene extends Phaser.Scene {

  private background: Background;

  private player        : Player;
  private player_bullets: Phaser.GameObjects.Group;

  private enemies      : Phaser.GameObjects.Group;
  private enemy_bullets: Phaser.GameObjects.Group;

  // Spawn parameters
  private start_enemy_1         : number;
  private spawn_enemy_1_interval: number;
  private start_enemy_2         : number;
  private spawn_enemy_2_interval: number;
  private start_enemy_3         : number;
  private spawn_enemy_3_interval: number;
  private start_enemy_4         : number;
  private spawn_enemy_4_interval: number;
  private start_enemy_5         : number;
  private spawn_enemy_5_interval: number;
  private start_enemy_6         : number;
  private spawn_enemy_6_interval: number;
  private start_enemy_7         : number;
  private spawn_enemy_7_interval: number;
  private spawn_locations       : number[];

  private start_game_flag: boolean
  private start_game_time: number;   

  constructor () {
    super("GameScene");
  }
  
  public create = (): void => {
    this.background = new Background(this, 500, 400, 1000, 800);

        this.start_enemy_1          = 0;     
    this.spawn_enemy_1_interval = 2_000;

    this.start_enemy_2          = 5_000;
    this.spawn_enemy_2_interval = 3_000;

    this.start_enemy_3          = 5_000;
    this.spawn_enemy_3_interval = 5_000;

    this.start_enemy_4          = 10_000;
    this.spawn_enemy_4_interval = 6_000;

    this.start_enemy_5          = 10_000;
    this.spawn_enemy_5_interval = 7_000;

    this.start_enemy_6          = 15_000;
    this.spawn_enemy_6_interval = 7_000;

    this.start_enemy_7          = 15_000;
    this.spawn_enemy_7_interval = 8_000;
    
    this.spawn_locations = [50, 100, 150, 200, 250, 300, 350];

    this.player         = new Player(this, 250, 200);
    this.player_bullets = this.add.group({ runChildUpdate: true });

    this.enemies       = this.add.group({ runChildUpdate: true });
    this.enemy_bullets = this.add.group({ runChildUpdate: true });
    
    this.start_game_flag = false;
    this.start_game_time = 0;
  }

  public update = (): void => {
    if (!this.start_game_flag) {
      this.start_game_flag = true;
      this.start_game_time = this.time.now;
    }

    // We add the background effect
    this.background.update();

    // We spawn the enemies
    this.spawn_enemy_1();
    this.spawn_enemy_2();
    this.spawn_enemy_3();
    this.spawn_enemy_4();
    this.spawn_enemy_5();
    this.spawn_enemy_6();
    this.spawn_enemy_7();
    
    // Collisions
    this.physics.overlap(this.player_bullets, this.enemies, this.bullet_hits_enemy);    
    this.physics.overlap(this.enemy_bullets, this.player, this.bullet_hits_player);    
    
    // We destroy out of bounds bullets
    this.player_bullets.children.each((bullet: any) => bullet.out_of_bounds());
    this.enemy_bullets.children.each((bullet: any) => bullet.out_of_bounds());
    
    // We destroy out of bounds enemies
    this.enemies.children.each((enemy: any) => enemy.out_of_bounds());
    
    // Enemy Movement and Combat
    this.enemies.children.each((enemy: any) => enemy.move());
    this.enemies.children.each((enemy: any) => enemy.shoot(this.enemy_bullets));
    
    // Player movement and combat
    this.player.move();
    this.player.shoot(this.player_bullets);
  }


  // Collisions
  private bullet_hits_enemy = (bullet: any, enemy: any) => {
    enemy.hit(bullet);
    bullet.destroy();
  }

  private bullet_hits_player = (bullet: any) => {
    this.player.hit(bullet);
    bullet.destroy(); // We destroy the bullet
  }

  // Enemy Spawns
  private spawn_enemy_1 = () => {
    if (this.time.now - this.start_game_time > this.start_enemy_1) {
      const location = this.spawn_locations[Math.floor(Math.random() * this.spawn_locations.length)];
      this.enemies.add(new Enemy1(this, location, 0));
      this.start_enemy_1 = this.time.now - this.start_game_time + this.spawn_enemy_1_interval;
    }
  }

  private spawn_enemy_2 = () => {
    if (this.time.now - this.start_game_time > this.start_enemy_2) {
      const location = this.spawn_locations[Math.floor(Math.random() * this.spawn_locations.length)];
      this.enemies.add(new Enemy2(this, location, 0));
      this.start_enemy_2 = this.time.now - this.start_game_time + this.spawn_enemy_2_interval;
    }
  }

  private spawn_enemy_3 = () => {
    if (this.time.now - this.start_game_time > this.start_enemy_3) {
      const location = this.spawn_locations[Math.floor(Math.random() * this.spawn_locations.length)];
      this.enemies.add(new Enemy3(this, location, 0));
      this.start_enemy_3 = this.time.now - this.start_game_time + this.spawn_enemy_3_interval;
    }
  }

  private spawn_enemy_4 = () => {
    if (this.time.now - this.start_game_time > this.start_enemy_4) {
      const location = this.spawn_locations[Math.floor(Math.random() * this.spawn_locations.length)];
      this.enemies.add(new Enemy4(this, location, 0));
      this.start_enemy_4 = this.time.now - this.start_game_time + this.spawn_enemy_4_interval;
    }
  }

  private spawn_enemy_5 = () => {
    if (this.time.now - this.start_game_time > this.start_enemy_5) {
      const location = this.spawn_locations[Math.floor(Math.random() * this.spawn_locations.length)];
      this.enemies.add(new Enemy5(this, location, 0));
      this.start_enemy_5 = this.time.now - this.start_game_time  + this.spawn_enemy_5_interval;
    }
  }

  private spawn_enemy_6 = () => {
    if (this.time.now - this.start_game_time > this.start_enemy_6) {
      const location = this.spawn_locations[Math.floor(Math.random() * this.spawn_locations.length)];
      this.enemies.add(new Enemy6(this, location, 0));
      this.start_enemy_6 = this.time.now - this.start_game_time + this.spawn_enemy_6_interval;
    }
  }

  private spawn_enemy_7 = () => {
    if (this.time.now - this.start_game_time > this.start_enemy_7) {
      const location = this.spawn_locations[Math.floor(Math.random() * this.spawn_locations.length)];
      this.enemies.add(new Enemy7(this, location, 0));
      this.start_enemy_7 = this.time.now - this.start_game_time + this.spawn_enemy_7_interval;
    }
  }
}
