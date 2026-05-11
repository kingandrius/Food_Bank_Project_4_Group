# 🗄️ Database Setup Instructions

To get the Food Bank project running on your local machine, follow these steps:

### 1. PostgreSQL Connection Details
Use these credentials when configuring your local pgAdmin or the application's `.env` file:

| Property | Value |
| :--- | :--- |
| **Host** | `localhost` |
| **Port** | `5432` |
| **Database** | `food_bank_db` |
| **User** | `postgres` |
| **Password** | `FontysICT` |

---

### 2. How to Initialize the Database
1. Open **pgAdmin 4**.
2. Right-click on **Databases** -> **Create** -> **Database...**
3. Name it `food_bank_db` and click **Save**.
4. Select the new `food_bank_db` in the sidebar.
5. Open the **Query Tool** (lightning bolt icon).
6. Drag and drop the `database_setup.sql` file into the editor.
7. Press **F5** to execute.

### 3. Verification
After running the script, you should see 7 tables under `Schemas > public > Tables`. 
Test data for roles and users is already included in the dump!
