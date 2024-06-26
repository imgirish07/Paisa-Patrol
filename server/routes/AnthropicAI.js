const express = require('express');
const { Anthropic } = require('@anthropic-ai/sdk');

const router = express.Router();

const anthropic = new Anthropic({
  apiKey: process.env['ANTHROPIC_API_KEY'],
});

router.post("/anthropic", async (req, res) => {
  const { prompt } = req.body;
  try {
    const params = {
      max_tokens: 50,
      temperature: 0,
      top_p: 0,
      messages: [{ role: 'user', content: prompt }],
      model: 'claude-3-opus-20240229',
    };
    const message = await anthropic.messages.create(params);
    //console.log(message.content );
    res.json({ completion: message.content });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;