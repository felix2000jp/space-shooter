// We will load every asset here before running the game

export default class LoadScene extends Phaser.Scene {

  constructor () {
    super("LoadScene");
  }

  public preload = (): void => {
    // We load the player ship
    this.load.image("spaceship_1-1", "Spaceships/Spaceship 1/spaceship1-1.png");
    this.load.image("spaceship_1-2", "Spaceships/Spaceship 1/spaceship1-2.png");

    // We load the player Heart
    this.load.image("heart", "Extras/heart.png");

    // We load the enemies
    this.load.image("spaceship_2-1", "Spaceships/Spaceship 2/spaceship2-1.png");
    this.load.image("spaceship_2-2", "Spaceships/Spaceship 2/spaceship2-2.png");

    this.load.image("spaceship_3-1", "Spaceships/Spaceship 3/spaceship3-1.png");
    this.load.image("spaceship_3-2", "Spaceships/Spaceship 3/spaceship3-2.png");
    
    this.load.image("spaceship_4", "Spaceships/Spaceship 4/spaceship4.png");
    
    this.load.image("spaceship_5-1", "Spaceships/Spaceship 5/spaceship5-1.png");
    this.load.image("spaceship_5-2", "Spaceships/Spaceship 5/spaceship5-2.png");

    this.load.image("spaceship_6-2", "Spaceships/Spaceship 6/spaceship6-1.png");
    this.load.image("spaceship_6-1", "Spaceships/Spaceship 6/spaceship6-2.png");

    this.load.image("spaceship_7", "Spaceships/Spaceship 7/spaceship7.png");

    this.load.image("spaceship_8-1", "Spaceships/Spaceship 8/spaceship8-1.png");
    this.load.image("spaceship_8-2", "Spaceships/Spaceship 8/spaceship8-2.png");

    // We load the bullets
    this.load.image("bullet_1", "Projectiles/projectile1.png");
    this.load.image("bullet_2", "Projectiles/projectile2.png");
    this.load.image("bullet_3", "Projectiles/projectile3.png");
    this.load.image("bullet_4", "Projectiles/projectile4.png");
    this.load.image("bullet_5", "Projectiles/projectile5.png");
    this.load.image("bullet_6", "Projectiles/projectile6.png");

    // We load the blast effect
    this.load.image("explosion-1", "Explosion/explosion1.png");
    this.load.image("explosion-2", "Explosion/explosion2.png");
    this.load.image("explosion-3", "Explosion/explosion3.png");
    this.load.image("explosion-4", "Explosion/explosion4.png");
    this.load.image("explosion-5", "Explosion/explosion5.png");
    this.load.image("explosion-6", "Explosion/explosion6.png");
    this.load.image("explosion-7", "Explosion/explosion7.png");

    // We load the background
    this.load.image("background", "background/background_1.png");
  }

  public create = (): void => {
    // When we load everything we start the game scene
    this.scene.start("MainMenuScene");
    this.scene.stop();
  }
}
