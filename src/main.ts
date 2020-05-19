#!/usr/bin/env node

import prog from 'caporal';
import packageConfig from '../package.json';
import { Commit } from './core/controllers/commit';
import { Logger } from './core/services';
import { container } from './ioc';

prog
  .name(packageConfig.name)
  .version(packageConfig.version)
  // Command COMMIT
  .command('commit', 'Add a commit')
  .option('--verbose', 'Show more message')
  .action(async (_, options) => {
    container.get<Logger>('Logger').setVerbose(options.verbose);

    await new Commit().start();

    process.exit(0);
  })
  // Command GENERATE
  .command('generate', 'Generate changelog')
  .option('--verbose', 'Show more message')
  .action((_, options) => {
    container.get<Logger>('Logger').setVerbose(options.verbose);

    console.log('GENERATE');
  })
  // Command Validate
  .command('validate', 'Validate COMMIT_MSG')
  .option('--verbose', 'Show more message')
  .action((_, options) => {
    container.get<Logger>('Logger').setVerbose(options.verbose);

    console.log('VALIDATE');
  });

(async () => {
  prog.parse(process.argv);
})();

// TODO : Add GENERATE Mode
// TODO : Add VALIDATE Mode
// TODO : Add Retry Mode
// TODO : Add a file stager
