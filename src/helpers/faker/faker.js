import {
  createRandomCategories,
  createRandomUsers,
  insertToCategoryQuery,
  insertToUserQuery,
} from "./faker_generator.js";
import { faker } from "@faker-js/faker";

const categories = faker.helpers.multiple(createRandomCategories, {
  count: 14,
});
insertToCategoryQuery(categories);

const users = faker.helpers.multiple(createRandomUsers, {
  count: 14,
});
insertToUserQuery(users);
// console.log(users);
