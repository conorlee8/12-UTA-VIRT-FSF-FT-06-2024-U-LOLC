-- db/seeds.sql

-- Insert data into department
INSERT INTO department (name) VALUES 
('Engineering'), 
('Marketing'), 
('Finance'), 
('Human Resources');

-- Insert data into role
INSERT INTO role (title, salary, department_id) VALUES 
('Software Engineer', 75000, 1),
('Product Manager', 85000, 1),
('Marketing Coordinator', 50000, 2),
('Accountant', 60000, 3);

-- Insert data into employee
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES 
('John', 'Doe', 1, NULL),
('Jane', 'Smith', 2, 1),
('Emily', 'Davis', 3, NULL),
('Michael', 'Johnson', 4, 3);
