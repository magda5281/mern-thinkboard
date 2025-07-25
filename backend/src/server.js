import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';

import notesRoutes from './routes/notesRoutes.js';
import { connectDB } from './config/db.js';
import rateLimiter from './middleware/rateLimiter.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT;
const __dirname = path.resolve();
// middleware

if (process.env.NODE_ENV !== 'production') {
  app.use(cors({ origin: 'http://localhost:5173' }));
}
app.use(express.json()); //to access json data when you posting request
app.use(rateLimiter); //rate limit
app.use('/api/notes', notesRoutes);

//separate every service into its own folder/file
// app.use('/api/emails',emailsRoutes)
// app.use('/api/posts',postsRoutes)

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/dist')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend', 'dist', 'index.html'));
  });
}

//better practice is to connect database and then start listening on the port
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server started on PORT:${PORT} `);
  });
});
