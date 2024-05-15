create database Assignment;
use Assignment;

-- Create Employees table
CREATE TABLE Employees (
    Employee_ID INT PRIMARY KEY,
    Name VARCHAR(255),
    Email VARCHAR(255),
    Job_Title VARCHAR(255),
    Salary DECIMAL(10, 2)
);

-- Create Departments table
CREATE TABLE Departments (
    Department_ID INT PRIMARY KEY,
    Department_Name VARCHAR(255)
);

-- Create Employee_Departments table
CREATE TABLE Employee_Departments (
    Employee_ID INT,
    Department_ID INT,
    FOREIGN KEY (Employee_ID) REFERENCES Employees(Employee_ID),
    FOREIGN KEY (Department_ID) REFERENCES Departments(Department_ID)
);
-- Insert data into Employees table
INSERT INTO Employees (Employee_ID, Name, Email, Job_Title, Salary)
VALUES
    (1, 'Vansh Gupta', 'VanshGupta@example.com', 'Software Engineer', 70000.00),
    (2, 'Navin Sir', 'navinsir@example.com', 'Marketing Manager', 80000.00),
    (3, 'Rupa Sharma', '.rupasharma@example.com', 'Sales Representative', 60000.00);

-- Insert data into Departments table
INSERT INTO Departments (Department_ID, Department_Name)
VALUES
    (1, 'Engineering'),
    (2, 'Marketing'),
    (3, 'Sales');

-- Insert data into Employee_Departments table
INSERT INTO Employee_Departments (Employee_ID, Department_ID)
VALUES
    (1, 1),  -- for vansh
    (2, 2),  -- for Navin sir
    (3, 3);  -- for Rupa
