import { APIRequestContext, APIResponse } from '@playwright/test';

export class MakeApiRequests {
  private requestContext: APIRequestContext;

  constructor(requestContext: APIRequestContext) {
    this.requestContext = requestContext;
  }

  public async get(endpoint: string, options?: any): Promise<APIResponse> {
    return this.requestContext.get(endpoint, options);
  }

  public async post(endpoint: string, data?: any, options?: any): Promise<APIResponse> {
    return this.requestContext.post(endpoint, {
      data,
      ...options,
    });
  }

  public async patch(endpoint: string, data?: any, options?: any): Promise<APIResponse> {
    return this.requestContext.patch(endpoint, {
      data,
      ...options,
    });
  }

  public async delete(endpoint: string, options?: any): Promise<APIResponse> {
    return this.requestContext.delete(endpoint, options);
  }
}
