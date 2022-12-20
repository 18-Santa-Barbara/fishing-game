export class Chest {
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

        this.image = image
        this.frames = 0;
    }

    draw(context: any) {
        context.drawImage(this.image, 37 * Math.round(this.frames), 0, 37, 22, this.position.x, this.position.y, this.width, this.height)
    }

    update(context: any) {
        this.frames += 0.08
        if (this.frames > 3) {
            this.frames = 3;
        }
        this.draw(context)
    }
}