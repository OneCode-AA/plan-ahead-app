'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { users } from '@/data/users';
import '../styles/globals.css';

export default function LoginPage() {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = () => {
    const user = users.find((u) => u.username === userName && u.password === password);

    if (user) {
      sessionStorage.setItem('userName', user.username);
      sessionStorage.setItem('storeId', user.storeId); // Store storeId for filtering products
      sessionStorage.setItem('storeName', user.name);
      router.push('/dashboard');
    } else {
      setError('Invalid credentials');
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Store Login</h1>
      {error && <p className="text-red-500">{error}</p>}
      <input
        type="text"
        placeholder="Username"
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
