const { Pool } = require("pg");
require("dotenv").config();

// Check if DATABASE_URL exists
const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
    console.error('❌ DATABASE_URL is not set in environment variables');
    console.error('Please add DATABASE_URL to your Render environment variables');
    process.exit(1);
}

const db = new Pool({
    connectionString: databaseUrl,
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 30000,
    ssl: databaseUrl.includes('localhost') ? false : {
        rejectUnauthorized: false
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