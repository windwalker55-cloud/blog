const { Pool } = require("pg");
require("dotenv").config();

const db = new Pool({
    connectionString: process.env.DATABASE_URL,
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 30000, // Increased from 5000 to 30000
    ssl: process.env.DATABASE_URL.includes('localhost') ? false : {
        rejectUnauthorized: false // For remote databases (Supabase, Neon, etc.)
    }
});

// Handle pool errors
db.on('error', (err) => {
    console.error('❌ Database pool error:', err.message);
});

// Test connection on startup
db.connect((err, client, release) => {
    if (err) {
        console.error('❌ Database connection failed:', err.message);
        console.log('🔄 Retrying in 5 seconds...');
        setTimeout(() => {
            console.log('🔄 Retrying database connection...');
            db.connect();
        }, 5000);
    } else {
        console.log('✅ Database connected successfully');
        release();
    }
});

module.exports = db;