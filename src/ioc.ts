import { Container } from 'inversify';
import { Git, Logger } from './core/services';
import { ChangelogGenerator } from './core/services/changelog-generator';
import { VersionGenerator } from './core/services/version-generator';

export { container };

const container = new Container();

container.bind<Logger>('Logger').toDynamicValue(() => new Logger(false));
container.bind<Git>('Git').to(Git);
container.bind<ChangelogGenerator>('ChangelogGenerator').to(ChangelogGenerator);
container.bind<VersionGenerator>('VersionGenerator').to(VersionGenerator);
