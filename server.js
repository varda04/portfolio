import express from 'express';  // or 'const express = require("express");' if using CJS
import path from 'path';
import { getMistralReply } from './mistral.js';

const app = express();
app.use(express.json());

// Serve static frontend
app.use(express.static(path.join(__dirname, 'public'))); // put your HTML/CSS/JS in 'public/'

// API route
app.post('/api/chat', async (req, res) => {
  try {
    const { message } = req.body;
    const reply = await getMistralReply(message);
    res.json({ reply });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Something went wrong' });
  }
});

app.listen(3000, () => console.log('Server running on http://localhost:3000'));