import { injectable } from 'inversify';

@injectable()
export class VersionGenerator {
  private version: string;
  private prefix: string;
  private suffix: string;
  private major: number;
  private minor: number;
  private patch: number;
  private hotfix: number;

  public generate(version: string, args: any): string {
    // Si version est null decribe n'a pas sortit de Tag donc first release.
    if (version === null) return '1.0.0.0';

    const match = /((?:\d+.){3}\d+)/g.exec(version);
    if (match === null) throw new Error(`Last tag isn't supported ${version}`);

    this.version = match[0];

    this.setSuffixAndPrefix(version);
    this.setNumberDigit();
    const nextVersion = this.incrementVersion(args);

    return nextVersion;
  }

  private setSuffixAndPrefix(version): void {
    const complete = version.split(this.version);
    this.prefix = complete.shift();
    this.suffix = complete.shift();
  }

  private setNumberDigit(): void {
    const complete = this.version.split('.');
    this.major = Number.parseInt(complete.shift(), 10);
    this.minor = Number.parseInt(complete.shift(), 10);
    this.patch = Number.parseInt(complete.shift(), 10);
    this.hotfix = Number.parseInt(complete.shift(), 10);
  }

  private incrementVersion(args: any): string {
    switch (args.version) {
      case 'major':
        this.major++;
        this.minor = 0;
        this.patch = 0;
        this.hotfix = 0;
        break;
      case 'minor':
        this.minor++;
        this.patch = 0;
        this.hotfix = 0;
        break;
      case 'patch':
        this.patch++;
        this.hotfix = 0;
        break;
      case 'hotfix':
        this.hotfix++;
        break;
      default:
        break;
    }

    return [this.minor, this.minor, this.patch, this.hotfix].join('.');
  }
}
