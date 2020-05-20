import { readFileSync } from 'fs';
// eslint-disable-next-line import/no-extraneous-dependencies
import { resolve } from 'path';
import { injectFromContainer } from '../decorators/inject-from-container';
import { Logger } from '../services';
import { types } from '../models/questions/type';

export class Validate {
  @injectFromContainer('Logger')
  protected logger: Logger;

  public start(message: string): boolean {
    const commitMessage = readFileSync(resolve(process.cwd(), message), { encoding: 'utf8' });

    const validTypes = types.map((type) => type.value).join('|');
    const regex = new RegExp(`^(${validTypes})(\\(\\d+\\))?:\\s.*$`, 'gm');

    return regex.exec(commitMessage) !== null;
  }
}
