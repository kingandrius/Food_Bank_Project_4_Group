/**
 * BACKEND ROUTE HANDLER
 * File Placement: backend/routes/dashboard.js
 */

const express = require('express');
const router = express.Router();
const pool = require('../db'); 

// 1. GET http://localhost:3000/dashboard/stats
router.get('/stats', async (req, res) => {
    try {
        const totalItemsQuery = await pool.query(
            'SELECT COUNT(*) AS count FROM public.inventory_item'
        );
        
        const lowStockQuery = await pool.query(
            'SELECT COUNT(*) AS count FROM public.inventory_item WHERE quantity <= 10'
        );
        
        let volunteerCount = 0;
        try {
            const volunteersQuery = await pool.query(
                'SELECT COUNT(*) AS count FROM public.users WHERE role_id = 3'
            );
            volunteerCount = parseInt(volunteersQuery.rows[0].count) || 0;
        } catch (userTableError) {
            console.warn('Could not fetch active volunteer counts. Defaulting to 0.');
        }

        const statisticsPayload = {
            totalItems: parseInt(totalItemsQuery.rows[0].count) || 0,
            lowStock: parseInt(lowStockQuery.rows[0].count) || 0,
            activeVolunteers: volunteerCount,
            scheduledToday: 0 
        };

        return res.status(200).json(statisticsPayload);
    } catch (error) {
        console.error('Critical Dashboard Stats Routing Crash:', error);
        return res.status(500).json({ message: 'Internal Database Error', error: error.message });
    }
});

// 2. GET http://localhost:3000/dashboard/recent-inventory
router.get('/recent-inventory', async (req, res) => {
    try {
        const inventoryQuery = await pool.query(
            'SELECT item_id, item_name, quantity, base_unit FROM public.inventory_item ORDER BY item_id DESC LIMIT 4'
        );

        const items = inventoryQuery.rows.map(row => {
            const isLow = row.quantity <= 10; 
            return {
                id: row.item_id,
                name: row.item_name,
                quantity: row.quantity,
                unit: row.base_unit || 'units',
                statusClass: isLow ? 'low' : 'good',
                badgeText: isLow ? 'Low Stock' : 'Good Stock'
            };
        });

        return res.status(200).json(items);
    } catch (error) {
        console.error('Failed to fetch recent inventory:', error);
        return res.status(500).json({ message: 'Internal Database Error', error: error.message });
    }
});

// 3. GET http://localhost:3000/dashboard/alerts
router.get('/alerts', async (req, res) => {
    try {
        const alerts = [];

        // Fetch items that are genuinely low on stock (Quantity <= 10)
        const lowStockItemsQuery = await pool.query(
            "SELECT item_name, quantity FROM public.inventory_item WHERE quantity <= 10 ORDER BY quantity ASC"
        );

        if (lowStockItemsQuery.rows.length > 0) {
            const itemNames = lowStockItemsQuery.rows.map(item => item.item_name).join(', ');
            alerts.push({
                type: 'warning',
                text: `Low stock warning: ${itemNames} running low`
            });
        }

        // Fetch items that are expiring soonest (If your DB has expiration dates)
        const expiringItemsQuery = await pool.query(
            "SELECT item_name FROM public.inventory_item WHERE expiration_date <= CURRENT_DATE + INTERVAL '7 days' LIMIT 2"
        );

        if (expiringItemsQuery.rows.length > 0) {
            const expiringNames = expiringItemsQuery.rows.map(item => item.item_name).join(', ');
            alerts.push({
                type: 'alert',
                text: `Food expiring soon: Check stock conditions for ${expiringNames}`
            });
        }

        return res.status(200).json(alerts);
    } catch (error) {
        console.error('Failed to generate alerts context:', error);
        return res.status(500).json({ message: 'Internal Database Error', error: error.message });
    }
});

module.exports = router;