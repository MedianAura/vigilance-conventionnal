// import { spawnSync } from 'child_process'
//
// // git log --oneline $(git describe --tags --abbrev=0 @^)..@
// const test = spawnSync("git", ["describe", "--tags","--abbrev=0"]);
//
// // console.log(test.stdout.toString());
//
// const commits = spawnSync("git", ["log"]).stdout.toString();
//
// // console.log(commits);

import prog from 'caporal';
import packageConfig from '../package.json';
import { Commit } from './core/controllers/commit';

prog
  .name(packageConfig.name)
  .version(packageConfig.version)
  // Command COMMIT
  .command('commit', 'Add a commit')
  .action(async () => {
    await new Commit().start();

    process.exit(0);
  })
  // Command GENERATE
  .command('generate', 'Generate changelog')
  .action(() => {
    console.log('Test');
  });

(async () => {
  prog.parse(process.argv);
})();
