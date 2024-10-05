import React, { useState } from 'react';
import { auth, signInWithEmailAndPassword } from '../firebase';  // Import correctly
import { Button } from '../components/ui/Button'
import { Input } from '../components/ui/Input'
import { Card, CardHeader, CardFooter } from '../components/ui/Card'
import { HeartPulse } from "lucide-react"

export function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    console.log("Login attempt:", email, password); // Log before login attempt

    try {
      // Use the imported signInWithEmailAndPassword function
      console.log("Attempting signInWithEmailAndPassword...");
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log('User logged in:', userCredential.user);
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
          <h2 className="text-2xl font-bold text-center text-gray-900">Care Connect</h2>
      {error && <p>{error}</p>}
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
