const connection = require("./config/connection");

class sql {
  constructor(connection) {
    this.connection = connection;
  }
  allEmployees() {
    return this.connection.query("SELECT * FROM employee");
  }
  addEmployee(employeeAdd) {
    return this.connection.query("INSERT INTO employee SET ?", employeeAdd);
  }

  updateRole() {
    return this.connection.query("UPDATE employee SET role_id = role_id WHERE first_name = name");
  }

  allRoles() {
    return this.connection.query("SELECT id, title, salary, department_id AS role FROM role");
  }

  addRole(newRole) {
    return this.connection.query("INSERT INTO role SET ?", newRole);
  }

  allDepartments() {
    return this.connection.query("SELECT * FROM department");
  }

  addDepartment(addDep) {
    return this.connection.query("INSERT INTO department (name) VALUES (?)", addDep);
  }

  updateEmployee(employeeId, newRoleId) {
    console.log("inside query");
    return this.connection.query("UPDATE employee SET role_id = ? WHERE id = ?", [newRoleId, employeeId]);
  }
};

module.exports = new sql(connection);