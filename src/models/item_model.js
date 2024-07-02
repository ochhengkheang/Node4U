export const ItemModel = (id, name, categoryId, price) => {
  this.id = id;
  this.name = name;
  this.categoryId = categoryId;
  this.price = price;
};

ItemModel.prototype.getId = () => this.id;
ItemModel.prototype.getName = () => this.name;
ItemModel.prototype.getCategoryId = () => this.categoryId;
ItemModel.prototype.getPrice = () => this.price;

ItemModel.setId = (id) => {
  this.id = id;
};
ItemModel.setName = (name) => {
  this.name = name;
};
ItemModel.setCategoryId = (categoryId) => {
  this.categoryId = categoryId;
};
ItemModel.setPrice = (price) => {
  this.price = price;
};
