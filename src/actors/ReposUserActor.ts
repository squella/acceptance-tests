import { ActorTemplate } from './ActorTemplate';
import { ActorBuilder } from './ActorBuilder';
import { FetchDataFromApi } from '@tasks/FetchDataFromApi';
import { ValidateKeyFieldsResponse } from '@questions/ValidateKeyFieldsResponse';
import { ValidateNotFoundResponse } from '@src/questions/ValidateNotFoundResponse';

export class ReposUserActor extends ActorTemplate {
  private endpoint: string;
  private jsonKeyFieldsPath: string;

  constructor(username: string, endpoint: string, jsonKeyFieldsPath: string, token?: string) {
    super(username, token);
    this.endpoint = endpoint;
    this.jsonKeyFieldsPath = jsonKeyFieldsPath;
  }

  protected addSpecificTasks(builder: ActorBuilder): void {
    const fetchDataTask = new FetchDataFromApi(this.endpoint);
    builder.addTask(fetchDataTask);
  }


  protected addSpecificQuestions(builder: ActorBuilder): void {
    if (this.jsonKeyFieldsPath!) {
        const validateNotFoundResponse = new ValidateNotFoundResponse();
        builder.addQuestion(validateNotFoundResponse);
    } 
    const validateKeyFieldsResponse = new ValidateKeyFieldsResponse(this.jsonKeyFieldsPath);
    builder.addQuestion(validateKeyFieldsResponse);
        
  }
}
