import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import notesRoutes from './routes/notesRoutes.js';
import { connectDB } from './config/db.js';
import rateLimiter from './middleware/rateLimiter.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT;

// middleware
app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json()); //to access json data when you posting request
app.use(rateLimiter); //rate limit
app.use('/api/notes', notesRoutes);

//separate every service into its own folder/file
// app.use('/api/emails',emailsRoutes)
// app.use('/api/posts',postsRoutes)

//better practice is to connect database and then start listening on the port
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server started on PORT:${PORT} `);
  });
});
