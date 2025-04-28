import { z } from "zod";

const taskSchema = z.object({
  title: z.string().min(1).max(255),
  status: z.union([z.literal("pending"), z.literal("completed")]),
  dueDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
});

const taskId = z.coerce
  .number()
  .int("ID must be an integer")
  .min(10000, "ID must be 5 digits")
  .max(99999, "ID must be 5 digits");

export const validateTask = (data) => {
  try {
    const validated = taskSchema.parse(data);
    return { isValid: true, data: validated };
  } catch (error) {
    return {
      isValid: false,
      errors: error.errors.map((err) => ({
        path: err.path.join("."),
        message: err.message,
      })),
    };
  }
};

export const validateId = (id) => {
  try {
    const validated = taskId.parse(id);
    return { isValid: true, data: validated };
  } catch (error) {
    return {
      isValid: false,
      errors: error.errors.map((err) => ({
        path: err.path.join("."),
        message: err.message,
      })),
    };
  }
};
