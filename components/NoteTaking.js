// Importing necessary libraries and components
import React, { useState, useEffect } from 'react';
import { MdUpdate, MdDelete } from 'react-icons/md';
import toast from 'react-hot-toast';
import supabase from '@/lib/client';
import { useRouter } from 'next/router';

// NoteTaking component for managing user notes
const NoteTaking = ({ userId, supabaseData }) => {
  // State for handling new note input
  const [newNote, setNewNote] = useState('');

  // Router instance
  const router = useRouter();

  // Function to handle adding a new note
  const handleAddNote = async () => {
    if (newNote.trim() !== '') {
      try {
        // Insert new note into Supabase
        const { data, error } = await supabase
          .from('paperbot')
          .upsert([{ user_id: userId, text: newNote.trim() }]);

        if (error) {
          console.error('Error adding note to Supabase:', error.message);
          toast.error('Failed to add note.');
        } else {
          setNewNote('');
          toast.success('Note added successfully');
          router.reload(); // Reload the page after successful note addition
        }
      } catch (error) {
        console.error('Error adding note to Supabase:', error);
        toast.error('Failed to add note.');
      }
    } else {
      toast.error('Note content cannot be empty.');
    }
  };

  // Function to handle updating a note
  const handleUpdateNote = async (noteId, newText) => {
    try {
      // Update the note in Supabase
      const { data, error } = await supabase
        .from('paperbot')
        .update({ text: newText })
        .eq('id', noteId);

      if (error) {
        console.error('Error updating note in Supabase:', error.message);
        toast.error('Failed to update note.');
      } else {
        toast.success('Note updated successfully');
      }
    } catch (error) {
      console.error('Error updating note in Supabase:', error);
      toast.error('Failed to update note.');
    }
  };

  // Function to handle deleting a note
  const handleDeleteNote = async (noteId) => {
    try {
      // Delete the note in Supabase
      const { error } = await supabase.from('paperbot').delete().eq('id', noteId);

      if (error) {
        console.error('Error deleting note in Supabase:', error.message);
        toast.error('Failed to delete note.');
      } else {
        toast.success('Note deleted successfully');
        router.reload(); // Reload the page after successful note deletion
      }
    } catch (error) {
      console.error('Error deleting note in Supabase:', error);
      toast.error('Failed to delete note.');
    }
  };

  // JSX for rendering the NoteTaking component
  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4">Your Notes</h2>
      <div className="flex flex-col space-y-4">
        {/* Mapping through existing notes */}
        {supabaseData.map(({ id, text }, index) => (
          <div
            key={index}
            className="bg-purple-400 p-4 rounded-md shadow-md flex items-center justify-between"
          >
            <p className="text-white">{text}</p>
            <div className="flex items-center space-x-2">
              {/* Update note button */}
              <MdUpdate
                size={20}
                className="cursor-pointer text-white hover:text-green-300"
                onClick={() => {
                  const updatedText = prompt('Enter updated note:', text);
                  if (updatedText !== null) {
                    handleUpdateNote(id, updatedText);
                  }
                }}
              />
              {/* Delete note button */}
              <MdDelete
                size={20}
                className="cursor-pointer text-black hover:text-red-500"
                onClick={() => {
                  if (window.confirm('Are you sure you want to delete this note?')) {
                    handleDeleteNote(id);
                  }
                }}
              />
            </div>
          </div>
        ))}

        {/* Input for adding a new note */}
        <div className="flex items-center space-x-2">
          <input
            type="text"
            placeholder="Add a new note..."
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
            className="flex-grow px-4 py-2 border rounded-md focus:outline-none"
          />
          {/* Button to add a new note */}
          <button
            onClick={handleAddNote}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700 focus:outline-none"
          >
            Add Note
          </button>
        </div>
      </div>
    </div>
  );
};

// Exporting the NoteTaking component
export default NoteTaking;
