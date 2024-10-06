import React, { useState } from 'react'; 
import { auth, signInWithEmailAndPassword } from '../firebase';  
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Card, CardHeader, CardFooter } from '../components/ui/Card';
import { HeartPulse } from "lucide-react";
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
      navigate('/mood-selection'); // Redirects the user
    } catch (error) {
      console.error('Login failed:', error);
      setError('Failed to log in. Please check your email and password.');
    } finally {
      setLoading(false);
      console.log("Finished login attempt");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-center mb-4">
            <HeartPulse className="h-12 w-12 text-blue-500" />
          </div>
          <h2 className="text-6xl font-bold text-center text-gray-900">Care Connect</h2>
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
          <a href="#" className="text-sm text-blue-600 hover:underline block text-center">
            Forgot your password?
          </a>
          <p className="text-sm text-gray-500 text-center">
            New employee? Contact your HR department to get started.
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}

export default LoginPage;
