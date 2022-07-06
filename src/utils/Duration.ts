interface iDuration {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  milliseconds: number;
  microseconds: number;
}

export class Duration {
  /** the duration of a non leap year, 365 days */
  static YEAR = new Duration({ days: 365 });
  /** the duration of a comercial month, 30 days */
  static MONTH = new Duration({ days: 30 });
  /** the duration of a day */
  static DAY = new Duration({ days: 1 });
  /** the duration of an hour */
  static HOUR = new Duration({ hours: 1 });
  /** the duration of a minute */
  static MINUTE = new Duration({ minutes: 1 });
  /** the duration of a second */
  static SECOND = new Duration({ seconds: 1 });
  /** the duration of a millisecond */
  static MILLISECOND = new Duration({ milliseconds: 1 });
  /** the duration of a microsecond */
  static MICROSECOND = new Duration({ microseconds: 1 });

  readonly days: number;
  readonly hours: number;
  readonly minutes: number;
  readonly seconds: number;
  readonly milliseconds: number;
  readonly microseconds: number;

  /** this class don't guarantee the execution will be precisely runned in a
   * specific time, it just does the calculation in an desired unit for you */
  constructor(params: Partial<iDuration>) {
    this.days = params.days ?? 0;
    this.hours = params.hours ?? 0;
    this.minutes = params.minutes ?? 0;
    this.seconds = params.seconds ?? 0;
    this.milliseconds = params.milliseconds ?? 0;
    this.microseconds = params.microseconds ?? 0;
  }

  static of(params: Partial<Duration>) {
    return new Duration(params);
  }

  get inDays(): number {
    return (
      this.days +
      this.hours / 24 +
      this.minutes / 24 / 60 +
      this.seconds / 24 / 60 / 60 +
      this.milliseconds / 24 / 60 / 60 / 1000 +
      this.microseconds / 24 / 60 / 60 / 1000 / 1000
    );
  }

  get inHours(): number {
    return (
      this.days * 24 +
      this.hours +
      this.minutes / 60 +
      this.seconds / 60 / 60 +
      this.milliseconds / 1000 / 60 / 60 +
      this.microseconds / 1000 / 60 / 60 / 1000
    );
  }

  get inMinutes(): number {
    return (
      this.days * 24 * 60 +
      this.hours * 60 +
      this.minutes +
      this.seconds / 60 +
      this.milliseconds / 1000 +
      this.microseconds / 1000 / 1000
    );
  }

  get inSeconds(): number {
    return (
      this.days * 24 * 60 * 60 +
      this.hours * 60 * 60 +
      this.minutes * 60 +
      this.seconds +
      this.milliseconds / 1000 +
      this.microseconds / 1000 / 1000
    );
  }

  get inMilliseconds(): number {
    return (
      this.days * 24 * 60 * 60 * 1000 +
      this.hours * 60 * 60 * 1000 +
      this.minutes * 60 * 1000 +
      this.seconds * 1000 +
      this.milliseconds +
      this.microseconds / 1000
    );
  }

  get inMicroseconds(): number {
    return (
      this.days * 24 * 60 * 60 * 1000 * 1000 +
      this.hours * 60 * 60 * 1000 * 1000 +
      this.minutes * 60 * 1000 * 1000 +
      this.seconds * 1000 * 1000 +
      this.milliseconds * 1000 +
      this.microseconds
    );
  }

  get reduced(): Duration {
    const _total = this.inMicroseconds;

    const microseconds = _total % 1000;
    const _restMicroseconds = (_total - microseconds) / 1000;
    const milliseconds = _restMicroseconds % 1000;
    const _restMilliseconds = (_restMicroseconds - milliseconds) / 1000;
    const seconds = _restMilliseconds % 60;
    const _restSeconds = (_restMilliseconds - seconds) / 60;
    const minutes = _restSeconds % 60;
    const _restMinutes = (_restSeconds - minutes) / 60;
    const hours = _restMinutes % 24;
    const _restHours = (_restMinutes - hours) / 24;
    const days = _restHours;

    const result = new Duration({
      days,
      hours,
      minutes,
      seconds,
      milliseconds,
      microseconds,
    });

    return result;
  }
}
