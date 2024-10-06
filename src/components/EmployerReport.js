// EmployerReport.js
import React, { useEffect, useState } from 'react';
import { generateEmployerReport } from '../services/FeedbackService';

export default function EmployerReport() {
  const [report, setReport] = useState(null);

  useEffect(() => {
    const fetchReport = async () => {
      const feedback = await generateEmployerReport('employerId');
      setReport(feedback);
    };

    fetchReport();
  }, []);

  return (
    <div>
      <h1>Employer Feedback</h1>
      {report && (
        <div>
          <p>Average Sentiment: {report.averageSentiment}</p>
          <p>Work Issues: {report.workIssues}</p>
          <p>Personal Issues: {report.personalIssues}</p>
        </div>
      )}
    </div>
  );
}
