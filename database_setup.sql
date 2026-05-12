-- 1. BUILD THE TABLES
CREATE TABLE role (role_id SERIAL PRIMARY KEY, role_name VARCHAR(50) NOT NULL);
CREATE TABLE category (category_id SERIAL PRIMARY KEY, name VARCHAR(50) NOT NULL);
CREATE TABLE shift (shift_id SERIAL PRIMARY KEY, start_time TIMESTAMP NOT NULL, end_time TIMESTAMP NOT NULL, required_volunteers INT NOT NULL);
CREATE TABLE users (user_id SERIAL PRIMARY KEY, name VARCHAR(100) NOT NULL, email VARCHAR(255) UNIQUE NOT NULL, role_id INT REFERENCES role(role_id));
CREATE TABLE inventory_item (item_id SERIAL PRIMARY KEY, item_name VARCHAR(100) NOT NULL, category_id INT REFERENCES category(category_id), base_unit VARCHAR(20) NOT NULL);
CREATE TABLE shift_volunteer (shift_id INT REFERENCES shift(shift_id), user_id INT REFERENCES users(user_id), status VARCHAR(20) DEFAULT 'scheduled', PRIMARY KEY (shift_id, user_id));
CREATE TABLE transaction (transaction_id SERIAL PRIMARY KEY, item_id INT REFERENCES inventory_item(item_id), quantity_base_units DECIMAL(10, 2) NOT NULL, transaction_type VARCHAR(10) CHECK (transaction_type IN ('IN', 'OUT')), expiry_date DATE, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP);

-- 2. POPULATE CATEGORIES & ROLES
INSERT INTO role (role_name) VALUES ('Admin'), ('Volunteer'), ('Manager');
INSERT INTO category (name) VALUES ('Canned Goods'), ('Fresh Produce'), ('Dairy'), ('Bakery'), ('Frozen Food');

-- 3. POPULATE FOOD ITEMS
INSERT INTO inventory_item (item_name, category_id, base_unit) VALUES 
('Whole Milk', 3, 'Liters'),
('Cheddar Cheese', 3, 'kg'),
('Canned Tomatoes', 1, 'Cans'),
('Black Beans', 1, 'Cans'),
('Red Apples', 2, 'kg'),
('Whole Wheat Bread', 4, 'Loaves');

-- 4. ADD TEST USERS
INSERT INTO users (name, email, role_id) VALUES 
('Nikolai TEST', 'nikolai@fontys.nl', 1),
('Andy TEST', 'andy@fontys.nl', 2),
('Nicholas TEST', 'nicholas@fontys.nl', 3);
