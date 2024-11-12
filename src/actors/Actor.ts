import { IAbilities } from '@abilities/IAbilities';
import { ITasks } from '@tasks/ITasks';
import { IQuestions } from '@questions/IQuestions';

export class Actor {
  private username: string;
  private token?: string;
  private abilities: IAbilities = {} as IAbilities;
  private tasks: ITasks = {} as ITasks;
  private questions: IQuestions = {} as IQuestions;

  constructor(username: string, token?: string) {
    this.username = username;
    this.token = token;
  }

  public getUsername(){
    return this.username;
  }

  public addAbility<K extends keyof IAbilities>(ability: IAbilities[K]): this {
    const key = (ability as any).constructor.name.charAt(0).toLowerCase() + (ability as any).constructor.name.slice(1) as K;
    this.abilities[key] = ability;
    return this;
  }

  public addTask<K extends keyof ITasks>(task: ITasks[K]): this {
    const key = task.constructor.name.charAt(0).toLowerCase() + task.constructor.name.slice(1) as K;
    this.tasks[key] = task;
    return this;
  }

  public addQuestion<K extends keyof IQuestions>(question: IQuestions[K]): this {
    const key = question.constructor.name.charAt(0).toLowerCase() + question.constructor.name.slice(1) as K;
    this.questions[key] = question;
    return this;
  }

  public get abilitiesAccess(): IAbilities {
    return this.abilities;
  }

  public get tasksAccess(): ITasks {
    return this.tasks;
  }

  public get questionsAccess(): IQuestions {
    return this.questions;
  }
}
