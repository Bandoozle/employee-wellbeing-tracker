// FeedbackService.js
import { doc, getDocs, collection } from 'firebase/firestore';
import { db } from '../firebase';

// Analyze the insight with AI for sentiment and problem type
export async function analyzeInsight(insight) {
  // Here you would use an NLP model to analyze the text (e.g., Google Cloud NLP, OpenAI)
  // Mockup: We'll return some dummy data for now
  const sentimentScore = insight.includes('bad') ? -1 : 1;  // Negative if "bad" is mentioned
  const problemType = insight.includes('work') ? 'work' : 'personal';

  return { sentimentScore, problemType };
}

// Generate an employer report based on employee moods
export async function generateEmployerReport(employerId) {
  const moodsRef = collection(db, 'moods');
  const querySnapshot = await getDocs(moodsRef);

  let totalSentiment = 0;
  let moodCount = 0;
  let workIssues = 0;
  let personalIssues = 0;

  querySnapshot.forEach((doc) => {
    const data = doc.data();
    totalSentiment += data.sentimentScore;
    moodCount++;
    if (data.problemType === 'work') workIssues++;
    if (data.problemType === 'personal') personalIssues++;
  });

  const averageSentiment = totalSentiment / moodCount;
  return {
    averageSentiment,
    workIssues,
    personalIssues,
  };
}
