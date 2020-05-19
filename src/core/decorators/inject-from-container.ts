import { container } from '../../ioc';

export function injectFromContainer(token: any) {
  return function (target: any, propertyKey: string) {
    target[propertyKey] = container.get(token);
  };
}
