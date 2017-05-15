

export class Game {
    constructor(private framesPerSecond = 30) { }

    private canvas: HTMLCanvasElement;
    private context: CanvasRenderingContext2D;
    private previousTick: Date = null;

    start() {
        this.canvas = <HTMLCanvasElement>document.getElementById('gameCanvas');
        this.context = this.canvas.getContext("2d");
        setInterval(() => this.onTick(), 1000 / this.framesPerSecond);
    }
    
    private onTick() {
        let currentTime = new Date();
        let delta = (this.previousTick == null) ? 0 : (currentTime.valueOf() - this.previousTick.valueOf()) / 1000;
        this.previousTick = currentTime;
        this.tick(delta);
    }
    private tick(delta: number) {

    }
}
