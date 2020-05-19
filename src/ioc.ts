import { Container } from 'inversify';
import { Git, Logger } from './core/services';

export { container };

const container = new Container();

container.bind<Logger>('Logger').toDynamicValue(() => new Logger(false));
container.bind<Git>('Git').to(Git);
