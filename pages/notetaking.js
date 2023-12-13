// Importing necessary libraries and components
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import NoteTaking from '@/components/NoteTaking'; // Update the path to your NoteTaking component
import supabase from '@/lib/client';

// NoteTakingPage component for rendering the note-taking page
const NoteTakingPage = () => {
  // State to manage Supabase data and user ID
  const [supabaseData, setSupabaseData] = useState([]);
  const [userId, setUserId] = useState();
  const [nId, setnID] = useState();

  // Next.js router instance
  const router = useRouter();

  // Retrieve notes from the query parameter
  const notes = JSON.parse(router.query.notes || '[]');

  // Fetch user data from the API endpoint
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch('/api/example');
        if (response.ok) {
          const data = await response.json();
          setUserId(data.userId); // Assuming the response has a key 'userId'
        } else {
          console.error('Failed to fetch user data');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  // Fetch Supabase data for the user
  useEffect(() => {
    const fetchSupabaseData = async () => {
      try {
        const response = await fetch('/api/example');
        if (response.ok) {
          const data = await response.json();
          const userId = data.userId; // Assuming the response has a key 'userId'

          // Fetch Supabase data based on user ID
          const { data: supabaseData, error } = await supabase
            .from('paperbot')
            .select('text,id')
            .eq('user_id', userId);

          console.log(supabaseData);

          if (error) {
            console.error('Error fetching Supabase data:', error.message);
          } else {
            setSupabaseData(supabaseData || []);
          }
        } else {
          console.error('Failed to fetch user data');
        }
      } catch (error) {
        console.error('Error fetching Supabase data:', error);
      }
    };

    fetchSupabaseData();
  }, []);

  // JSX for rendering the NoteTakingPage component
  return (
    <div className="container mx-auto p-8">
      <h1 className="text-4xl font-bold mb-4">Your Note-Taking Page</h1>
      {/* Render NoteTaking component with user ID and Supabase data */}
      <NoteTaking userId={userId} supabaseData={supabaseData} />
    </div>
  );
};

// Exporting the NoteTakingPage component
export default NoteTakingPage;
