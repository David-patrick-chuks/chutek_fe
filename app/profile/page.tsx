"use client"
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';


function Page() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null); // State to store user details
  const [error, setError] = useState('');
  const [userId, setUserId]= useState("") // State to store error messages

  // Function to fetch user profile details
  const fetchUserProfile = async () => {
    try {
      const response = await fetch(`http://localhost:5555/api/users/profile?id=${'6724770bd5b8b14b6afc8f88'}`, {
        method: 'GET',
        credentials: 'include', // Include cookies in the request
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data); // Set user details in state
      } else {
        const data = await response.json();
        setError(data.message || 'Failed to fetch profile');
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
      setError('Something went wrong while fetching your profile.');
    }
  };

  const handleLogout = async () => {
    try {
      const response = await fetch('http://localhost:5555/api/auth/logout', {
        method: 'POST',
        credentials: 'include', // Include cookies in the request
      });

      if (response.ok) {
        console.log('Logout successful');
        // Redirect to the login page after successful logout
        router.push('/');
      } else {
        const data = await response.json();
        console.error('Logout failed:', data.message || 'Failed to log out');
      }
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  // Fetch user profile when the component mounts
  useEffect(() => {
      fetchUserProfile();

  }, []);

  return (
    <div className='p-6'>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      {user ? (
        <div className='text-3xl text-green-600 font-bold'>
          <p>Welcome to your profile, you are verified.</p>
          <div className="mt-4">
            <img src={user.picture} alt="Profile" className="rounded-full w-24 h-24" />
            <h2 className="mt-2 text-xl font-semibold">{user.name}</h2>
            <p className="text-gray-700">{user.email}</p>
          </div>
          <button
            onClick={handleLogout}
            className="mt-4 py-2 px-4 bg-red-600 text-white rounded hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            Log Out
          </button>
        </div>
      ) : (
        <div className="text-gray-600">Loading profile...</div>
      )}
    </div>
  );
}

export default Page;
