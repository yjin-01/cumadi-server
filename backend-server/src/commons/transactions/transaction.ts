import { Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';

@Injectable()
export abstract class TransactionalService {
  constructor(
    protected readonly entityManager: EntityManager, //
  ) {}
  protected async transactional<T>(
    callback: (entityManaer: EntityManager) => Promise<T>,
  ): Promise<T> {
    return this.entityManager.transaction(async (entityManager) => {
      return callback(entityManager);
    });
  }
}
