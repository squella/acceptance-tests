import { expect } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';

export class ValidateKeyFieldsResponse {
  private keyFields: any;

  constructor(jsonKeyFieldsPath: string) {
    this.keyFields = JSON.parse(fs.readFileSync(path.resolve(jsonKeyFieldsPath), 'utf8'));
  }

  public async answeredBy(response: any): Promise<void> {
    const responseData = await response.json();

    if (Array.isArray(responseData)) {
      responseData.forEach((item, index) => {
        this.validateKeyFields(item);
      });
    } else {
      throw new Error("The response is not an array, a list of repositories was expected");
    }
  }

  private validateKeyFields(actualData: any): void {
    for (const key in this.keyFields) {
      expect(actualData).toHaveProperty(key);
    }
  }
}
