import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { NotesService } from './notes.service';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { ResponseMessage } from 'src/decorator/customize';

@Controller('notes')
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @Post()
  @ResponseMessage("Thêm ghi chú thành công")
  create(@Body() createNoteDto: CreateNoteDto) {
    return this.notesService.create(createNoteDto);
  }

  @Get('course/:id')
  async getNotesByCourse(@Param('id', ParseIntPipe) id: number) {
    return this.notesService.findByCourse(id);
  }

  @Get()
  findAll() {
    return this.notesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.notesService.findOne(+id);
  }

  @Patch(':id')
  @ResponseMessage("Cập nhật ghi chú thành công")
  update(@Param('id') id: string, @Body() updateNoteDto: UpdateNoteDto) {
    return this.notesService.update(+id, updateNoteDto);
  }

  @Delete(':id')
  @ResponseMessage("Xóa ghi chú thành công")
  remove(@Param('id') id: string) {
    return this.notesService.remove(+id);
  }
}
