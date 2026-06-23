import {useEffect, useState} from 'react'
import Navbar from '../components/Navbar'
import RateLimitedUI from '../components/RateLimitedUI'
import api from '../lib/axios'
import {toast} from 'react-hot-toast'
import NoteCard from '../components/NoteCard'
import NotesNoteFound from '../components/NotesNotFound'
const HomePage = () => {
  const [isRateLimited, setIsRateLimited] = useState(false)
  const [notes, setNotes] = useState([])
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    const fetchNotes=async() =>{
      try {
        // const res = await fetch("http://localhost:5001/api/notes")
        // const data = await res.json() or
        const res = await api.get("/notes");//using axios instance from lib/axios.js we replace axios.get("http://localhost:5001/api/notes")
        setNotes(res.data.notes)//object destructuring
        // console.log(res.data);
        setIsRateLimited(false)
        // console.log("res.data:", res.data);
        // console.log("isArray:", Array.isArray(res.data)); //always check if data is array or object

      } catch (error) {
        console.log("Error fetching notes:");
        console.log(error);
        if (error.response?.status === 429){
          setIsRateLimited(true)
        }else{
          toast.error("Failed to load notes");
        }
      }finally{
        setLoading(false)
      }
    }
     fetchNotes();
    },[]);
    // console.log("Notes:", notes);
  return (
    <div className="min-h-screen">
      <Navbar />
      {isRateLimited && <RateLimitedUI />}
      <div className="max-w-7xl mx-auto p-4 mt-6">
        {loading && <div className="text-center text-primary py-4">Loading notes...</div>}
        {notes.length === 0 && !isRateLimited && <NotesNoteFound/>}
        {notes.length > 0 && !isRateLimited && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {notes.map((note) => (
              // <div>
              //   {note.title} | {note.content}
              // </div>
              <NoteCard key={note._id} note={note} setNotes={setNotes}/>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage
