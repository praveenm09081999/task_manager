import sqlite3 from "sqlite3";
import { validateId } from "../../../utils/validator";

export default function handler(req, res) {
  if (req.method !== "DELETE") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const id = req.body;
  const db = new sqlite3.Database("./tasks.db");
  const validation = validateId(id);
    if (!validation.isValid) {
      console.log(validation)
      return res.status(400).json({
        error: "Validation failed",
        details: validation.errors,
      });
    }

  db.get("SELECT id FROM tasks WHERE id = ?", [id], (err, row) => {
    if (err) {
      db.close();
      console.error(err);
      return res.status(500).json({ error: "Database error" });
    }

    if (!row) {
      db.close();
      return res.status(404).json({ error: "Task not found" });
    }

    db.run("DELETE FROM tasks WHERE id = ?", [id], function (err) {
      db.close();

      if (err) {
        console.error(err);
        return res.status(500).json({ error: "Failed to delete task" });
      }

      if (this.changes === 0) {
        return res.status(404).json({ error: "Task not found" });
      }

      res.status(200).json({
        success: true,
        message: `Task ${id} deleted successfully`,
        deletedId: id,
      });
    });
  });
}
