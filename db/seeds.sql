INSERT INTO department (name)
VALUES 
    ('ENGINEERING'),        
    ('FINANCE'),            
    ('LEGAL'),              
    ('HUMAN RESOURCES'),    
    ('SALES'),              
    ('IT'),                 
    ('PPRODUCT MANAGEMENT'),
    ('MANUFACTURING'),      
    ('DISTRIBUTION');       

INSERT INTO role (title, salary, department_id) 
VALUES
    ('SOFTWARE ENGINEER', 80000, 1),        
    ('DATA ENGINEER', 85000, 1),            
    ('ACCOUNT MANAGER', 75000, 2),          
    ('ACCOUNTANT', 60000, 2),               
    ('LAWYER', 120000, 3),                  
    ('BENEFITS COORDINATOR', 55000, 4),     
    ('HR MANAGER', 80000, 4),               
    ('SALES ASSOCIATE', 55000, 5),          
    ('SALES MANAGER', 82000, 5),            
    ('NETWORK TECHNITIAN', 73000, 6),       
    ('HELP DESK SUPPORT', 52000, 6),        
    ('PRODUCT MANAGER', 87000, 7),          
    ('MACHINE OPERATOR', 47000, 8),         
    ('QUALITY CONTROLLER', 52000, 8),       
    ('WAREHOUSE ASSOCIATE', 44000, 9),      
    ('OPERATIONS MANAGER', 98000, 9),       
    ('WAREHOUSE SUPERVISOR', 67000, 9),     
    ('LOGISTICS MANAGER', 72000, 9);        

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES 
    ('JOHN', 'DOE', 1, null),              
    ('RICK', 'JONES', 1, 1),               
    ('JEFF', "TWAIN", 2, 1),               
    ('ALBERT','SMITH', 3, null),           
    ('JESSICA', 'OSWELL', 4, 4)            




