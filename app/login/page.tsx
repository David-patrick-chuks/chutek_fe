"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('http://localhost:5555/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
        credentials: 'include', // Include cookies in the request
      });

      const data = await response.json();

      if (response.ok) {
        console.log('Login successful', data);
        router.push('/profile'); // Navigate to profile on success
      } else {
        console.log(data);
        throw new Error(data.message || 'Failed to log in');
      }
    } catch (error) {
      console.log(error);
      setError(error instanceof Error ? error.message : 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    // Redirect to your Google authentication route
    window.location.href = 'http://localhost:5555/api/auth/google'; // Redirects to backend route for Google OAuth
    // Adjust to match your backend route
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-2xl font-semibold text-center text-gray-800 mb-6">Sign In</h1>
        
        {error && <div className="text-red-500 mb-4 text-center">{error}</div>}
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 mt-4 text-white font-semibold rounded-lg ${loading ? 'bg-indigo-300' : 'bg-indigo-500 hover:bg-indigo-600'} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
          >
            {loading ? 'Logging in...' : 'Log In'}
          </button>
        </form>
        
        <button
          onClick={handleGoogleLogin}
          className="w-full py-2 mt-4 text-white font-semibold bg-red-500 hover:bg-red-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
        >
          Sign in with Google
        </button>

        <p className="mt-4 text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <a href="/signup" className="text-indigo-500 hover:underline">
            Create one
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
