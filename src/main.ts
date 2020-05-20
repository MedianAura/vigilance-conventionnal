#!/usr/bin/env node

import prog from 'caporal';
import packageConfig from '../package.json';
import { container } from './ioc';
import { Logger } from './core/services';
import { Commit, Generate, Staging, Validate } from './core/controllers';

prog
  .name(packageConfig.name)
  .version(packageConfig.version)
  // Command COMMIT
  .command('commit', 'Add a commit')
  .option('--retry', 'Retry last commit.', prog.BOOL, false)
  .action(async (_, options) => {
    container.get<Logger>('Logger').setVerbose(options.verbose);

    await new Commit().start(options);

    process.exit(0);
  })
  // Command GENERATE
  .command('generate', 'Generate changelog')
  .argument('[version]', 'Increment to <major|minor|patch|hotfix>', /^(major|minor|patch|hotfix)$/, 'hotfix')
  .argument('[branch]', 'Branche for changelog link', prog.STRING, 'master')
  .option('--preview', 'Preview changelog')
  .option('--write', 'Write changelog')
  .action(async (args, options) => {
    container.get<Logger>('Logger').setVerbose(options.verbose);

    await new Generate().start(args, options);

    process.exit(0);
  })
  // Command Validate
  .command('validate', 'Validate COMMIT_MSG')
  .argument('<message>', 'Commit message', prog.STRING)
  .action((args, options) => {
    container.get<Logger>('Logger').setVerbose(options.verbose);

    const result = new Validate().start(args.message);

    const code = result ? 0 : 1;
    process.exit(code);
  })
  // Command Staging
  .command('staging', 'Staging mode.')
  .action(async (args, options) => {
    container.get<Logger>('Logger').setVerbose(options.verbose);

    await new Staging().start();

    process.exit(0);
  });

(async () => {
  prog.parse(process.argv);
})();

// TODO : Revoir le system de cache pour toujours etre en mode RETRY, mais dans le CLI avoir une questions pour utilisé la cache.
// TODO : Retirer le mode WRITE de generate. Empecher write quand on active preview.
// TODO : Generate permettre de ne pas auto-commit
// TODO : Add Logger
