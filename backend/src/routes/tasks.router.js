const express = require("express");
const router = express.Router();

const service = require("../services/task.service");
router.get("/", async (req, res) => {
  res.send(await service.getAllTasks());
});

router.post("/", async (req, res) => {
  const { title, description, priority, dueDate } = req.body;
  const result = await service.addTask({
    title,
    description,
    priority,
    dueDate,
  });
  res.send({
    id: result.lastID,
    title,
    description,
    priority,
    dueDate,
    status: "pending",
  });
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  await service.updateTask(id, req.body);
  res.send({ message: "Task updated successfully" });
});

module.exports = router;
