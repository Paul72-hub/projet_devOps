const express = require("express");
const machinesRoutes = require("./routes/machines.route");

const app = express();

app.use(express.json());

/**
 * GET /health
 * Endpoint de santé (utile en Docker/CI)
 */
app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

// Routes principales
app.use("/", machinesRoutes);

// 404 générique
app.use((req, res) => {
  res.status(404).json({ error: "Not found" });
});

module.exports = app;