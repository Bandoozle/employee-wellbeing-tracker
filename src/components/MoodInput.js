import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '../components/ui/Button';  // Using the custom Button component
import { db, auth } from '../firebase';  // Import Firebase Firestore and Auth
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { Modal } from './Modal';  // Import the Modal component

import happyImage from '../components/icons/happy.png';
import neutralImage from '../components/icons/neutral.png';
import sadImage from '../components/icons/sad.png';
import stressedImage from '../components/icons/stressed.png';
import tiredImage from '../components/icons/tired.png';

export default function MoodInput() {
  const { mood } = useParams();
  const [insight, setInsight] = useState('');
  const [userDetails, setUserDetails] = useState(null); 
  const [isModalOpen, setIsModalOpen] = useState(false);  // Control modal state
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate(); // Use navigate to handle redirection

  // Get the current date in 'YYYY-MM-DD' format
  const getCurrentDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];  // Returns YYYY-MM-DD
  };

  // Mapping mood to images
  const moodImages = {
    happy: happyImage,
    neutral: neutralImage,
    sad: sadImage,
    stressed: stressedImage,
    tired: tiredImage,
  };

  useEffect(() => {
    const fetchUserDetails = async () => {
      const user = auth.currentUser;
      if (user) {
        const userDocRef = doc(db, 'users', user.uid);
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists()) {
          setUserDetails(userDoc.data());
        } else {
          console.error('No user data found');
        }
      } else {
        console.error('No authenticated user');
      }
    };

    fetchUserDetails();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = auth.currentUser;
  
    if (user && userDetails) {
      try {
        // Create a new document in Firestore to store the mood feedback
        const today = getCurrentDate();
        const docId = `${user.uid}_${today}`;
  
        const existingDoc = await getDoc(doc(db, 'moods', docId));
  
        if (existingDoc.exists()) {
          setErrorMessage('You have already submitted your mood today. Please try again tomorrow.');
          setIsModalOpen(true);  // Show modal when the user has already submitted
          return;
        }
  
        await setDoc(doc(db, 'moods', docId), {
          mood,
          insight,
          email: userDetails.email,  // Store email from userDetails
          department: userDetails.department,  // Store department
          employeeId: userDetails.employeeId,  // Store employee ID
          timestamp: new Date(),  // Store timestamp
        });
        console.log('Mood data saved successfully');
  
        // Navigate to the mood result page with the mood parameter (e.g., /mood-result/happy)
        navigate(`/mood-result/${mood.toLowerCase()}`);  // Include the mood in the route
      } catch (error) {
        setErrorMessage('There was an issue submitting your mood. Please try again.');
        setIsModalOpen(true);  // Show error modal
      }
    } else {
      setErrorMessage('User details not available. Please try again.');
      setIsModalOpen(true);  // Show error modal
    }
  };

  const handleCancel = () => {
    navigate('/mood-selection');
  };

  // Update the closeModal function to navigate to login
  const closeModal = () => {
    setIsModalOpen(false);
    navigate('/');  // Redirect to login when modal closes
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <motion.div
        className="w-full max-w-3xl"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-5xl font-edu mb-12 text-center">
          {`Tell me why you're feeling ${mood} today.`}
        </h1>

        <div className="flex items-center mb-6">
          <img
            src={moodImages[mood.toLowerCase()]}
            alt={mood}
            className="w-41 h-40 rounded-full mr-8 mb-20"
          />
          <form onSubmit={handleSubmit} className="flex-1">
            <textarea
              value={insight}
              onChange={(e) => setInsight(e.target.value)}
              className="w-full h-64 bg-white font-edu text-black rounded-2xl p-6 mb-4 resize-none text-xl"
              placeholder="Share your thoughts..."
            />
            <div className="flex justify-between gap-4 mt-4">
              <Button
                onClick={handleCancel}
                className="w-full bg-gray-500 hover:bg-gray-600 text-white"
              >
                Cancel
              </Button>
              <Button type="submit" className="w-full">
                Submit
              </Button>
            </div>
          </form>
        </div>
      </motion.div>

      {/* Modal for showing error or message */}
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}  // Close modal and go to login page
        title="Submission Error"
        message={errorMessage}
      />
    </div>
  );
}
