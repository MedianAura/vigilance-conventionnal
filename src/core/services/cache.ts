// eslint-disable-next-line import/no-extraneous-dependencies
import { resolve } from 'path';
import { injectable } from 'inversify';
import { readFileSync, writeFileSync, ensureDirSync, emptyDirSync } from 'fs-extra';
import cacheOrTmpDir from 'cache-or-tmp-directory';

@injectable()
export class Cache {
  private readonly cacheDirectory: string;

  constructor() {
    this.cacheDirectory = cacheOrTmpDir('conventionnal');
    ensureDirSync(this.cacheDirectory);
  }

  public getCache(): string {
    return readFileSync(this.filePath, { encoding: 'utf8' });
  }

  public setCache(content: string): void {
    writeFileSync(this.filePath, content, { encoding: 'utf8' });
  }

  public clearCache(): void {
    emptyDirSync(this.cacheDirectory);
  }

  get filePath(): string {
    return resolve(this.cacheDirectory, this.fileName);
  }

  private get fileName(): string {
    return 'commitHistory.txt';
  }
}
