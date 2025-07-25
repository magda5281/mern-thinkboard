import mongoose from 'mongoose';
//1- create schema which is a blueprint for data stored in Mongo db
//2- model based on that schema
const noteSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
  },
  { timestamps: true } //mongo db gives by defult created at and updated at fields
);

//create a model based on schema
const Note = mongoose.model('Note', noteSchema);

export default Note;
