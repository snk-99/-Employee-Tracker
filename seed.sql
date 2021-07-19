USE employees_db;

INSERT INTO department
  (name)
VALUES 

    ('Administrative Assistant'),
    ('Data Entry Clerk'),
    ('Executive Assistant'),
    ('Marketing Manager'),
    ('Software Engineer');

/* Seeding roles into the role table */
INSERT INTO role
  (title, salary, department_id)
VALUES 
   
    ('Lawyer', 350000, 5),
    ('Lead Engineer', 123000, 1),
    ('Accountant', 80000, 7);

/* Seeding employees into the employee table */
INSERT INTO employee 
  (first_name, last_name, role_id, manager_id)
VALUES 
('Ben', 'Njunge', 5,null),
('Mary', 'kahura', 1,11),
('Bedan', 'Joe', 7,null),
('samuel', 'kahura', 1,10);

