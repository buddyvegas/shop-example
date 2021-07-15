export interface IScenarioContext {
  set<T>(name: string, value: T): void;
  get<T>(name: string): T;
}

export class ScenarioContext implements IScenarioContext {
  private context: Record<string, unknown>;

  constructor() {
    this.context = {};
  }

  set<T>(name: string, value: T): void {
    this.context[name] = value;
  }

  get<T>(name: string): T {
    return this.context[name] as T;
  }
}
