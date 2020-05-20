#!/usr/bin/env node

import prog from 'caporal';
import packageConfig from '../package.json';
import { container } from './ioc';
import { Logger } from './core/services';
import { Commit, Generate, Validate } from './core/controllers';

prog
  .name(packageConfig.name)
  .version(packageConfig.version)
  // Command COMMIT
  .command('commit', 'Add a commit')
  .action(async (_, options) => {
    container.get<Logger>('Logger').setVerbose(options.verbose);

    await new Commit().start();

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
  });

(async () => {
  prog.parse(process.argv);
})();

// TODO : Add Retry Mode
// TODO : Add a file stager
