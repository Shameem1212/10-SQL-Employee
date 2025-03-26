import { pool } from "./connection.js";
import inquirer from "inquirer";

// View all departments
export const viewAllDepartments = async () => {
  const { rows } = await pool.query("SELECT * FROM department");
  console.table(rows);
};

// View all roles
export const viewAllRoles = async () => {
  const query = `
    SELECT role.id, role.title, department.name AS department, role.salary
    FROM role
    JOIN department ON role.department_id = department.id
  `;
  const { rows } = await pool.query(query);
  console.table(rows);
};

// View all employees
export const viewAllEmployees = async () => {
  const query = `
    SELECT 
      e.id, e.first_name, e.last_name, role.title, department.name AS department, role.salary, 
      CONCAT(m.first_name, ' ', m.last_name) AS manager
    FROM employee e
    LEFT JOIN role ON e.role_id = role.id
    LEFT JOIN department ON role.department_id = department.id
    LEFT JOIN employee m ON e.manager_id = m.id
  `;
  const { rows } = await pool.query(query);
  console.table(rows);
};

// Add a department
export const addDepartment = async () => {
  const { name } = await inquirer.prompt([
    {
      type: "input",
      name: "name",
      message: "Enter the name of the department:",
    },
  ]);
  await pool.query("INSERT INTO department (name) VALUES ($1)", [name]);
  console.log(`Added department: ${name}`);
};

// Add a role
export const addRole = async () => {
  const { title, salary, department_id } = await inquirer.prompt([
    {
      type: "input",
      name: "title",
      message: "Enter the title of the role:",
    },
    {
      type: "input",
      name: "salary",
      message: "Enter the salary for the role:",
    },
    {
      type: "input",
      name: "department_id",
      message: "Enter the department ID for this role:",
    },
  ]);
  await pool.query(
    "INSERT INTO role (title, salary, department_id) VALUES ($1, $2, $3)",
    [title, salary, department_id]
  );
  console.log(`Added role: ${title}`);
};

// Add an employee
export const addEmployee = async () => {
  const { first_name, last_name, role_id, manager_id } = await inquirer.prompt([
    {
      type: "input",
      name: "first_name",
      message: "Enter the employee's first name:",
    },
    {
      type: "input",
      name: "last_name",
      message: "Enter the employee's last name:",
    },
    {
      type: "input",
      name: "role_id",
      message: "Enter the role ID for the employee:",
    },
    {
      type: "input",
      name: "manager_id",
      message: "Enter the manager ID (leave blank for none):",
      default: null,
    },
  ]);
  await pool.query(
    "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4)",
    [first_name, last_name, role_id, manager_id || null]
  );
  console.log(`Added employee: ${first_name} ${last_name}`);
};

// Update employee role
export const updateEmployeeRole = async () => {
  const { employee_id, role_id } = await inquirer.prompt([
    {
      type: "input",
      name: "employee_id",
      message: "Enter the ID of the employee whose role you want to update:",
    },
    {
      type: "input",
      name: "role_id",
      message: "Enter the new role ID:",
    },
  ]);
  await pool.query("UPDATE employee SET role_id = $1 WHERE id = $2", [
    role_id,
    employee_id,
  ]);
  console.log(`Updated employee's role.`);
};

export const removeDepartment = async () => {
  const { name } = await inquirer.prompt([
    {
      type: "input",
      name: "name",
      message: "Enter the name of the department to delete:",
    },
  ]);
  await pool.query("DELETE FROM department WHERE name = $1", [name]);
  console.log(`Deleted Department ${name}`);
};
