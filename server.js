import express from 'express';
import cors from 'cors';
import OpenAI from 'openai';

const app = express();
app.use(cors());
app.use(express.json());

const openai = new OpenAI({
  apiKey: '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',
  baseURL: 'https://integrate.api.nvidia.com/v1'
});

app.post('/api/chat', async (req, res) => {
  try {
    const completion = await openai.chat.completions.create({
      model: "meta/llama-3.1-8b-instruct",
      messages: [{ role: "user", content: req.body.message }],
      temperature: 0.2,
      top_p: 0.7,
      max_tokens: 1024,
      stream: false
    });
    
    res.json(completion);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Failed to process request' });
  }
});

app.listen(3001, () => console.log('Server running on port 3001'));