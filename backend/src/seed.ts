import * as bcrypt from 'bcrypt';
import dataSource from '../typeorm.config';
import { User } from './users/entities/user.entity';
import { Course } from './courses/entities/course.entity';
import { Note } from './notes/entities/note.entity';

async function seed() {
  try {
    await dataSource.initialize();
    console.log('Database connected!');

    // ------------------ Users ------------------
    const userRepo = dataSource.getRepository(User);

    const usersData = [
      { username: 'alice', password: '123456' },
      { username: 'bob', password: '123456' },
    ];

    const users: User[] = [];
    for (const u of usersData) {
      const user = new User();
      user.username = u.username;
      user.password = await bcrypt.hash(u.password, 10);
      users.push(user);
    }
    await userRepo.save(users);
    console.log('Users seeded');

    // ------------------ Courses ------------------
    const courseRepo = dataSource.getRepository(Course);
    const coursesData = [
      { name: 'React Basics', description: 'Learn React from scratch' },
      { name: 'NestJS Advanced', description: 'Advanced NestJS concepts' },
    ];

    const courses = courseRepo.create(coursesData);
    await courseRepo.save(courses);
    console.log('Courses seeded');

    const noteRepo = dataSource.getRepository(Note);

    const notesData = [
      {
        title: 'React JSX',
        content: 'JSX is a syntax extension for React',
        imageUrl: null,
        user: { id: users[0].id },
        course: { id: courses[0].id },
      },
      {
        title: 'React State',
        content: 'State allows React components to manage data',
        imageUrl: null,
        user: { id: users[1].id },
        course: { id: courses[0].id },
      },
      {
        title: 'NestJS Modules',
        content: 'Modules are building blocks of NestJS apps',
        imageUrl: null,
        user: { id: users[0].id },
        course: { id: courses[1].id },
      },
    ];

    const notes = noteRepo.create(notesData);
    await noteRepo.save(notes);
    console.log('Notes seeded');

    await dataSource.destroy();
    console.log('Seeding finished!');
  } catch (error) {
    console.error('Seeding error:', error);
    await dataSource.destroy();
  }
}

seed();
