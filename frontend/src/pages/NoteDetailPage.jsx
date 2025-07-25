import { useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { toast } from 'react-hot-toast';

import useNotes from '../hooks/useNotes';

import LoadingSpinner from '../components/LoadingSpinner';
import NoteForm from '../components/NoteForm';
import BackToBtn from '../components/BackToBtn';

const NoteDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { note, loadingNote, updateNote, deleteNote } = useNotes(id);
  const [saving, setSaving] = useState(false);

  const handleUpdate = async (values) => {
    setSaving(true);
    try {
      await updateNote(id, values);
      toast.success('Note updated');
      navigate('/');
    } catch {
      toast.error('Failed to update note');
    } finally {
      setSaving(false);
    }
  };

  if (loadingNote) return <LoadingSpinner />;
  if (!note) return <p>Note not found.</p>;

  return (
    <>
      <div className='flex justify-between mb-6'>
        <BackToBtn to='/' label='Back to Notes' />
        <button
          onClick={async () => {
            if (window.confirm('Delete note?')) {
              await deleteNote(id);
              navigate('/');
            }
          }}
          className='btn btn-error btn-outline'
        >
          Delete
        </button>
      </div>
      <NoteForm
        initialValues={{ title: note.title, content: note.content }}
        onSubmit={handleUpdate}
        buttonText='Save Changes'
        submitting={saving}
        showBackButton={false}
      />
    </>
  );
};

export default NoteDetailPage;
