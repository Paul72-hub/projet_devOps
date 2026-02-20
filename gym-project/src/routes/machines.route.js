const express = require("express");
const machines = require("../data/machines.data");

const router = express.Router();

/**
 * GET /machines
 * Retourne la liste des machines
 */
router.get("/machines", (req, res) => {
  res.json(machines);
});

/**
 * GET /machines/:id
 * Retourne une machine par id
 */
router.get("/machines/:id", (req, res) => {
  const id = Number(req.params.id);

  if (Number.isNaN(id)) {
    return res.status(400).json({ error: "Invalid machine id" });
  }

  const machine = machines.find((m) => m.id === id);
  if (!machine) {
    return res.status(404).json({ error: "Machine not found" });
  }

  res.json(machine);
});

/**
 * GET /scan/:code
 * Simule un scan QR : retourne la machine correspondant au code
 */
router.get("/scan/:code", (req, res) => {
  const { code } = req.params;
  const machine = machines.find((m) => m.code === code);

  if (!machine) {
    return res.status(404).json({ error: "Unknown QR code" });
  }

  res.json({ scanned: true, machine });
});

module.exports = router;