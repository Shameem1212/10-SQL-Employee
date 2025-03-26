// //module.exports = [
//     {
//         type: 'list',
//         name: 'task',
//         message: 'What would you like to do?',
//         choices: ['view all departments', 'view all roles', 'view all employees', 'add a department', 'add a role', 'add an employee', 'update an employee role']
//     }
// ]; we are going to export the functions for each of the choices
import inquirer from "inquirer";
import {
  viewAllDepartments,
  viewAllRoles,
  viewAllEmployees,
  addDepartment,
  addRole,
  addEmployee,
  updateEmployeeRole,
  removeDepartment,
} from "./db/queries.js";

const mainMenu = async () => {
  const { task } = await inquirer.prompt([
    {
      type: "list",
      name: "task",
      message: "What would you like to do?",
      choices: [
        "View all departments",
        "View all roles",
        "View all employees",
        "Add a department",
        "Add a role",
        "Add an employee",
        "Update an employee role",
        "Remove a department",
        "Exit",
      ],
    },
  ]);

  switch (task) {
    case "View all departments":
      await viewAllDepartments();
      break;
    case "View all roles":
      await viewAllRoles();
      break;
    case "View all employees":
      await viewAllEmployees();
      break;
    case "Add a department":
      await addDepartment();
      break;
    case "Add a role":
      await addRole();
      break;
    case "Add an employee":
      await addEmployee();
      break;
    case "Update an employee role":
      await updateEmployeeRole();
      break;
    case "Remove a department":
      await removeDepartment();
      break;
    case "Exit":
      console.log("Goodbye!");
      process.exit();
  }
  mainMenu();
};

export default mainMenu;
