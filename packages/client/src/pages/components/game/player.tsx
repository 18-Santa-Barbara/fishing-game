import warrior from '../../../../public/game/warrior.png';
import warriorLeft from '../../../../public/game/warrior-left.png';

import warriorRun from '../../../../public/game/warrior-run.png';
import warriorRunLeft from '../../../../public/game/warrior-run-left.png';

import warriorFight from '../../../../public/game/warrior-fight.png';
import warriorFightLeft from '../../../../public/game/warrior-fight-left.png';

function createImg(imgSrc: string) {
  const image = new Image();
  image.src = imgSrc;
  return image;
}

export class MainPlayer {
  frames: number;
  image: HTMLImageElement;
  height: number;
  width: number;
  velocity: { x: number; y: number };
  position: { x: number; y: number };
  sprites: {
    stand: { right: HTMLImageElement; left: HTMLImageElement };
    run: { right: HTMLImageElement; left: HTMLImageElement };
    fight: { right: HTMLImageElement; left: HTMLImageElement };
  };
  current: HTMLImageElement;
  attack: { position: { x: number; y: number }; width: number; height: number };
  doAttack: boolean;
  memoryCurrent: HTMLImageElement;

  constructor() {
    this.position = {
      x: 100,
      y: 400,
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

    this.image = createImg(warrior);
    this.frames = 0;
    this.sprites = {
      stand: {
        right: createImg(warrior),
        left: createImg(warriorLeft),
      },
      run: {
        right: createImg(warriorRun),
        left: createImg(warriorRunLeft),
      },
      fight: {
        right: createImg(warriorFight),
        left: createImg(warriorFightLeft),
      },
    };

    this.current = this.sprites.stand.right;
    this.memoryCurrent = this.sprites.stand.right;
  }

  draw(context: any) {
    if (!this.doAttack) {
      context.drawImage(
        this.current,
        69 * Math.round(this.frames),
        0,
        69,
        35,
        this.position.x,
        this.position.y,
        this.width,
        this.height
      );
    } else {
      if (this.current == this.sprites.fight.right) {
        context.drawImage(
          this.current,
          69 * Math.round(this.frames),
          0,
          69,
          45,
          this.position.x,
          this.position.y,
          this.width + 40,
          this.height
        );
      } else {
        context.drawImage(
          this.current,
          138 * Math.round(this.frames),
          0,
          69,
          45,
          this.position.x,
          this.position.y,
          this.width + 20,
          this.height
        );
      }
    }
  }

  startAttack(dir: number) {
    if (dir > 0) {
      this.current = this.sprites.fight.right;
    } else {
      this.current = this.sprites.fight.left;
    }
  }

  update(context: any, canvasRef: any, gravity: number) {
    if (!this.doAttack) {
      this.frames += 0.05;
      if (this.frames > 3) {
        this.frames = 0;
      }
      this.draw(context);
      this.position.y += this.velocity.y;

      if (this.position.y + this.height + this.velocity.y <= canvasRef.height) {
        this.velocity.y += gravity;
      }
    } else {
      this.frames += 0.06;
      if (this.frames > 2) {
        this.frames = 0;
      }
      this.draw(context);
      this.position.y += this.velocity.y;

      if (this.position.y + this.height + this.velocity.y <= canvasRef.height) {
        this.velocity.y += gravity;
      }
    }
  }

  move(dir: number, keys: { right: any; left: any }) {
    if (dir > 0) {
      this.current = this.sprites.stand.right;
      this.current = this.sprites.run.right;
      keys.right = true;
    } else {
      this.current = this.sprites.stand.left;
      this.current = this.sprites.run.left;
      keys.left = true;
    }
  }

  stop(dir: number, keys: { right: any; left: any }) {
    if (dir > 0) {
      keys.right = false;
      this.current = this.sprites.stand.right;
    } else {
      keys.left = false;
      this.current = this.sprites.stand.left;
    }
  }

  jump() {
    this.velocity.y -= 10;
  }
}
