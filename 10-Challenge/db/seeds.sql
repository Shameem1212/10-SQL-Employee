insert into department (name)
values 
    ('engineering'),
    ('finance'),
    ('legal'),
    ('sales');

insert into role (title, salary, department_id)
values
    ('Software Engineer',120000, 1),
    ('Account Manager',160000, 2),
    ('Accountant', 125000, 2),
    ('legal Team Lead',250000, 3),
    ('Lawyer',190000, 3);

insert into employee (first_name, last_name, role_id, manager_id)
values
    ('John', 'Doe', 2, null),
    ('Mike', 'Chan', 1, 1),
    ('Ashley', 'Rodriquez', 3, 1),
    ('Kevin', 'Tupik', 4, 1),
    ('Kunal', 'Singh', 5, 1),
    ('Malia', 'Brown', 2, null),
    ('Sarah', 'Lourd', 1, 6),
    ('Tom', 'Allen', 5, 6);
    


