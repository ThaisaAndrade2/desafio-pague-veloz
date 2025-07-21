import { faker } from "@faker-js/faker";
import dayjs from "dayjs";

export const FormFactory = {
  create: (overrides = {}) => {
    const defaultProduct = {
      Name: faker.person.fullName(),
      Price: faker.number.int({ min: 1, max: 5000 }),
      Date: dayjs().format("YYYY-MM-DD"),
    };

    return {
      ...defaultProduct,
      ...overrides,
    };
  },
};

export const ProductsFactory = {
  create: (overrides = {}) => {
    const defaultProduct = {
      Name: faker.person.fullName(),
      Price: faker.number.int({ min: 1, max: 5000 }),
      Date: dayjs().format("YYYY-MM-DD"),
    };

    return {
      ...defaultProduct,
      ...overrides,
    };
  },

  existingProducts: () => {
    return [
      { Name: "Product 1" },
      { Name: "Product 2" }
    ];
  },

  nonExistingProducts: (count = 1) => {
    const products = [];
    for (let i = 0; i < count; i++) {
      products.push({
        Name: faker.commerce.productName()
      });
    }
    return products;
  },
};

export const LoginFactory = {
  create: (overrides = {}) => {
    const defaultLogin = {
      Username: faker.internet.userName(),
      Password: faker.internet.password(),
    };

    return {
      ...defaultLogin,
      ...overrides,
    };
  },
};
