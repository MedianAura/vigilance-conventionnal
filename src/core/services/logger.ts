import { injectable } from 'inversify';

@injectable()
export class Logger {
  constructor(protected isVerbose: boolean) {}

  public setVerbose(isVerbose: boolean): void {
    this.isVerbose = isVerbose;
  }

  public log(...message: any[]): void {
    if (!this.isVerbose) return;
    console.log(...message);
  }

  public warn(...message: any[]): void {
    if (!this.isVerbose) return;
    console.warn(...message);
  }

  public error(...message: any[]): void {
    if (!this.isVerbose) return;
    console.error(...message);
  }
}
