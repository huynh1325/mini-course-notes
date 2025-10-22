import { DataSource } from 'typeorm';
import { Note } from './src/notes/entities/note.entity';
import { User } from './src/users/entities/user.entity';
import { Course } from './src/courses/entities/course.entity';

const dataSource = new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: '',
  database: 'mini_course_notes',
  entities: [User, Course, Note],
  migrations: ['src/migrations/*.ts'],
});

export default dataSource;