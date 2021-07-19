USE employees_db;

INSERT INTO department
  (name)
VALUES 

    ('Administrative Assistant'),
    ('Data Entry Clerk'),
    ('Executive Assistant'),
    ('Marketing Manager'),
    ('Software Engineer');

/* role table */
INSERT INTO role
  (title, salary, department_id)
VALUES 
   
    ('Lawyer', 350000, 5),
    ('Lead Engineer', 123000, 1),
    ('Accountant', 80000, 7);

/* employee table */
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES 
 ('Ben', 'Njunge', 5,null);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES 
 ('Mary', 'kahura', 1,11);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES 
 ('Bedan', 'Joe', 7,null);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES 
 ('samuel', 'kahura', 1,10);

