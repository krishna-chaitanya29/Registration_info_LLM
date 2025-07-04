const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const User = require('./models/User');
const Feedback = require('./models/Feedback');
const Chat = require('./models/Chat');


const app = express();
const port = 5001;

app.use(bodyParser.json());
app.use(cors());

mongoose.connect('mongodb://localhost:27017/registration_info_llm', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB database.');
});

// --- Signup ---
app.post('/signup', async (req, res) => {
  try {
    const { username, password, email } = req.body;
    const user = new User({ username, password, email });
    await user.save();
    res.send('Signup successful');
  } catch (err) {
    console.error('Error signing up:', err);
    res.status(500).send('Error signing up');
  }
});

// --- Login ---
app.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username, password });
    if (user) {
      res.send(user);
    } else {
      res.status(401).send('Invalid credentials');
    }
  } catch (err) {
    console.error('Error logging in:', err);
    res.status(500).send('Error logging in');
  }
});

// --- Feedback ---
app.post('/feedback', async (req, res) => {
  try {
    const { userId, improvement, problem, rating } = req.body;
    const feedback = new Feedback({ userId, improvement, problem, rating });
    await feedback.save();
    res.send('Feedback submitted successfully');
  } catch (err) {
    console.error('Error submitting feedback:', err);
    res.status(500).send('Error submitting feedback');
  }
});

// --- Chat History ---
app.get('/chat-history/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const chats = await Chat.find({ userId }).sort({ createdAt: 1 });
    res.send(chats.map(c => ({ text: c.message, isUser: c.isUser })));
  } catch (err) {
    console.error('Error fetching chat history:', err);
    res.status(500).send('Error fetching chat history');
  }
});

app.post('/chat-history', async (req, res) => {
  try {
    const { userId, messages } = req.body;
    if (!userId || !Array.isArray(messages)) {
      return res.status(400).send('Invalid request');
    }
    await Chat.deleteMany({ userId });
    if (messages.length === 0) return res.send('Chat history updated');
    await Chat.insertMany(messages.map(m => ({ userId, message: m.text, isUser: !!m.isUser })));
    res.send('Chat history updated');
  } catch (err) {
    console.error('Error saving chat history:', err);
    res.status(500).send('Error saving chat history');
  }
});

// --- Registration info pages are static, handled by frontend, so no backend needed ---

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
