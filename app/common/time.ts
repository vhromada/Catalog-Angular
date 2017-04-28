export class Time {

    private static HOUR_SECONDS = 3600;
    private static MINUTE_SECONDS = 60;

    hours: number;
    minutes: number;
    seconds: number;

    constructor(hours: number, minutes: number, seconds: number) {
        this.hours = hours;
        this.minutes = minutes;
        this.seconds = seconds;
    }

    static of(length: number): Time {
        const temp = length % Time.HOUR_SECONDS;
        const hours = Math.trunc(length / Time.HOUR_SECONDS);
        const minutes = Math.trunc(temp / Time.MINUTE_SECONDS);
        const seconds = temp % Time.MINUTE_SECONDS;

        return new Time(hours, minutes, seconds);
    }

    getLength(): number {
        return this.hours * Time.HOUR_SECONDS + this.minutes * Time.MINUTE_SECONDS + this.seconds;
    }

}
