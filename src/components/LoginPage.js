import React, { useState } from 'react'
import { HeartPulse } from "lucide-react"
import { Button } from '../components/ui/Button'
import { Input } from '../components/ui/Input'
import { Card, CardHeader, CardFooter } from '../components/ui/Card'

export function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    // TODO: Implement login logic here
    console.log('Login attempt with:', email, password)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-center mb-4">
            <HeartPulse className="h-12 w-12 text-blue-500" />
          </div>
          <h2 className="text-2xl font-bold text-center text-gray-900">Care Connect</h2>
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <Button type="submit">Log in</Button>
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
  )
}