interface ILogger {
    setLevel(level: number): void;
    debug(...args: any[]): void;
    info(...args: any[]): void;
    warn(...args: any[]): void;
    error(...args: any[]): void;
}

let getLogger = (function () {
    let index: number = 0;
    return function getLogger(level: string) {
        level = level.toUpperCase();
        let logger = (function (index: number) {
            return function (...args: any[]) {
                if ((<any>this).level < index) {
                    return;
                }

                console.log.apply(console, [(<any>this).getTimestamp(), `[${level}]`].concat(args));
            }
        })(index);

        index += 1;
        return logger;
    }
})();

class Log {
    level: number;

    construct() {
        this.level = 1;
    }

    setLevel(level: number) {
        this.level = level;
    }

    getTimestamp(): string {
        let ts = new Date();
        let hh = `0${ts.getHours()}`.slice(-2);
        let mm = `0${ts.getMinutes()}`.slice(-2);
        let ss = `0${ts.getSeconds()}`.slice(-2);
        let ms = `00${ts.getMilliseconds()}`.slice(-3);
        return `${hh}:${mm}:${ss}.${ms}`;
    }

    debug = getLogger("debug");
    info = getLogger("info");
    warn = getLogger("warn");
    error = getLogger("error");
}

export var log: ILogger = new Log();
