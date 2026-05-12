##  New Features in v1.1
* **Authentication Ready:** The `users` table now supports hashed passwords (`password_hash`).
* **Automated Stock Tracking:** The new `view_inventory_status` allows the backend to get current stock levels without manual math.

##  Smart Views
To see live inventory totals, run:
`SELECT * FROM view_inventory_status;`

##  Test Accounts
| Name | Email | Password (Testing) | Role |
| :--- | :--- | :--- | :--- |
| Nikolai | nikolai@fontys.nl | password123 | Admin |
| Andy | andy@fontys.nl | password123 | Volunteer |
| Nicholas | nicholas@fontys.nl | password123 | Manager |

#  Database Documentation: Version 1.0

This document provides an overview of the current database structure and the test data pre-loaded for the Food Bank project.

##  Database Summary

| Table Name | Category | Description | Records Included |
| :--- | :--- | :--- | :--- |
| **`role`** | Access | Defines permissions levels. | Admin, Volunteer, Manager |
| **`users`** | Access | Team members and profiles. | Nikolai, Andy, Nicholas (Test accounts) |
| **`category`** | Inventory | Broad groupings for food storage. | Canned Goods, Fresh Produce, Dairy, Bakery, Frozen Food |
| **`inventory_item`** | Inventory | Individual items and their base units. | 14 items (Milk, Cheese, Peanut Butter, etc.) |
| **`transaction`** | Inventory | Logs for stock coming IN or going OUT. | 4 entries (Initial stock and sample distributions) |
| **`shift`** | Logistics | Operational hours and volunteer needs. | 3 shifts scheduled (May 15-16, 2026) |
| **`shift_volunteer`**| Logistics | Link between users and specific shifts. | 3 assignments (Confirmed/Scheduled status) |

##  Data Sample Breakdown
Below is a snapshot of the specific test data currently residing in the database:
### Inventory Examples
* **Dairy:** Whole Milk (Liters), Cheddar Cheese (kg), Large Eggs (Cartons)
* **Canned Goods:** Canned Tomatoes (Cans), Black Beans (Cans), Peanut Butter (Jars)
* **Fresh Produce:** Red Apples (kg), Bananas (Bunches), Spinach (Bags)

### Upcoming Shifts
* **Morning Shift:** 2026-05-15 (09:00 - 13:00) | Required: 4 | Assigned: Nikolai, Andy
* **Afternoon Shift:** 2026-05-15 (13:00 - 17:00) | Required: 3 | Assigned: Nikolai
