import { useState } from 'react';
import { toast } from 'react-hot-toast';
import BackToBtn from '../components/BackToBtn';

/**
 * Reusable form for creating/updating notes
 * @param {{
 *   initialValues: { title: string; content: string; },
 *   onSubmit: (values: { title: string; content: string; }) => Promise<void>,
 *   buttonText: string;
 *   submitting: boolean;
 *   showBackButton?: boolean;
 * }} props
 */
const NoteForm = ({
  initialValues,
  onSubmit,
  buttonText,
  submitting,
  showBackButton = true,
}) => {
  const [values, setValues] = useState({ ...initialValues });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((v) => ({ ...v, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!values.title.trim() || !values.content.trim()) {
      toast.error('All fields are required');
      return;
    }
    await onSubmit(values);
  };

  return (
    <section className='min-h-screen bg-base-200'>
      <div className='container mx-auto px-4 py-8'>
        <div className='max-w-2xl mx-auto'>
          {showBackButton && <BackToBtn to='/' label='Back to Notes' />}
          <div className='card bg-base-100'>
            <div className='card-body'>
              <form onSubmit={handleSubmit}>
                <div className='form-control mb-4'>
                  <label htmlFor='title' className='label'>
                    <span className='label-text'>Title</span>
                  </label>
                  <input
                    id='title'
                    name='title'
                    type='text'
                    placeholder='Note Title'
                    className='input input-bordered'
                    value={values.title}
                    onChange={handleChange}
                  />
                </div>
                <div className='form-control mb-4'>
                  <label htmlFor='content' className='label'>
                    <span className='label-text'>Content</span>
                  </label>
                  <textarea
                    id='content'
                    name='content'
                    placeholder='Note Content'
                    className='textarea textarea-bordered h-32'
                    value={values.content}
                    onChange={handleChange}
                  />
                </div>
                <div className='card-actions justify-end'>
                  <button
                    type='submit'
                    className='btn btn-primary'
                    disabled={submitting}
                  >
                    {submitting ? 'Submitting...' : buttonText}
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

export default NoteForm;
