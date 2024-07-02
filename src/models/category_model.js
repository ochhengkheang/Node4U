export const CategoryModel = (id, name) => {
  this.id = id;
  this.name = name;
};

CategoryModel.prototype.getId = () => this.id;
CategoryModel.prototype.getName = () => this.name;

CategoryModel.setId = (id) => {
  this.id = id;
};
CategoryModel.setName = (name) => {
  this.name = name;
};
