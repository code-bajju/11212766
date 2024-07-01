"use client"
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const NumbersPage: React.FC = () => {
  const [numbers, setNumbers] = useState<{ category: string; numbers: number[] }[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [accessToken, setAccessToken] = useState<string>('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Step 1: Authenticate and obtain access token
        const authResponse = await axios.post('http://20.244.56.144/test/auth', {
          companyName: 'goMart',
          clientID: '203ee454-2d2b-4f95-a014-6e9ed5c6660d',
          clientSecret: 'rBzOmqkATvkhjhGp',
          ownerName: 'Bajrang',
          ownerEmail: 'bajranggour666@gmail.com',
          rollNo: '11212766'
        });

        const token = authResponse.data.access_token;
        setAccessToken(token);

        // Step 2: Fetch numbers from different endpoints
        const fetchNumbers = async (endpoint: string, category: string) => {
          try {
            const response = await axios.get(`http://20.244.56.144/${endpoint}`, {
              headers: {
                Authorization: `Bearer ${token}`
              }
            });
            return { category, numbers: response.data.numbers };
          } catch (error) {
            throw new Error(`Error fetching numbers from ${endpoint}:`);
          }
        };

        const primes = await fetchNumbers('test/primes', 'Primes');
        const fibo = await fetchNumbers('test/fibo', 'Fibonacci');
        const even = await fetchNumbers('test/even', 'Even Numbers');

        const allNumbers = [ fibo, even,primes];

        setNumbers(allNumbers);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Error fetching data: ');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div className="p-4">Loading...</div>;
  }

  if (error) {
    return <div className="p-4">Error: {error}</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4">Numbers</h1>
      <div className="grid grid-cols-2 gap-4">
        {numbers.map(({ category, numbers }, index) => (
          <div key={index} className="border border-gray-200 p-4 rounded shadow">
            <h2 className="text-xl font-semibold mb-2">{category}</h2>
            <ul>
              {numbers.map((number, numberIndex) => (
                <li key={numberIndex} className="bg-gray-100 rounded p-2 shadow">
                  {number}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NumbersPage;
