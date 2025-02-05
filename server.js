// server.js
import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';

const app = express();
app.use(cors());
app.use(express.json());

const NIM_API_URL = 'https://integrate.api.nvidia.com/v1';
const NIM_API_KEY = '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';

app.post('/api/chat', async (req, res) => {
  try {
    const response = await fetch(`${NIM_API_URL}/chat/completions`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${NIM_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: "deepseek-ai/deepseek-r1",
        messages: [{ role: "user", content: req.body.message }],
        temperature: 0.6,
        top_p: 0.7,
        max_tokens: 4096,
      })
    });

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ error: 'Failed to process request' });
  }
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Proxy server running on port ${PORT}`);
});