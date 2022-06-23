export default class Background extends Phaser.GameObjects.TileSprite {

  private iter: number;
  private speed: number;

  constructor (scene: Phaser.Scene, x: number, y: number, width: number, height: number) {
    super(scene, x, y, width, height, "background");
    this.scene.add.existing(this);
    
    this.iter  = 0;
    this.speed = 0.003;
  }

  public update = () => {
    // Make the background move
    this.setTilePosition(Math.fround(this.iter) * 100, -Math.fround(this.iter) * 100);
    this.iter += this.speed;
  }
}