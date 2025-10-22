import { NotFoundException } from "@nestjs/common";
import { IsNull, ObjectLiteral, Repository, FindOptionsWhere } from "typeorm";

export class BaseService<T extends ObjectLiteral> {
  constructor(private repo: Repository<T>) {}

  async softDelete(id: number, deletedBy?: number) {
    const where: FindOptionsWhere<T> = { id: id as any, deletedAt: IsNull() } as any;
    const entity = await this.repo.findOne({ where });
    if (!entity) throw new NotFoundException('Not found');
    (entity as any).deletedAt = new Date();
    if ('deletedBy' in entity && deletedBy) (entity as any).deletedBy = deletedBy;
    return this.repo.save(entity);
  }

  async findAll() {
    const where: FindOptionsWhere<T> = { deletedAt: IsNull() } as any;
    return this.repo.find({ where });
  }
}
