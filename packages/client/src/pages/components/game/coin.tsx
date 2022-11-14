import coin from '../../../assets/game/coin.png'

function createImg(imgSrc: string) {    
    const image = new Image()
    image.src = imgSrc;
    return image;
}

export class Coin {
    frames: number;
    image: HTMLImageElement;
    height: number;
    width: number;
    velocity: { x: number; y: number; };
    position: { x: number; y: number; };

    constructor(x: number, y: number, image: HTMLImageElement) {
        this.position = {
            x,
            y
        }

        this.velocity = {
            x: 0,
            y: 0
        }

        this.width = 30
        this.height = 40

        this.image = createImg(coin)
        this.frames = 0;
    }

    draw(context: any) {
        context.drawImage(this.image, 16 * Math.round(this.frames), 0, 16, 16, this.position.x, this.position.y, this.width, this.height)
    }

    update(context: any) {
        this.frames += 0.008
        if (this.frames > 3) {
            this.frames = 0;
        }
        this.draw(context)
    }
}