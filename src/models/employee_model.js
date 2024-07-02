export const EmployeeModel = (id, name, email) => {
  this.id = id || null;
  this.name = name || null;
  this.email = email || null;
};

EmployeeModel.prototype.getId = () => this.id;
EmployeeModel.prototype.getName = () => this.name;
EmployeeModel.prototype.getEmail = () => this.email;

EmployeeModel.setId = (id) => {
  this.id = id;
};
EmployeeModel.setName = (name) => {
  this.name = name;
};
EmployeeModel.setEmail = (email) => {
  this.email = email;
};
