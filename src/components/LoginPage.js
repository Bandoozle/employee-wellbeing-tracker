import React, { useState } from 'react'; 
import { auth, signInWithEmailAndPassword } from '../firebase'; 
import { db } from '../firebase';  // Firebase Firestore
import { doc, getDoc } from 'firebase/firestore'; 
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Card, CardHeader, CardFooter } from '../components/ui/Card';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
export function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // Initialize the navigate hook

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    console.log("Login attempt:", email, password); // Log before login attempt

    try {
      console.log("Attempting signInWithEmailAndPassword...");
      
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log('User logged in:', userCredential.user);
      
      // Navigate to the mood selection page after successful login
      const userDoc = await getDoc(doc(db, 'users', userCredential.user.uid));
      // console.log("User UID:", auth.currentUser?.email);

      if (userDoc.exists()) {
        const userData = userDoc.data();
        const role = userData.employeeType; // 'employee' or 'employer'

        if (role === 'employer') {
          // Navigate to employer dashboard
          navigate('/add-employee');
        } else if (role === 'employee') {
          // Navigate to employee mood selection page
          navigate('/mood-selection');
        } else {
          // Handle cases where the role is undefined
          console.error('Role is undefined for user:', userCredential.user);
          setError('Role is not assigned. Please contact admin.');
        }
      } else {
        console.error('No user data found in Firestore for this user.');
        setError('User data not found. Please contact support.');
      }
    } catch (error) {
      console.error('Login failed:', error);
      setError('Failed to log in. Please check your email and password.');
    } finally {
      setLoading(false);
      // console.log("User UID:", auth.currentUser?.uid);
      console.log("Finished login attempt");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-center mb-4">
          </div>
          <h2 className="text-6xl font-edu text-center text-gray-900">CareConnect</h2>
          {error && <p className="text-red-600 text-center">{error}</p>}
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Email"
              id="email"
              type="email"
              placeholder="JohnDoe@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Input
              label="Password"
              id="password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required 
            />
            <Button type="submit" disabled={loading}>
              {loading ? 'Logging in...' : 'Log In'}
            </Button>
          </form>
        </CardHeader>
        <CardFooter>
          <a href="#" className="text-sm font-edu text-[#db6a59] hover:underline block text-center">
            Forgot your password?
          </a>
          <p className="text-sm font-edu text-gray-500 text-center">
            New employee? Contact your HR department to get started.
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}

export default LoginPage;
