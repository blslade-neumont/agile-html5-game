

export function delay(millis: number) {
    return new Promise((resolve, reject) => {
        setTimeout(() => resolve(), millis);
    });
}
