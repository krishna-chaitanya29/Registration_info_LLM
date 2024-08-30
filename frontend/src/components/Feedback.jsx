import React, { useState } from 'react';
import axios from 'axios';
import './Feedback.css';

const Feedback = ({ user }) => {
  const [improvement, setImprovement] = useState('');
  const [problem, setProblem] = useState('');
  const [rating, setRating] = useState('');

  const handleSubmit = async () => {
    try {
      await axios.post('http://localhost:5001/feedback', {
        userId: user.id,
        improvement,
        problem,
        rating,
      });
      alert('Feedback submitted successfully!');
    } catch (error) {
      console.error('Error submitting feedback:', error);
      alert('Error submitting feedback.');
    }
  };

  return (
    <div className="feedback-container">
      <h2>Feedback</h2>
      <textarea
        placeholder="What needs to be improved?"
        value={improvement}
        onChange={(e) => setImprovement(e.target.value)}
      />
      <textarea
        placeholder="What problem are you facing?"
        value={problem}
        onChange={(e) => setProblem(e.target.value)}
      />
      <input
        type="number"
        placeholder="Your rating"
        value={rating}
        onChange={(e) => setRating(e.target.value)}
      />
      <button onClick={handleSubmit}>Submit Feedback</button>
    </div>
  );
};

export default Feedback;
