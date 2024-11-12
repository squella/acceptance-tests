import { IAbilities } from '@src/abilities/IAbilities';
import { Actor } from './Actor';
import { IQuestions } from '@src/questions/IQuestions';
import { ITasks } from '@src/tasks/ITasks';

export class ActorBuilder {
  private actor: Actor;

  constructor(username: string, token?: string) {
    this.actor = new Actor(username, token);
  }

  public addAbility<K extends keyof IAbilities>(ability: IAbilities[K]): this {
    this.actor.addAbility(ability);
    return this;
  }

  public addTask<K extends keyof ITasks>(task: ITasks[K]): this {
    this.actor.addTask(task);
    return this;
  }

  public addQuestion<K extends keyof IQuestions>(question: IQuestions[K]): this {
    this.actor.addQuestion(question);
    return this;
  }

  public build(): Actor {
    return this.actor;
  }
}
