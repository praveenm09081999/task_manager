import sqlite3 from "sqlite3";
import { validateId, validateTask } from "../../../utils/validator";

export default function handler(req, res) {
  if (req.method !== "PUT") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { id, title, status, dueDate } = req.body;

  const idValidation = validateId(req.body.id);
  const taskValidation = validateTask(req.body);
  if (!idValidation.isValid || !taskValidation.isValid) {
    console.log(idValidation, taskValidation);
    return res.status(400).json({
      error: "Validation failed",
      details: idValidation.isValid ? taskValidation.errors : idValidation.errors,
    });
  }

  const db = new sqlite3.Database("./tasks.db");

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

    const updates = [];
    const params = [];
    updates.push("title = ?");
    params.push(title.trim());
    updates.push("status = ?");
    params.push(status);
    updates.push("dueDate = ?");
    params.push(dueDate);
    params.push(id);

    const query = `UPDATE tasks SET ${updates.join(", ")} WHERE id = ?`;

    db.run(query, params, function (err) {
      db.close();

      if (err) {
        console.error(err);
        return res.status(500).json({ error: "Failed to update task" });
      }

      if (this.changes === 0) {
        return res
          .status(404)
          .json({ error: "Task not found or no changes made" });
      }

      res.status(200).json({
        success: true,
        message: `Task ${id} updated successfully`,
        updatedId: id,
      });
    });
  });
}
