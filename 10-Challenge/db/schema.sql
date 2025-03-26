DROP DATABASE IF EXISTS employee_db;
CREATE DATABASE employee_db;

\c employee_db 


create table department (
    id serial primary key,
    name VARCHAR(30) UNIQUE NOT NULL
);



create table role (
id SERIAL PRIMARY KEY,
title VARCHAR(30) UNIQUE NOT NULL ,
salary DECIMAL NOT NULL, 
department_id INTEGER NOT NULL
);



create table employee (
id SERIAL PRIMARY KEY,
first_name VARCHAR(30) NOT NULL,
last_name VARCHAR(30) NOT NULL,
role_id INTEGER NOT NULL,
manager_id INTEGER
);