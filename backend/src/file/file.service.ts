import { Injectable } from '@nestjs/common';
import { CreateFileDto } from './dto/create-file.dto';
import { UpdateFileDto } from './dto/update-file.dto';
import { join } from 'path';
import * as fs from 'fs';

@Injectable()
export class FileService {

  async uploadFile(file: Express.Multer.File, folder = 'default'): Promise<string> {
    const uploadPath = join(process.cwd(), `public/images/${folder}`);
    if (!fs.existsSync(uploadPath)) fs.mkdirSync(uploadPath, { recursive: true });

    const filename = `${Date.now()}-${file.originalname}`;
    const fullPath = join(uploadPath, filename);
    fs.writeFileSync(fullPath, file.buffer);

    return `/images/${folder}/${filename}`;
  }

  create(createFileDto: CreateFileDto) {
    return 'This action adds a new file';
  }

  findAll() {
    return `This action returns all file`;
  }

  findOne(id: number) {
    return `This action returns a #${id} file`;
  }

  update(id: number, updateFileDto: UpdateFileDto) {
    return `This action updates a #${id} file`;
  }

  remove(id: number) {
    return `This action removes a #${id} file`;
  }
}
