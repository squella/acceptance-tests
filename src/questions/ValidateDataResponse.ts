import { expect } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';

export class ValidateDataResponse {
  private expectedData: any;

  constructor(jsonResponsePath: string) {
    this.expectedData = JSON.parse(fs.readFileSync(path.resolve(jsonResponsePath), 'utf8'));
  }

  public async answeredBy(response: any): Promise<void> {
    const responseData = await response.json();
    //console.log('********** responseData ====', responseData);

    if (Array.isArray(responseData)) {
      responseData.forEach((item, index) => {
        //console.log(`índix element is ${index}`);
        this.validateObjectProperties(item, this.expectedData);
      });
    } else {
      this.validateObjectProperties(responseData, this.expectedData);
    }
  }

  private validateObjectProperties(actualData: any, expectedData: any): void {
    for (const key in expectedData) {
      if (expectedData[key] !== null) {
        expect(actualData).toHaveProperty(key, expectedData[key]);
      } else {
        expect(actualData).toHaveProperty(key);
      }
    }
  }
}
