class CustomHeader extends Headers {
  public init(): CustomHeader {
    this.append("Accept", "application/json");
    this.append("Content-Type", "application/json");
    this.append("Pragma", "no-cache");

    return this;
  }
}

class Requester<TBody = undefined> {
  readonly url: string;
  readonly method?: string;
  readonly body?: string;
  readonly headers: CustomHeader;

  constructor(url: string, method: string, body?: TBody) {
    this.headers = new CustomHeader();
    this.url = url;
    this.method = method;
    this.body = JSON.stringify(body);
  }

  public fetch(): Promise<Response> {
    return fetch(this.url, {
      body: this.body,
      headers: this.headers.init(),
      method: this.method,
    });
  }
}

export const get = (path: string): Requester => {
  return new Requester(path, "GET");
};

export const post = <TBody>(path: string, body: TBody): Requester<TBody> => {
  return new Requester<TBody>(path, "POST", body);
};
