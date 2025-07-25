import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';

import { toast } from 'react-hot-toast';
import LoadingSpinner from '../components/LoadingSpinner';
import BackToBtn from '../components/BackToBtn';
import { Trash2Icon } from 'lucide-react';
import useNotes from '../hooks/useNotes';
const NoteDetailPage = () => {
  //you can read data passed via navigation using useLocation state
  // const { state } = useLocation(null);
  // const note = state?.note;
  const { id } = useParams();
  const navigate = useNavigate();
  const { note, loadingNote, deleteNote, updateNote } = useNotes(id);
  const [newNote, setNewNote] = useState(null);
  const [saving, setSaving] = useState(false);
  console.log({ loadingNote });
  console.log({ note });
  useEffect(() => {
    if (note) {
      setNewNote({ ...note });
    }
  }, [note]);

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this note?')) return;
    try {
      await deleteNote(id);
      navigate('/');
    } catch (err) {
      toast.error('Failed to delete');
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newNote.title.trim() || !newNote.content.trim()) {
      toast.error('All fields are required');
      return;
    }

    setSaving(true);
    try {
      await updateNote(id, {
        title: newNote.title,
        content: newNote.content,
      });
      toast.success('Note updated');
      navigate('/');
    } catch (err) {
      console.log('Error in note details:', err);
      toast.error('Failed to update note');
    } finally {
      setSaving(false);
    }
  };

  if (loadingNote || newNote === null) {
    return <LoadingSpinner />;
  }
  if (!note) return <p>Note not found.</p>;
  return (
    <div className='min-h-screen bg-base-200'>
      <div className='container mx-auto px-4 py-8'>
        <div className='max-w-2xl mx-auto'>
          <div className='flex items-center justify-between mb-6'>
            <BackToBtn to='/' label='Back to Notes' />
            <button
              onClick={handleDelete}
              className='btn btn-error btn-outline'
            >
              <Trash2Icon className='h-5 w-5' />
              Delete Note
            </button>
          </div>
          <div className='card bg-base-100'>
            <div className='card-body'>
              <h2 className='card-title text-2xl mb-4'>Update Note</h2>
              <form onSubmit={handleSubmit}>
                <div className='form-control mb-4'>
                  <label htmlFor='title' className='label'>
                    <span className='label-text'>Title</span>
                  </label>
                  <input
                    type='text'
                    placeholder='Note Title'
                    className='input input-bordered'
                    value={newNote.title}
                    onChange={(e) =>
                      setNewNote({ ...newNote, title: e.target.value })
                    }
                  />
                </div>
                <div className='form-control mb-4'>
                  <label htmlFor='content' className='label'>
                    <span className='label-text'>Content</span>
                  </label>
                  <textarea
                    type='text'
                    placeholder='Note '
                    className='textarea textarea-bordered h-32'
                    value={newNote.content}
                    onChange={(e) =>
                      setNewNote({ ...newNote, content: e.target.value })
                    }
                  />
                </div>
                <div className='card-actions justify-end'>
                  <button
                    type='submit'
                    className='btn btn-primary '
                    disabled={saving}
                  >
                    {saving ? 'Saving...' : 'Save Changes'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoteDetailPage;
