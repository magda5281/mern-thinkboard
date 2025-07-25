import { useState } from 'react';
import { useNavigate } from 'react-router';

import BackToBtn from '../components/BackToBtn';
import { toast } from 'react-hot-toast';
import api from '../lib/axios';

const CreatePage = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      toast.error('All fields are required');
      return;
    }
    setSubmitting(true);
    try {
      await api.post('/notes', {
        title,
        content,
      });
      toast.success('Note created successfully');
      navigate('/');
    } catch (error) {
      console.log('Create note error:', error);
      if (error.response.status === 429) {
        toast.error('Slow down! you creating notes too fast!', {
          duration: 4000,
          icon: '💀',
        });
      } else {
        toast.error('Failed to create note. Try again.');
      }
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <section className='min-h-screen bg-base-200'>
      <div className='container mx-auto px-4 py-8'>
        <div className='max-w-2xl mx-auto'>
          <BackToBtn to='/' label='Back to Notes' />
          <div className='card bg-base-100'>
            <div className='card-body'>
              <h2 className='card-title text-2xl mb-4'>Create New Note</h2>
              <form onSubmit={handleSubmit}>
                <div className='form-control mb-4'>
                  <label htmlFor='title' className='label'>
                    <span className='label-text'>Title</span>
                  </label>
                  <input
                    type='text'
                    placeholder='Note Title'
                    className='input input-bordered'
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
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
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                  />
                </div>
                <div className='card-actions justify-end'>
                  <button
                    type='submit'
                    className='btn btn-primary '
                    disabled={submitting}
                  >
                    {submitting ? 'Creating' : 'Create Note'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CreatePage;
