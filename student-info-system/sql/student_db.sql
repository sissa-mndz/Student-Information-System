CREATE DATABASE student_db;

USE student_db;

CREATE TABLE students (
  id VARCHAR(20) PRIMARY KEY,
  first_name VARCHAR(50),
  last_name VARCHAR(50),
  email VARCHAR(100),
  phone VARCHAR(20)
);
