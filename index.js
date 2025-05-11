const express = require('express');
const app = express();
app.use(express.json());

const VERIFY_TOKEN = process.env.VERIFY_TOKEN || "mytoken123";

app.get('/webhook', (req, res) => {
  const mode = req.query['hub.mode'];
  const token = req.query['hub.verify_token'];
  const challenge = req.query['hub.challenge'];
  if (mode === 'subscribe' && token === VERIFY_TOKEN) {
    return res.status(200).send(challenge);
  }
  res.sendStatus(403);
});

app.post('/webhook', (req, res) => {
  const msg = req.body.entry?.[0]?.changes?.[0]?.value?.messages?.[0];
  if (msg) {
    console.log("From:", msg.from);
    console.log("Text:", msg.text?.body);
  }
  res.sendStatus(200);
});

app.listen(3000, () => console.log("Running on 3000"));
