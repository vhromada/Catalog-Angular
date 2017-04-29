export class Time {

    private static hourSeconds = 3600;
    private static minuteSeconds = 60;

    hours: number;
    minutes: number;
    seconds: number;

    constructor(hours: number, minutes: number, seconds: number) {
        this.hours = hours;
        this.minutes = minutes;
        this.seconds = seconds;
    }

    static of(length: number): Time {
        const temp = length % Time.hourSeconds;
        const hours = Math.trunc(length / Time.hourSeconds);
        const minutes = Math.trunc(temp / Time.minuteSeconds);
        const seconds = temp % Time.minuteSeconds;

        return new Time(hours, minutes, seconds);
    }

    getLength(): number {
        return this.hours * Time.hourSeconds + this.minutes * Time.minuteSeconds + this.seconds;
    }

}
