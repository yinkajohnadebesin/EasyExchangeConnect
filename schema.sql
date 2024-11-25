-- --------------------------------------------------------------------------------------------

DROP DATABASE IF EXISTS EEC;
CREATE DATABASE IF NOT EXISTS EEC;
USE EEC;

-- Drop and recreate the Users table
DROP TABLE IF EXISTS Users;

CREATE TABLE Users (
    Student_ID VARCHAR(20) PRIMARY KEY,
    Student_FirstName CHAR(50) NOT NULL,
    Student_LastName CHAR(50) NOT NULL,
    Student_Email VARCHAR(100) UNIQUE NOT NULL,
    Student_Username VARCHAR(50) UNIQUE NOT NULL,
    Student_DOB DATE
);

-- Drop and recreate the Admins table
DROP TABLE IF EXISTS Admins;

CREATE TABLE Admins (
    Lecturer_ID VARCHAR(20) PRIMARY KEY,
    Lecturer_FirstName CHAR(50) NOT NULL,
    Lecturer_LastName CHAR(50) NOT NULL,
    Lecturer_Email VARCHAR(100) UNIQUE NOT NULL,
    Lecturer_Username VARCHAR(50) UNIQUE NOT NULL,
    Lecturer_DOB DATE
);

-- Drop and recreate the Applications table
DROP TABLE IF EXISTS Applications;

CREATE TABLE Applications (
    Application_ID INT AUTO_INCREMENT PRIMARY KEY,
    Applicant_ID VARCHAR(20),
    Application_Submit_Date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    Institution_Choice VARCHAR(100) NOT NULL,
    FOREIGN KEY (Applicant_ID) REFERENCES Users(Student_ID)
);

-- Drop and recreate the Comments table
DROP TABLE IF EXISTS Comments;

CREATE TABLE Comments (
    Comment_ID INT AUTO_INCREMENT PRIMARY KEY,
    Comment TEXT NOT NULL,
    Comment_Creator_s VARCHAR(50),
    Comment_Creator_l VARCHAR(50),
    Comment_DateCreated TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (Comment_Creator_s) REFERENCES Users(Student_Username),
    FOREIGN KEY (Comment_Creator_l) REFERENCES Admins(Lecturer_Username)
);

-- Drop and recreate the Replies table
DROP TABLE IF EXISTS Replies;

CREATE TABLE Replies (
    Reply_ID INT AUTO_INCREMENT PRIMARY KEY,
    Reply TEXT NOT NULL,
    Comment_ID INT, FOREIGN KEY (Comment_ID) REFERENCES Comments(Comment_ID),
    Reply_Creator_s VARCHAR(50), FOREIGN KEY (Reply_Creator_s) REFERENCES Users(Student_Username),
    Reply_Creator_l VARCHAR(50), FOREIGN KEY (Reply_Creator_l) REFERENCES Admins(Lecturer_Username),
    Reply_DateCreated TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

