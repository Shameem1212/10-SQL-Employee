import inquirer from "inquirer";
import mainMenu from "./questions.js";
import { pool, connection } from "./db/connection.js";

const init = async () => {
  console.log("Welcome to the Employee Tracker!");
  await mainMenu();
};

init();

async function startApp() {
  try {
    await connection();
    console.log("✅ Application connected to the PostgreSQL database.");
  } catch (err) {
    console.error("❌ Error connecting to the database:", err.stack);
  }
}

startApp();
// write inquirer logic for user input


export const addDepartmentPrompt = async () => {
  const { departmentName } = await inquirer.prompt([
    {
      type: "input",
      name: "departmentName",
      message: "Enter the name of the new department:",
      validate: (input) => (input ? true : "Department name cannot be empty."),
    },
  ]);
  return departmentName;
};

export const addRolePrompt = async (departments) => {
  const { title, salary, departmentId } = await inquirer.prompt([
    {
      type: "input",
      name: "title",
      message: "Enter the title of the new role:",
    },
    {
      type: "input",
      name: "salary",
      message: "Enter the salary for this role:",
      validate: (input) => (!isNaN(input) ? true : "Salary must be a number."),
    },
    {
      type: "list",
      name: "departmentId",
      message: "Select the department:",
      choices: departments.map((dept) => ({
        name: dept.name,
        value: dept.id,
      })),
    },
  ]);
  return { title, salary, departmentId };
};

export const addEmployeePrompt = async (roles, managers) => {
  const { firstName, lastName, roleId, managerId } = await inquirer.prompt([
    {
      type: "input",
      name: "firstName",
      message: "Enter the employee's first name:",
    },
    {
      type: "input",
      name: "lastName",
      message: "Enter the employee's last name:",
    },
    {
      type: "list",
      name: "roleId",
      message: "Select the employee's role:",
      choices: roles.map((role) => ({
        name: role.title,
        value: role.id,
      })),
    },
    {
      type: "list",
      name: "managerId",
      message: "Select the employee's manager:",
      choices: [
        { name: "None", value: null },
        ...managers.map((manager) => ({
          name: `${manager.first_name} ${manager.last_name}`,
          value: manager.id,
        })),
      ],
    },
  ]);
  return { firstName, lastName, roleId, managerId };
};

export const updateEmployeeRolePrompt = async (employees, roles) => {
  const { employeeId, roleId } = await inquirer.prompt([
    {
      type: "list",
      name: "employeeId",
      message: "Select the employee to update:",
      choices: employees.map((emp) => ({
        name: `${emp.first_name} ${emp.last_name}`,
        value: emp.id,
      })),
    },
    {
      type: "list",
      name: "roleId",
      message: "Select the employee's new role:",
      choices: roles.map((role) => ({
        name: role.title,
        value: role.id,
      })),
    },
  ]);
  return { employeeId, roleId };
};
