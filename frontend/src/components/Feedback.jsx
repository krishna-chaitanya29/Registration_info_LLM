import axios from 'axios';
import { useState } from 'react';
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
      <h2 className="feedback-title">We Value Your Feedback</h2>
      <div className="feedback-form">
        <label className="feedback-label">What needs to be improved?</label>
        <textarea
          className="feedback-textarea"
          placeholder="Share your suggestions..."
          value={improvement}
          onChange={(e) => setImprovement(e.target.value)}
        />
        <label className="feedback-label">What problem are you facing?</label>
        <textarea
          className="feedback-textarea"
          placeholder="Describe any issues..."
          value={problem}
          onChange={(e) => setProblem(e.target.value)}
        />
        <label className="feedback-label">Your rating</label>
        <input
          className="feedback-input"
          type="number"
          min="1"
          max="5"
          placeholder="Rate us (1-5)"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
        />
        <button className="feedback-submit" onClick={handleSubmit}>Submit Feedback</button>
      </div>
    </div>
  );
};

export default Feedback;
