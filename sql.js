const connection = require("./connection");

class sql {
  constructor(connection) {
    this.connection = connection;
  }
  selectEmployees() {
    return this.connection.query("SELECT * FROM employee");
  }
  insEmployee(employee) {
    return this.connection.query("INSERT INTO employee SET ?", employee);
  }

  upRole() {
    return this.connection.query("UPDATE employee SET role_id = role_id WHERE first_name = name");
  }

  selectRoles() {
    return this.connection.query("SELECT id, title, salary, department_id AS role FROM role");
  }

  insRole(newRole) {
    return this.connection.query("INSERT INTO role SET ?", newRole);
  }

  selectDepartments() {
    return this.connection.query("SELECT * FROM department");
  }

  insDepartment(department) {
    return this.connection.query("INSERT INTO department SET ?", department);
  }

  upEmployee(employeeId, newRoleId) {
    console.log("inside query");
    return this.connection.query("UPDATE employee SET role_id = ? WHERE id = ?", [newRoleId, employeeId]);
  }
};

module.exports = new sql(connection);