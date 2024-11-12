import { ValidateNotFoundResponse } from './ValidateNotFoundResponse';
import { ValidateDataResponse } from './ValidateDataResponse';
import { ValidateKeyFieldsResponse } from './ValidateKeyFieldsResponse';

export interface IQuestions {
  validateDataResponse: ValidateDataResponse;
  validateNotFoundResponse: ValidateNotFoundResponse;
  validateKeyFieldsResponse: ValidateKeyFieldsResponse;

}
