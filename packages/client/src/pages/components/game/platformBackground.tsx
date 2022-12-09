export class PlatformBackground {
    position: { x: number; y: number }
    image: HTMLImageElement;
    width: number;
    height: number;
    
    constructor(x: number, y: number, image: HTMLImageElement) {
        this.position = {
            x,
            y
        }

        this.image = image

        this.width = image.width
        this.height = image.height
    }

    draw(context: any) {
        context.drawImage(this.image, this.position.x, this.position.y)
    }
}