import url, { fileURLToPath } from "url";
import path from "path";

const currentPath = path.dirname(url.fileURLToPath(import.meta.url));
export const employeeJsonDataPath = path.join(
  currentPath,
  "../../public/json/employee.json"
);

export const itemJsonDataPath = path.join(
  currentPath,
  "../../public/json/items.json"
);

export const categoryJsonDataPath = path.join(
  currentPath,
  "../../public/json/category.json"
);

export const addressesJsonDataPath = path.join(
  currentPath,
  "../../public/json/address.json"
);

export const getFilePath = (metaUrl) => {
  return fileURLToPath(metaUrl);
};

export const getFolderPath = (metaUrl) => {
  return path.dirname(url.fileURLToPath(metaUrl));
};
