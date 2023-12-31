import { NotFound } from "http-errors";

import { getDataSource } from "./config/database";

import { DatabaseRepository, Id, Query } from "./declarations";
import { Auto } from "./entity/auto";

export class AutoRepository implements DatabaseRepository<Auto> {
  async create(data: Partial<Auto>, query?: Query): Promise<Auto> {
    const repository = (await getDataSource()).getRepository(Auto);

    const auto = repository.create(data);

    await repository.save(auto);

    return auto;
  }

  async get(id: Id, query?: Query): Promise<Auto> {
    const repository = (await getDataSource()).getRepository(Auto);

    const auto = await repository.findOneBy({ id: id as any });
    
    if (!auto) {
      throw new NotFound("Not exist");
    }

    return auto;
  }

  async update(id: Id, data: Auto, query?: Query): Promise<Auto> {
    const repository = (await getDataSource()).getRepository(Auto);

    await repository.update(id, data);

    return this.get(id, query);
  }
}
