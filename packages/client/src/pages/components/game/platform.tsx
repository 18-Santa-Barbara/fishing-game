export class Platform {
    position: { x: number; y: number }
    image: HTMLImageElement;
    width: number;
    height: number;
    frames: number;
    velocity: { x: number; y: number; };

    constructor(x: number, y: number, image: HTMLImageElement) {
        this.position = {
            x,
            y
        }

        this.velocity = {
            x: 0,
            y: 0
        }

        this.image = image

        this.width = 224
        this.height = 40
        this.frames = 0
    }

    draw(context: any) {
        context.drawImage(this.image, Math.round(this.frames), 0, 224, 40, this.position.x, this.position.y, this.width, this.height)
    }

    update(context: any) {
        this.frames += 0.008
        if (this.frames > 0) {
            this.frames = 0;
        }
        this.draw(context)
    }
}