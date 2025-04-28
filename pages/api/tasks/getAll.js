import sqlite3 from "sqlite3";

export default function handler(req, res) {
  return new Promise((resolve) => {
    try {
      const db = new sqlite3.Database("./tasks.db", (err) => {
        if (err) {
          console.error(err);
          res.status(500).json({ error: "Failed to connect to database" });
          return resolve();
        }

        db.all(
          "SELECT id, title, status, dueDate FROM tasks ORDER BY dueDate",
          [],
          (err, rows) => {
            db.close();

            if (err) {
              console.error(err);
              res.status(500).json({ error: "Database query error" });
              return resolve();
            }

            res.status(200).json(rows);
            resolve();
          }
        );
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Internal server error" });
      resolve();
    }
  });
}

