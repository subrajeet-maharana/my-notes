import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CardComponent from '../components/CardComponent';

interface Note {
  id: number;
  title: string;
  content: string;
}

export default function Home() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';
  const [notes, setnotes] = useState<Note[]>([]); 
  const [newnote, setNewnote] = useState({ title: '', content: '' }); 
  const [updatenote, setUpdatenote] = useState({ id: '', title: '', content: '' });

  // Fetch notes
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${apiUrl}/notes`);
        setnotes(response.data.reverse());
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  // Create a note
  const createnote = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${apiUrl}/notes`, newnote);
      setnotes([response.data, ...notes]);
      setNewnote({ title: '', content: '' });
    } catch (error) {
      console.error('Error creating note:', error);
    }
  };

  // Update a note
  const handleUpdatenote = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await axios.put(`${apiUrl}/notes/${updatenote.id}`, { title: updatenote.title, content: updatenote.content });
      setUpdatenote({ id: '', title: '', content: '' });
      setnotes(
        notes.map((note) => {
          if (note.id === parseInt(updatenote.id)) {
            return { ...note, title: updatenote.title, content: updatenote.content };
          }
          return note;
        })
      );
    } catch (error) {
      console.error('Error updating note:', error);
    }
  };

  // Delete a note
  const deletenote = async (noteId: number) => {
    try {
      await axios.delete(`${apiUrl}/notes/${noteId}`);
      setnotes(notes.filter((note) => note.id !== noteId));
    } catch (error) {
      console.error('Error deleting note:', error);
    }
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100">
      <div className="space-y-4 w-full max-w-2xl">
        <h1 className="text-2xl font-bold text-gray-800 text-center">My Notes</h1>

        {/* Form to add new note */}
        <form onSubmit={createnote} className="p-4 bg-blue-100 rounded shadow">
          <input
            placeholder="Name"
            value={newnote.title}
            onChange={(e) => setNewnote({ ...newnote, title: e.target.value })}
            className="mb-2 w-full p-2 border border-gray-300 rounded"
          />

          <input
            placeholder="description"
            value={newnote.content}
            onChange={(e) => setNewnote({ ...newnote, content: e.target.value })}
            className="mb-2 w-full p-2 border border-gray-300 rounded"
          />
          <button type="submit" className="w-full p-2 text-white bg-blue-500 rounded hover:bg-blue-600">
            Add Note
          </button>
        </form>

        {/* Form to update note */}
        <form onSubmit={handleUpdatenote} className="p-4 bg-green-100 rounded shadow">
          <input
            placeholder="Note ID"
            value={updatenote.id}
            onChange={(e) => setUpdatenote({ ...updatenote, id: e.target.value })}
            className="mb-2 w-full p-2 border border-gray-300 rounded"
          />
          <input
            placeholder="New Name"
            value={updatenote.title}
            onChange={(e) => setUpdatenote({ ...updatenote, title: e.target.value })}
            className="mb-2 w-full p-2 border border-gray-300 rounded"
          />
          <input
            placeholder="New description"
            value={updatenote.content}
            onChange={(e) => setUpdatenote({ ...updatenote, content: e.target.value })}
            className="mb-2 w-full p-2 border border-gray-300 rounded"
          />
          <button type="submit" className="w-full p-2 text-white bg-green-500 rounded hover:bg-green-600">
            Update Note
          </button>
        </form>

        {/* Display notes */}
        <div className="space-y-2">
          {notes.map((note) => (
            <div key={note.id} className="flex items-center justify-between bg-white p-4 rounded-lg shadow">
              <CardComponent card={note} />
              <button onClick={() => deletenote(note.id)} className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded">
                Delete Note
              </button>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}