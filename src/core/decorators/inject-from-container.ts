import { container } from '../../ioc';

export function InjectFromContainer(token: any) {
  return function (target: any, propertyKey: string) {
    target[propertyKey] = container.get(token);
  };
}
