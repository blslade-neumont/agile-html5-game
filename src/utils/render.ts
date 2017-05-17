

const LINE_HEIGHT = 12;

export function fillText(context: CanvasRenderingContext2D, text: string, x: number, y: number) {
    let lines = text.split('\n');
    for (let line of lines) {
        context.fillText(line, x, y);
        y += LINE_HEIGHT;
    }
}
