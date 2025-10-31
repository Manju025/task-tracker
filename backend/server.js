const express = require("express");
const cors = require("cors");
const { initializeDb } = require("./src/db/connection");
const service = require("./src/services/task.service");

const app = express();
app.use(cors());
app.use(express.json());

const startServer = async () => {
  await initializeDb();

  app.get("/tasks", async (req, res) => {
    res.send(await service.getAllTasks());
  });

  app.post("/tasks", async (req, res) => {
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

  app.put("/tasks/:id", async (req, res) => {
    const { id } = req.params;
    await service.updateTask(id, req.body);
    res.send({ message: "Task updated successfully" });
  });

  app.listen(5000, () => {
    console.log("Server running on http://localhost:5000");
  });
};

startServer();
