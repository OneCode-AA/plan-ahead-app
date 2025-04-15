'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import '../styles/globals.css';

export default function LoginPage() {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async () => {
    try {
      const res = await fetch('/api/users');
      const users = await res.json();

      const user = users.find(
        (u) => u.id === userName && u.password === password
      );

      if (user) {
        sessionStorage.setItem('userName', user.name);
        sessionStorage.setItem('storeId', user.id);
        sessionStorage.setItem('storeName', user.name);

        router.push('/dashboard');
      } else {
        setError('Invalid credentials');
      }
    } catch (err) {
      setError('Error logging in. Please try again.');
      console.error(err);
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Store Login</h1>
      {error && <p className="text-red-500">{error}</p>}
      <input
        type="text"
        placeholder="Store ID"
        className="border p-2 w-full mb-2"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        className="border p-2 w-full mb-2"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
        onClick={handleLogin}
        className="bg-blue-500 text-white p-2 w-full rounded"
      >
        Login
      </button>
    </div>
  );
}
