const mysql = require('mysql');
const { app, BrowserWindow, ipcMain } = require('electron');
const fs = require('fs');
const path = require('path');

// Database configuration
const dbConfig = {
  host: '127.0.0.1',
  user: 'root',
  password: 'Catoon-Duck1',
  database: 'Assignment',
  port: 3306
};

let connection;

// Create MySQL connection
function connectToDatabase() {
  connection = mysql.createConnection(dbConfig);

  // Connect to MySQL database
  connection.connect((err) => {
    if (err) {
      console.error('Error connecting to MySQL database:', err);
      return;
    }
    console.log('Connected to MySQL database');
  });
}

// Load data from MySQL database
function loadDataFromDatabase() {
  const query = 'SELECT * FROM Employees'; // Changed table name to Employees
  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error executing MySQL query:', err);
      return;
    }
    // Send data to renderer process
    mainWindow.webContents.send('load-data', results);
  });
}

// Handle adding employee to MySQL database
function addEmployeeToDatabase(name, email, jobTitle, salary) {
  const query = `INSERT INTO Employees (Name, Email, Job_Title, Salary) VALUES (?, ?, ?, ?)`; // Changed table name to Employees
  const values = [name, email, jobTitle, salary];
  connection.query(query, values, (err, _results) => {
    if (err) {
      console.error('Error adding employee to MySQL database:', err);
      return;
    }
    // Load updated data after adding employee
    loadDataFromDatabase();
  });
}

// Handle deleting employee from MySQL database
function deleteEmployeeFromDatabase(employeeId) {
  const query = `DELETE FROM Employees WHERE Employee_ID = ?`; // Changed table name to Employees
  connection.query(query, employeeId, (err, _results) => {
    if (err) {
      console.error('Error deleting employee from MySQL database:', err);
      return;
    }
    // Load updated data after deleting employee
    loadDataFromDatabase();
  });
}

// Event listener for Electron app ready event
app.on('ready', () => {
  // Connect to MySQL database
  connectToDatabase();

  // Create new BrowserWindow and set up event listeners
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  });

  mainWindow.loadFile(path.join(__dirname, 'index.html'));

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  // Event listener for adding employee
  ipcMain.on('add-employee', (_event, employee) => {
    addEmployeeToDatabase(employee.name, employee.email, employee.jobTitle, employee.salary);
  });

  // Event listener for deleting employee
  ipcMain.on('delete-employee', (_event, employeeId) => {
    deleteEmployeeFromDatabase(employeeId);
  });

  // Load data initially
  loadDataFromDatabase();
});
