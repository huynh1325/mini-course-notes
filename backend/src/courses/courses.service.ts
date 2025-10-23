import { Injectable } from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import aqp from 'api-query-params';
import { InjectRepository } from '@nestjs/typeorm';
import { Course } from './entities/course.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CoursesService {
  constructor(
    @InjectRepository(Course)
    private readonly courseRepository: Repository<Course>,
  ) {}

  create(createCourseDto: CreateCourseDto) {
    return 'This action adds a new course';
  }

  async findAll(currentPage: number, limit: number, qs: string) {
    const { filter, sort } = aqp(qs);
    delete filter.current;
    delete filter.pageSize;

    const offset = (currentPage - 1) * limit;
    const defaultLimit = limit || 10;

    const totalItems = await this.courseRepository.count({ where: filter });
    const totalPages = Math.ceil(totalItems / defaultLimit);

    const query = this.courseRepository
      .createQueryBuilder('course')
      .where(filter)
      .skip(offset)
      .take(defaultLimit);

    if (sort) {
      for (const [key, value] of Object.entries(sort)) {
        query.addOrderBy(`course.${key}`, value === 1 ? 'ASC' : 'DESC');
      }
    }

    const result = await query.getMany();

    return {
      meta: {
        current: currentPage,
        pageSize: limit,
        pages: totalPages,
        total: totalItems,
      },
      result,
    };
  }

  findOne(id: number) {
    return `This action returns a #${id} course`;
  }

  update(id: number, updateCourseDto: UpdateCourseDto) {
    return `This action updates a #${id} course`;
  }

  remove(id: number) {
    return `This action removes a #${id} course`;
  }
}
