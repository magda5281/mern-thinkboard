import mongoose from 'mongoose';

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Mongo db connected successfully');
  } catch (error) {
    console.error('Error connecting to MONGODB', error);
    process.exit(1); //exit with failure
  }
};

//add your database name to connection string notes_db
