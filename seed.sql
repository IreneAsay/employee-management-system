INSERT INTO employee
(first_name, last_name, role_id, manager_id)

VALUES
('Jack','Frost',1,2),
('Connor','Bear',2,1),
('Amina','Beeler',3,2),
('JingWen','Chen',4,3),
('Dong','Yin',5,5),
('Chen','Bing',6,4),
('Dofu','Cho',7,4),
('Qili','Xiang',8,3),
('Cathy','Baker',9,2),
('Gery','Fork',10,1);

INSERT INTO role
(title, salary, department_id)

VALUES
('Business Analyst',100000,5),
('Product Owner',150000,1),
('Web Developer',120000,1),
('Release Manager',130000,1),
('Attorney',140000,4),
('Legal Assistant',70000,4),
('Executive Secretary',80000,5),
('Sales Engineer',900000,2),
('Technical Writer',600000,1),
('HR Specialist',900000,3);


INSERT INTO department
(name)

VALUES
('R&D'),
('Sales'),
('Human Resource'),
('Legal'),
('Operation');
