
DROP DATABASE IF EXISTS smart_inventory_task_management_db;
CREATE DATABASE smart_inventory_task_management_db;

USE smart_inventory_task_management_db;

CREATE TABLE Users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    PASSWORD VARCHAR(255) NOT NULL,
    role ENUM('Admin','Manager','Staff') NOT NULL,
    create_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    update_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    );
    
    CREATE TABLE Inventory (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        category VARCHAR(100) NOT NULL,
        quantinty INT DEFAULT 1,
        STATUS VARCHAR(50) DEFAULT 'Available',
        assigned_to INT ,
        FOREIGN KEY (assigned_to) REFERENCES users(id) ON DELETE SET  NULL,
          create_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    update_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        );
        
        CREATE TABLE tasks (
        id INT AUTO_INCREMENT PRIMARY KEY,
            title VARCHAR(255) NOT NULL,
            description TEXT,
            STATUS VARCHAR(50) DEFAULT 'To Do',
            assigned_to INT ,
            create_by INT,
            deadline DATE,
            FOREIGN KEY(assigned_to) REFERENCES users(id) ON DELETE SET NULL ,
            FOREIGN KEY(create_by) REFERENCES users(id) ON DELETE SET NULL ,
            create_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            update_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
         
        )