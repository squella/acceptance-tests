import { expect } from '@playwright/test';

export class ValidateNotFoundResponse {
  public async answeredBy(response: any): Promise<void> {
    expect(response.status()).toBe(404);
  }
}
