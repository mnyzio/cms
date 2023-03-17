INSERT INTO department (name)
VALUES 
    ('Engineering'),
    ('Finance'),
    ('Legal'),
    ('Human Resources'),
    ('Sales'),
    ('IT'),
    ('Product Management'),
    ('Manufacturing'),
    ('Distribution');

INSERT INTO role (title, salary, department_id) 
VALUES
    ('Software Engineer', 80000, 1),
    ('Data Engineer', 85000, 1),
    ('Account Manager', 75000, 2),
    ('Accountant', 60000, 2),
    ('Lawyer', 120000, 3),
    ('Benefits Coordinator', 55000, 4),
    ('HR Manager', 80000, 4),
    ('Sales Associate', 55000, 5),
    ('Sales Manager', 82000, 5),
    ('Network Technitian', 73000, 6),
    ('Help Desk Support', 52000, 6),
    ('Product Manager', 87000, 7),
    ('Machine Operator', 47000, 8),
    ('Quality Controller', 52000, 8),
    ('Warehouse Associate', 44000, 9),
    ('Operations Manager', 98000, 9),
    ('Warehouse Supervisor', 67000, 9),
    ('Logistics Manager', 72000, 9);

-- INSERT INTO employee (first_name, last_name, role_id, manager_id)
-- VALUES 
--     ('John', 'Doe', 1, )

