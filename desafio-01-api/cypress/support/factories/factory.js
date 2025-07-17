import { faker } from '@faker-js/faker';

export function generateData() {
  return {
    userId: faker.number.int({ min: 1, max: 100 }),
    title: faker.lorem.sentence(4),
    body: faker.lorem.paragraph(2),
  };
}