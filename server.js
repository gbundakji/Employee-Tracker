// const express = require('express');
const mysql = require('mysql2');
const inquirer = require('inquirer');
require('console.table');
const config = require('./config/connection');
const sql = require('./sql');
const { async } = require('rxjs');
const { allowedNodeEnvironmentFlags } = require('process');

// const PORT = process.env.PORT || 3001;
// const app = express();

// app.use(express.urlencoded({ extended: false }));
// app.use(express.json());

const db = mysql.createConnection(
    {
        host: process.env.DB_HOST,
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        name: process.env.DB_NAME
    },
    console.log(`Connected to the employeeTracker_db database`),
    console.log(`
    ╔═══╗─────╔╗──────────────╔═╗╔═╗─────────────────
    ║╔══╝─────║║──────────────║║╚╝║║─────────────────
    ║╚══╦╗╔╦══╣║╔══╦╗─╔╦══╦══╗║╔╗╔╗╠══╦═╗╔══╦══╦══╦═╗
    ║╔══╣╚╝║╔╗║║║╔╗║║─║║║═╣║═╣║║║║║║╔╗║╔╗╣╔╗║╔╗║║═╣╔╝
    ║╚══╣║║║╚╝║╚╣╚╝║╚═╝║║═╣║═╣║║║║║║╔╗║║║║╔╗║╚╝║║═╣║
    ╚═══╩╩╩╣╔═╩═╩══╩═╗╔╩══╩══╝╚╝╚╝╚╩╝╚╩╝╚╩╝╚╩═╗╠══╩╝
    ───────║║──────╔═╝║─────────────────────╔═╝║─────
    ───────╚╝──────╚══╝─────────────────────╚══╝─────`)
);

db(config); 
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
            "Add Departments"
        ]
    })
    .then((answers) => {
        switch (answers.options) {
            case "View All Employees":
                return allEmployees();
            case "Add Employee": 
                return addEmployee();
            case "Update Emloyee Role":
                return updateRole();
            case "View All Roles":
                return allRoles();
            case "Add Role":
                return addRole();
            case "View All Departments":
                return allDepartments();
            case "Add Departments":
                return addDepartments();
            case "Quit":
                return quit();
        }
    });


async function allEmployees() {
    const employees = await sql.getAllEmployees();
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

async function addDepartments() {
    const addDep = await inquirer.prompt(
        {
            type: "input",
            name: "department",
            message: "Wat is the name of the department?",
        }
    );
    await sql.selectEmployees(addDep);
    run();
}

async function addEmployee() {
    const roleOption = await sql.allRoles();
    const employees = await sql.getAllEmployees();
    const employeeAdd = await inquirer.prompt([
        {
            type: "list",
            name: "first_name",
            message: "Wat is the first name of the employee?"
        },
        {
            type: "list",
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
                message: "Please select this new employees manager:",
                choices: managerList,
            }
        );
        employeeAdd.manager_id = managerId;
    }
    employeeAdd.role_id = roleId;
    await sql.insEmployee(employeeAdd);
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
            message: "What is the department id number?",
            name: "department_id",
            choices: departmentList,
        },
    ]);
    await sql.addRole(roleAdd);
    run();
}

async function updateRole() {
    const employeeOps = await sql.getAllEmployees();
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
    await sql.upEmployee(employeeId, roleId);
    run();
}

function quit() {
    process.exit();
}
};