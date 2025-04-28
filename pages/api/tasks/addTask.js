import { validateTask } from "../../../utils/validator";

const sqlite3 = require("sqlite3").verbose();

export default function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const db = new sqlite3.Database("./tasks.db");
  const task = req.body;

  const validation = validateTask(task);
  if (!validation.isValid) {
    console.log(validation)
    return res.status(400).json({
      error: "Validation failed",
      details: validation.errors,
    });
  }

  const generateId = (callback) => {
    const randomId = Math.floor(10000 + Math.random() * 90000);
    db.get("SELECT id FROM tasks WHERE id = ?", [randomId], (err, row) => {
      if (err) return callback(-1);
      callback(row ? generateId(callback) : randomId);
    });
  };

  generateId((id) => {
    if (id === -1) {
      db.close();
      return res.status(500).json({ error: "Failed to generate ID" });
    }

    db.run(
      `INSERT INTO tasks (id, title, status, dueDate) VALUES (?, ?, ?, ?)`,
      [id, task.title, task.status, task.dueDate],
      function (err) {
        db.close();

        if (err) {
          console.error(err);
          return res.status(500).json({ error: "Failed to add task" });
        }

        res.status(201).json({ id });
      }
    );
  });
}
