import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Note } from './entities/note.entity';
import { User } from 'src/users/entities/user.entity';
import { Course } from 'src/courses/entities/course.entity';
import { FileService } from '../file/file.service';

@Injectable()
export class NotesService {
  constructor(
    @InjectRepository(Note)
    private readonly noteRepository: Repository<Note>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @InjectRepository(Course)
    private readonly courseRepository: Repository<Course>,

    private readonly fileService: FileService,
  ) {}

    async create(createNoteDto: CreateNoteDto) {
        const { title, content, imageUrl, userId, courseId } = createNoteDto;

        const user = await this.userRepository.findOneBy({ id: userId });
        const course = await this.courseRepository.findOneBy({ id: courseId });
        
        if (!user) {
          throw new Error(`Không tìm thấy user với id ${userId}`);
        }

        if (!course) {
          throw new Error(`Không tìm thấy course với id ${courseId}`);
        }
        const note = this.noteRepository.create({
            title, content, imageUrl, user, course
        });
        return await this.noteRepository.save(note);
    }

    async findByCourse(courseId: number) {
        const course = await this.courseRepository.findOneBy({ id: courseId });
        if (!course) {
          throw new NotFoundException(`Course với id ${courseId} không tồn tại`);
        }

        const notes = await this.noteRepository.find({
          where: { course: { id: courseId } },
          // relations: ['user', 'course'],
          order: { createdAt: 'DESC' },
        });

        return notes;
      }

  findAll() {
    return `This action returns all notes`;
  }

  findOne(id: number) {
    return `This action returns a #${id} note`;
  }

  async update(id: number, updateNoteDto: UpdateNoteDto) {
    const note = await this.noteRepository.findOne({
      where: { id },
      relations: ['user', 'course'],
    });
    if (!note) {
      throw new NotFoundException(`Note với id ${id} không tồn tại`);
    }

    const { title, content, imageUrl, userId, courseId, updatedBy } = updateNoteDto;

    if (userId) {
      const user = await this.userRepository.findOneBy({ id: userId });
      if (!user) throw new NotFoundException(`User id ${userId} không tồn tại`);
      note.user = user;
    }

    if (courseId) {
      const course = await this.courseRepository.findOneBy({ id: courseId });
      if (!course) throw new NotFoundException(`Course id ${courseId} không tồn tại`);
      note.course = course;
    }

    if (title !== undefined) note.title = title;
    if (content !== undefined) note.content = content;
    if (imageUrl !== undefined) note.imageUrl = imageUrl;
    if (updatedBy !== undefined) note.updatedBy = updatedBy;

    return this.noteRepository.save(note);
  }

  async remove(id: number) {
    const note = await this.noteRepository.findOneBy({ id });
    if (!note) {
      throw new NotFoundException(`Note với id ${id} không tồn tại`);
    }

    return this.noteRepository.softRemove(note);
  }
}
