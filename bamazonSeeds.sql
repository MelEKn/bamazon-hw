DROP DATABASE IF EXISTS bamazon_db;

CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE products (
    item_id INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(45),
    department_name VARCHAR(45),
    price DECIMAL(10,2) NULL,
    stock_quantity INT NULL,
    PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Pants", "Clothing", 29.99, 100);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Sunglasses", "Accessories", 14.49, 200);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Necklace", "Jewelry", 70, 50);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Hiking Boots", "Clothing", 150, 50);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Tea Kettle", "Kitchen", 19.99, 300);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Mask", "Accessories", 39.99, 100);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Boat", "Vehicles", 1500.00, 10);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Gloves", "Clothing", 24.99, 100);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Can Opener", "Kitchen", 14.99, 300);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Socks", "Clothing", 5.99, 500);

