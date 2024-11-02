// src/app/page.tsx
"use client"
import { useEffect } from 'react';

import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch('http://localhost:5555/api/auth/check-auth', {
          method: 'GET',
          credentials: 'include', // Make sure cookies are sent
        });

        if (response.ok) {
          const data = await response.json();
          console.log('User token validated:', data);
          // Navigate to profile if desired
          router.push('/profile');
        } else {
          console.log('User not authenticated');
        }
      } catch (error) {
        console.error('Error checking authentication:', error);
      }
    };

    checkAuth();
  }, []);

  return (
    <div className=' text-4xl font-bold text-purple-600'>
      Landing page 
      uer is not authenticated
    </div>
  );
}
