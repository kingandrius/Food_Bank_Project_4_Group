# 🗄️ Database Documentation: Version 1.0

This document provides an overview of the current database structure and the test data pre-loaded for the Food Bank project.

## 📊 Database Summary

| Table Name | Category | Description | Records Included |
| :--- | :--- | :--- | :--- |
| **`role`** | Access | Defines permissions levels. | Admin, Volunteer, Manager |
| **`users`** | Access | Team members and profiles. | Nikolai, Andy, Nicholas (Test accounts) |
| **`category`** | Inventory | Broad groupings for food storage. | Canned Goods, Fresh Produce, Dairy, Bakery, Frozen Food |
| **`inventory_item`** | Inventory | Individual items and their base units. | 14 items (Milk, Cheese, Peanut Butter, etc.) |
| **`transaction`** | Inventory | Logs for stock coming IN or going OUT. | 4 entries (Initial stock and sample distributions) |
| **`shift`** | Logistics | Operational hours and volunteer needs. | 3 shifts scheduled (May 15-16, 2026) |
| **`shift_volunteer`**| Logistics | Link between users and specific shifts. | 3 assignments (Confirmed/Scheduled status) |

---

## 🔑 Connection Credentials
These details are required for the local application to communicate with the database.

* **Database Name:** `food_bank_db`
* **Default User:** `postgres`
* **Password:** `FontysICT`
* **Host:** `localhost`
* **Port:** `5432`

---

## 🛠️ Data Sample Breakdown
Below is a snapshot of the specific test data currently residing in the database:

### Inventory Examples
* **Dairy:** Whole Milk (Liters), Cheddar Cheese (kg), Large Eggs (Cartons)
* **Canned Goods:** Canned Tomatoes (Cans), Black Beans (Cans), Peanut Butter (Jars)
* **Fresh Produce:** Red Apples (kg), Bananas (Bunches), Spinach (Bags)

### Upcoming Shifts
* **Morning Shift:** 2026-05-15 (09:00 - 13:00) | Required: 4 | Assigned: Nikolai, Andy
* **Afternoon Shift:** 2026-05-15 (13:00 - 17:00) | Required: 3 | Assigned: Nikolai

---

## 🚀 Setup Instructions
1. Create a database named `food_bank_db` in pgAdmin.
2. Open the **Query Tool** for that database.
3. Open the `database_full_setup.sql` script.
4. **Important:** Delete any `\restrict` or `\unrestrict` lines if they appear at the very top or bottom.
5. Press **F5** to execute.
6. Refresh the `Tables` folder to see all 7 tables populated with the data above.
