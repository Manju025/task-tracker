const { open } = require("sqlite");
const sqlite3 = require("sqlite3");
const path = require("path");

let db;
const dbPath = path.join(__dirname, "../../task_tracker.db");

const initializeDb = async () => {
  db = await open({ filename: dbPath, driver: sqlite3.Database });

  await db.exec(`
    CREATE TABLE IF NOT EXISTS tasks (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT,
      description TEXT,
      priority TEXT,
      dueDate TEXT,
      status TEXT DEFAULT 'pending'
    );
  `);

  console.log("DB Ready");
};

const getDb = () => db;
module.exports = { initializeDb, getDb };
