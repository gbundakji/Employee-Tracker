const inquirer = require('inquirer');
const sql = require('./sql');
require("console.table")

run();

function run() {
    inquirer.prompt({
        type: "list",
        name: "options",
        message: "What would you like to do?",
        choices: [
            "View All Employees",
            "Add Employee",
            "Update Emloyee Role",
            "View All Roles",
            "Add Role",
            "View All Departments",
            "Add Department"
        ]
    })
    .then((answers) => {
        switch (answers.options) {
            case "View All Employees":
                 allEmployees();
                 break;
            case "Add Employee": 
                 addEmployee();
                 break;
            case "Update Emloyee Role":
                return updateRole();
            case "View All Roles":
                return allRoles();
            case "Add Role":
                return addRole();
            case "View All Departments":
                return allDepartments();
            case "Add Department":
                return addDepartment();
            case "Quit":
                return quit();
        }
    })


async function allEmployees() {
    const employees = await sql.allEmployees();
    console.table(employees);
    run();
}

async function allRoles() {
    const role = await sql.allRoles();
    console.table(role);
    run();
}

async function allDepartments() {
    const departments = await sql.allDepartments();
    console.table(departments);
    run();
}

async function addDepartment() {
    const addDep = await inquirer.prompt(
        {
            type: "input",
            name: "department",
            message: "Wat is the name of the department?",
        }
    );
    await sql.addDepartment(addDep.department);
    run();
}

async function addEmployee() {
    const roleOption = await sql.allRoles();
    const employees = await sql.allEmployees();
    const employeeAdd = await inquirer.prompt([
        {
            type: "input",
            name: "first_name",
            message: "Wat is the first name of the employee?"
        },
        {
            type: "input",
            name: "last_name",
            message: "Wat is the last name of the employee?"
        },
    ]);
    const roleTitle = roleOption.map(({ id, title }) => ({ name: title, value: id }));
    const {roleId} = await inquirer.prompt(
        {
            type: "list",
            name: "roleId",
            message: "Wat is the name of the role?",
            choices: roleTitle,
        }
    );
    const managerList = employees.map(({ first_name, last_name, id }) => ({ name: first_name + last_name, value: id }));
    if (managerList && managerList.length > 0){
        const { managerId } = await inquirer.prompt(
            {  
                type: "list",
                name: "managerId",
                message: "Please select this new employee's manager:",
                choices: managerList,
            }
        );
        employeeAdd.manager_id = managerId;
    }
    employeeAdd.role_id = roleId;
    await sql.addEmployee(employeeAdd);
    run(); 
}

async function addRole() {
    const departments = await sql.allDepartments();
    const departmentList = departments.map(({ id, name }) => ({ name: name, value: id }));
    const roleAdd = await inquirer.prompt([
        {
            type: "input",
            message: "What's the name of the role?",
            name: "title",
        },
        {
            type: "input",
            message: "What is the salary for this role?",
            name: "salary",
        },
        {
            type: "list",
            message: "Which department does the role belong to?",
            name: "department_id",
            choices: departmentList,
        },
    ]);
    await sql.addRole(roleAdd);
    run();
}

async function updateRole() {
    const employeeOps = await sql.allEmployees();
    const roleOption = await sql.allRoles();
    console.log(roleOption);
    const employeeOptions = employeeOps.map(({ id, first_name, last_name }) => ({
        name: first_name + last_name,
        value: id,
    }));
    const roleOps = roleOption.map(({ id, title }) => ({
        name: title,
        value: id,
    }));
    const {employeeId} = await inquirer.prompt(
        {
            type: "list",
            name: "employeeId",
            message: "Select the employee whose role you wish to change:",
            choices: employeeOptions,
        },
    );
    const {roleId} = await inquirer.prompt(
        {
          type: "list",
          name: "roleId",
          message: "What new role would you like to assign to this employee?",
          choices: roleOps,
        },
    );
    await sql.updateEmployee(employeeId, roleId);
    run();
}

function quit() {
    process.exit();
}
};