import { Container } from 'inversify';
import { Git, Logger, ChangelogGenerator, Cache, VersionGenerator } from './core/services';

export { container };

const container = new Container();

container.bind<Logger>('Logger').toDynamicValue(() => new Logger(false));
container.bind<Cache>('Cache').toDynamicValue(() => new Cache());
container.bind<Git>('Git').to(Git);
container.bind<ChangelogGenerator>('ChangelogGenerator').to(ChangelogGenerator);
container.bind<VersionGenerator>('VersionGenerator').to(VersionGenerator);
