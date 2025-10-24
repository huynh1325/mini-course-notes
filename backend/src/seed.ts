import * as bcrypt from 'bcrypt';
import dataSource from '../typeorm.config';
import { User } from './users/entities/user.entity';
import { Course } from './courses/entities/course.entity';
import { Note } from './notes/entities/note.entity';

async function seed() {
  try {
    await dataSource.initialize();
    console.log('Database connected!');

    const userRepo = dataSource.getRepository(User);

    const usersData = [
      { username: 'huynh', password: '123456' },
      { username: 'admin', password: '123456' },
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

    const courseRepo = dataSource.getRepository(Course);
    const coursesData = [
      {
        name: 'React Basics',
        description: 'Learn React from scratch',
        thumbnail: 'http://localhost:8080/public/images/react-basics.jpg',
      },
      {
        name: 'NestJS Advanced',
        description: 'Advanced NestJS concepts',
        thumbnail: 'http://localhost:8080/public/images/nestjs-advanced.png',
      },
      {
        name: 'JavaScript Fundamentals',
        description: 'Understand the basics of JavaScript programming',
        thumbnail: 'http://localhost:8080/public/images/javascript-fundamentals.jpg',
      },
      {
        name: 'TypeScript Mastery',
        description: 'Deep dive into TypeScript for scalable apps',
        thumbnail: 'http://localhost:8080/public/images/typescript-mastery.jpg',
      },
      {
        name: 'Node.js Essentials',
        description: 'Build server-side applications with Node.js',
        thumbnail: 'http://localhost:8080/public/images/nodejs-essentials.png',
      },
      {
        name: 'Express.js Crash Course',
        description: 'Fast-paced introduction to Express.js',
        thumbnail: 'http://localhost:8080/public/images/nodejs-essentials.png',
      },
      {
        name: 'MongoDB for Developers',
        description: 'Learn how to use MongoDB in modern applications',
        thumbnail: 'http://localhost:8080/public/images/nodejs-essentials.png',
      },
      {
        name: 'Docker for Beginners',
        description: 'Containerize your applications using Docker',
        thumbnail: 'http://localhost:8080/public/images/nestjs-advanced.png',
      },
      {
        name: 'Microservices with NestJS',
        description: 'Build and scale microservices using NestJS',
        thumbnail: 'http://localhost:8080/public/images/nestjs-advanced.png',
      },
      {
        name: 'React Hooks in Depth',
        description: 'Master React Hooks and state management',
        thumbnail: 'http://localhost:8080/public/images/react-basic.png',
      },
      {
        name: 'Next.js Full Guide',
        description: 'Learn Next.js for server-side rendering and SEO',
        thumbnail: 'http://localhost:8080/public/images/react-basic.png',
      },
      {
        name: 'RESTful API Design',
        description: 'Best practices for designing REST APIs',
        thumbnail: 'http://localhost:8080/public/images/typescript-mastery.png',
      },
      {
        name: 'GraphQL Fundamentals',
        description: 'Learn how to build APIs with GraphQL',
        thumbnail: 'http://localhost:8080/public/images/typescript-mastery.png',
      },
      {
        name: 'Git & GitHub Workflow',
        description: 'Version control and collaboration using Git and GitHub',
        thumbnail: 'http://localhost:8080/public/images/javascript-fundamentals.png',
      },
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

//npx ts-node ./node_modules/typeorm/cli.js migration:generate ./src/migrations/Init --dataSource typeorm.config.ts
//npx ts-node ./node_modules/typeorm/cli.js migration:run --dataSource typeorm.config.ts
//npx ts-node src/seed.ts