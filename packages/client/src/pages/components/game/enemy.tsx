import enemyFallsLeft from '../../../../public/game/enemy-falls-left.png';
import enemyFalls from '../../../../public/game/enemy-falls.png';
import enemyImg from '../../../../public/game/enemy.png';

function createImg(imgSrc: string) {
  const image = new Image();
  image.src = imgSrc;
  return image;
}

export class Enemy {
  frames: number;
  image: HTMLImageElement;
  height: number;
  width: number;
  velocity: { x: number; y: number };
  position: { x: number; y: number };
  attack: { position: { x: number; y: number }; width: number; height: number };
  doAttack: boolean;
  current: any;
  sprites: any;

  constructor(x: number, y: number, image: HTMLImageElement) {
    this.position = {
      x,
      y,
    };
    this.velocity = {
      x: 0,
      y: 1,
    };
    this.width = 120;
    this.height = 100;

    this.attack = {
      position: this.position,
      width: 80,
      height: 40,
    };
    this.doAttack = false;
    this.image = image;
    this.sprites = {
      stand: {
        right: createImg(enemyImg),
        left: image,
      },
      fall: {
        right: createImg(enemyFalls),
        left: createImg(enemyFallsLeft),
      },
    };

    this.frames = 0;
    this.current = this.sprites.stand.left;
  }

  draw(context: any) {
    context.drawImage(
      this.current,
      64 * Math.round(this.frames),
      0,
      61,
      42,
      this.position.x,
      this.position.y,
      this.width,
      this.height
    );
  }

  update(context: any) {
    this.frames += 0.05;
    if (this.frames > 3) {
      this.frames = 0;
    }
    this.draw(context);
  }

  fall() {
    if (this.current === this.sprites.stand.left) {
      this.current = this.sprites.fall.left;
    } else if (this.current === this.sprites.stand.right) {
      this.current = this.sprites.fall.right;
    }
  }
}
