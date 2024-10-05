import React, { useState } from 'react';
import EmojiWheel from './MoodInput'; 
import { Button } from '../components/ui/Button'; 

const MoodLogPage = () => {
  const [selectedMood, setSelectedMood] = useState(null);
  const [insight, setInsight] = useState('');

  const handleMoodSelect = (mood) => {
    setSelectedMood(mood);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const logData = {
      mood: selectedMood.label,
      insight: insight,
    };
    console.log('Mood log:', logData);
  };

  return (
    <div className="mood-log-page">
      <EmojiWheel onMoodSelect={handleMoodSelect} />
      {selectedMood && (
        <form onSubmit={handleSubmit} className="insight-form">
          <h3>You feel {selectedMood.emoji} - {selectedMood.label}</h3>
          <textarea
            placeholder="Tell us more about why you feel this way..."
            value={insight}
            onChange={(e) => setInsight(e.target.value)}
            required
          />
          <Button type="submit">Submit Mood Log</Button>
        </form>
      )}
    </div>
  );
};

export default MoodLogPage; 
