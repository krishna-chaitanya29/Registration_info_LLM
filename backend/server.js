const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql2'); 


const app = express();
const port = 5001;

app.use(bodyParser.json());
app.use(cors());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Kc.@mac1',
  database: 'registration_info_llm'
});

db.connect((err) => {
  if (err) {
    console.error('Database connection failed:', err);
    return;
  }
  console.log('Connected to MySQL database.');
});

app.post('/signup', (req, res) => {
  const { username, password, email } = req.body;
  const query = 'INSERT INTO users (username, password, email) VALUES (?, ?, ?)';
  db.query(query, [username, password, email], (err, results) => {
    if (err) {
      console.error('Error signing up:', err);
      res.status(500).send('Error signing up');
      return;
    }
    res.send('Signup successful');
  });
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const query = 'SELECT * FROM users WHERE username = ? AND password = ?';
  db.query(query, [username, password], (err, results) => {
    if (err) {
      console.error('Error logging in:', err);
      res.status(500).send('Error logging in');
      return;
    }
    if (results.length > 0) {
      res.send(results[0]);
    } else {
      res.status(401).send('Invalid credentials');
    }
  });
});

app.post('/feedback', (req, res) => {
  const { userId, improvement, problem, rating } = req.body;
  const query = 'INSERT INTO user_feedback (user_id, improvement, problem, rating) VALUES (?, ?, ?, ?)';
  db.query(query, [userId, improvement, problem, rating], (err, results) => {
    if (err) {
      console.error('Error submitting feedback:', err);
      res.status(500).send('Error submitting feedback');
      return;
    }
    res.send('Feedback submitted successfully');
  });
});

app.post('/saveChat', (req, res) => {
  const { userId, message, isUser } = req.body;
  const query = 'INSERT INTO chat_history (user_id, message, is_user) VALUES (?, ?, ?)';
  db.query(query, [userId, message, isUser], (err, results) => {
    if (err) {
      console.error('Error saving chat:', err);
      res.status(500).send('Error saving chat');
      return;
    }
    res.send('Chat saved successfully');
  });
});

app.get('/getChatHistory', (req, res) => {
  const { userId } = req.query;
  const query = 'SELECT * FROM chat_history WHERE user_id = ?';
  db.query(query, [userId], (err, results) => {
    if (err) {
      console.error('Error fetching chat history:', err);
      res.status(500).send('Error fetching chat history');
      return;
    }
    res.send(results);
  });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
