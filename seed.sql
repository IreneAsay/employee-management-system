INSERT INTO department
(department)

VALUES
('R&D')
('Sales')
('Human Resource')
('Legal')
('Operation')

INSERT INTO role
(title, salary, department_id)

VALUES
('Business Analyst',100000,10)
('Product Owner',150000,11)
('Web Developer',120000,11)
('Release Manager',130000,12)
('Attorney',140000,13)
('Legal Assistant',70000,10)
('Executive Secretary',80,000,11)
('Sales Engineer',900000,14)
('Technical Writer',600000,15)
('HR Specialist',900000,16)

INSERT INTO employee
(first_name, last_name, role_id, manager_id)

VALUES
('Jack','Frost',1001,101)
('Connor','Bear',1002,102)
('Gery','Forrest',1002,103)
('Amina','Beeler',1003,105)
('JingWen','Chen',1003,105)
('Dong','Yin',1003,105)
('Chen','Bing',1004,101)
('Dofu','Cho',1005,104)
('Qili','Xiang',1006,103)
('Cathy','Baker',1007,106)