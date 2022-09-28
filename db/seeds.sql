INSERT INTO department (name)
VALUES  ("Sales"), 
        ("Engineering"), 
        ("Finance"), 
        ("Legal");

INSERT INTO role (title, salary, department_id)
VALUES  ("Sales Lead", 100000, 1),
        ("Salesperson", 80000, 1),
        ("Lead Engineer", 150000, 2),
        ("Software Engineer", 120000, 2),
        ("Account Manager", 160000, 3),
        ("Accountant", 125000, 3),
        ("Legal Team Lead", 250000, 4),
        ("Lawyer", 190000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES  ("Princess", "Leia", 1, 1),
        ("Han", "Solo", 1, null),
        ("Master", "Yoda", 2, 2),
        ("Obi Wan", "Kenobi", 2, null),
        ("Luke", "Skywalker", 3, 3),
        ("R2", "D2", 3, null),
        ("Emporer", "Palpatine", 4, 4),
        ("Darth", "Vader", 4, null); 