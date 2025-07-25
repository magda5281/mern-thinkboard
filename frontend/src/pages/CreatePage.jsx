import { useState } from 'react';
import { useNavigate } from 'react-router';

import api from '../lib/axios';
import { toast } from 'react-hot-toast';

import NoteForm from '../components/NoteForm';

const CreatePage = () => {
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);

  const handleCreate = async ({ title, content }) => {
    setSubmitting(true);
    try {
      await api.post('/notes', { title, content });
      toast.success('Note created successfully');
      navigate('/');
    } catch (err) {
      toast.error(
        err.response?.status === 429
          ? 'Slow down! You’re creating notes too fast!'
          : 'Failed to create note. Try again.'
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <NoteForm
      initialValues={{ title: '', content: '' }}
      onSubmit={handleCreate}
      buttonText='Create Note'
      submitting={submitting}
    />
  );
};

export default CreatePage;
