export const IAppService = Symbol('IAppService');

export interface IAppService {
  getHello(): string;
}

export class AppService implements IAppService {
  public getHello(): string {
    return 'Hello World!';
  }
}
