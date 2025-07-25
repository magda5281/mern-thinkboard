import Note from '../models/Note.js';

export async function getAllNotes(req, res) {
  //TODO: implement backend sort
  try {
    const sortBy = req.query.sortBy || 'createdAt';
    const order = req.query.order === 'asc' ? 1 : -1; // default to newest first
    const allowedSorts = ['createdAt'];
    if (!allowedSorts.includes(sortBy)) {
      return res.status(400).json({ message: 'Invalid sort field' });
    }
    const notes = await Note.find().sort({ [sortBy]: order }); //newest first
    res.status(200).json(notes);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
    console.error('Error in getAllNotes controller:', error);
  }
}
export async function getNoteById(req, res) {
  try {
    const note = await Note.findById(req.params.id);
    res.status(200).json(note);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
    console.error('Error in getNoteById controller:', error);
  }
}

export async function createNote(req, res) {
  try {
    const { title, content } = req.body;

    const newNote = new Note({ title, content });
    const savedNote = await newNote.save();
    res.status(201).json(savedNote);
  } catch (error) {
    console.error('Error in create note controller', error);
    res.status(500).json({ message: 'internal server error' });
  }
}

export async function updateNote(req, res) {
  try {
    const { title, content } = req.body;
    const note = await Note.findByIdAndUpdate(
      req.params.id,
      { title, content },
      { new: true }
    );
    if (!note) return res.status(404).json({ message: 'Note not found' });
    res.status(200).json(note);
  } catch (error) {
    console.error('Error in update note controller', error);
    res
      .status(500)
      .json({ message: 'Error in update note controller:', error });
  }
}

export async function deleteNote(req, res) {
  try {
    const note = await Note.findByIdAndDelete(req.params.id);
    if (!note) {
      res.status(404).json({ message: 'Note not found' });
    }
    res.status(200).json({ message: 'Note deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error in delete controller', error });
  }
}
