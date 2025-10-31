const { getDb } = require("../db/connection");

exports.getAllTasks = () => getDb().all("select * from tasks");

exports.addTask = async (task) => {
  const db = getDb();
  const result = await db.run(
    `insert into tasks (title, description, priority, dueDate) values (?, ?, ?, ?)`,
    [task.title, task.description, task.priority, task.dueDate]
  );
  return result;
};

exports.updateTask = (id, data) => {
  const fields = [];
  const values = [];

  if (data.title !== undefined) {
    fields.push("title = ?");
    values.push(data.title);
  }
  if (data.description !== undefined) {
    fields.push("description = ?");
    values.push(data.description);
  }
  if (data.priority !== undefined) {
    fields.push("priority = ?");
    values.push(data.priority);
  }
  if (data.dueDate !== undefined) {
    fields.push("dueDate = ?");
    values.push(data.dueDate);
  }
  if (data.status !== undefined) {
    fields.push("status = ?");
    values.push(data.status);
  }

  if (fields.length === 0) return;

  const query = `update tasks set ${fields.join(", ")} where id = ?`;
  values.push(id);

  return getDb().run(query, values);
};

exports.deleteTask = (id) =>
  getDb().run(`delete from tasks where id = ?`, [id]);
