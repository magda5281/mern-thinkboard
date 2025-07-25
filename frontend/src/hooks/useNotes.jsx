import { useCallback, useState, useEffect } from 'react';
import api from '../lib/axios';
import { toast } from 'react-hot-toast';

const useNotes = (id = null) => {
  const [isRateLimited, setIsRateLimited] = useState(false);
  const [notes, setNotes] = useState([]);
  const [loading, setIsLoading] = useState(true);

  // 📄 single‑note state
  const [note, setNote] = useState(null);
  const [loadingNote, setLoadingNote] = useState(!!id);
  useEffect(() => {
    if (id) return;
    const fetchNotes = async () => {
      try {
        const res = await api('/notes');
        setNotes(res.data);
        setIsRateLimited(false);
      } catch (error) {
        if (error.response.status === 429) {
          setIsRateLimited(true);
        } else {
          toast.error('Failed to load notes');
        }
      } finally {
        setIsLoading(false);
      }
    };
    fetchNotes();
  }, [id]);

  useEffect(() => {
    if (!id) return;

    const load = async () => {
      setLoadingNote(true);

      // try cache first
      const cached = notes.find((n) => n._id === id);
      if (cached) {
        setNote(cached);
        setLoadingNote(false);
        return;
      }

      // otherwise hit the API
      try {
        const res = await api.get(`/notes/${id}`);
        setNote(res.data);
      } catch {
        toast.error('Failed to load that note');
      } finally {
        setLoadingNote(false);
      }
    };

    load();
  }, [id, notes]);
  const deleteNote = useCallback(async (id) => {
    //TODO:use hot react toast to warn aboput deletion

    try {
      await api.delete(`/notes/${id}`);
      setNotes((ns) => ns.filter((n) => n._id !== id));
      toast.success('Note deleted');
    } catch (err) {
      toast.error('Failed to delete');
    }
  }, []);

  const updateNote = useCallback(async (id, data) => {
    try {
      await api.put(`/notes/${id}`, {
        title: data.title,
        content: data.content,
      });
    } catch (error) {
      console.log('Update note error:', error);
      if (error.response.status === 429) {
        toast.error('Slow down! ', {
          duration: 4000,
          icon: '💀',
        });
      } else {
        toast.error('Failed to update note. Try again.');
      }
    }
  }, []);

  return {
    notes,
    note,
    loading,
    loadingNote,
    deleteNote,
    setNotes,
    isRateLimited,
    updateNote,
  };
};

export default useNotes;
