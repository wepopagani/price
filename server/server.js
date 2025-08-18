// Minimal REST backend for remote settings
// Endpoints:
//   GET  /api/settings
//   PUT  /api/settings

const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json({ limit: '1mb' }));
app.use(cors());

const dataDir = path.join(__dirname, 'data');
const dataFile = path.join(dataDir, 'settings.json');

function ensureDataFile() {
  if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });
  if (!fs.existsSync(dataFile)) {
    fs.writeFileSync(dataFile, JSON.stringify({
      stampanti: {},
      materiali: {},
      impostazioni: {
        failureRate: 10,
        costoManodopera: 30,
        costoElettricita: 0.3,
        scontiQuantita: { 1: 0, 10: 5, 20: 10, 50: 15, 100: 20 }
      }
    }, null, 2));
  }
}

function readSettings() {
  ensureDataFile();
  const raw = fs.readFileSync(dataFile, 'utf-8');
  return JSON.parse(raw);
}

function writeSettings(obj) {
  ensureDataFile();
  fs.writeFileSync(dataFile, JSON.stringify(obj, null, 2));
}

app.get('/api/settings', (req, res) => {
  try {
    const data = readSettings();
    res.json(data);
  } catch (e) {
    res.status(500).json({ error: 'read_failed' });
  }
});

app.put('/api/settings', (req, res) => {
  try {
    const body = req.body || {};
    if (typeof body !== 'object') return res.status(400).json({ error: 'invalid_body' });
    // naive validation
    if (!('impostazioni' in body)) body.impostazioni = {};
    if (!('stampanti' in body)) body.stampanti = {};
    if (!('materiali' in body)) body.materiali = {};
    writeSettings(body);
    res.json({ ok: true });
  } catch (e) {
    res.status(500).json({ error: 'write_failed' });
  }
});

app.get('/', (req, res) => {
  res.send('3D Makes Settings API is running');
});

app.listen(PORT, () => {
  console.log(`Settings API listening on port ${PORT}`);
});

