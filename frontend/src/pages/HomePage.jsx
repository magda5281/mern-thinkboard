import Navbar from '../components/Navbar';
import NoteCard from '../components/NoteCard';
import NotesNotFound from '../components/NotesNotFound';
import RateLimitedUI from '../components/RateLimitedUI';
import LoadingSpinner from '../components/LoadingSpinner';

import useNotes from '../hooks/useNotes';

const HomePage = () => {
  const { isRateLimited, loading, notes, deleteNote } = useNotes();

  return (
    <main className='min-h-screen'>
      <Navbar />
      {isRateLimited && <RateLimitedUI />}
      <section className='max-w-7xl mx-auto p-4 mt-6'>
        {loading && <LoadingSpinner />}
        {notes.length === 0 && !isRateLimited && <NotesNotFound />}
        {notes.length > 0 && !isRateLimited && (
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3'>
            {notes.map((note) => (
              <NoteCard key={note._id} note={note} onDelete={deleteNote} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
};

export default HomePage;
