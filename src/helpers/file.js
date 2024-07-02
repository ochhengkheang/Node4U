import url, { fileURLToPath } from "url";
import path from "path";

const currentPath = path.dirname(url.fileURLToPath(import.meta.url));
export const employeeJsonDataPath = path.join(
  currentPath,
  "../../data/employee.json"
);

export const itemJsonDataPath = path.join(currentPath, "../../data/items.json");

export const categoryJsonDataPath = path.join(
  currentPath,
  "../../data/category.json"
);

export const addressesJsonDataPath = path.join(
  currentPath,
  "../../data/address.json"
);

export const getFilePath = (metaUrl) => {
  return fileURLToPath(metaUrl);
};

export const getFolderPath = (metaUrl) => {
  return path.dirname(url.fileURLToPath(metaUrl));
};
