// Impport Modules

import mongoose from 'mongoose';
import app from './app.js';

import { config } from 'dotenv';

config({ path: './config.env' });

const DB = process.env.DB_URL.replace('<password>', process.env.DB_PASSWORD);

mongoose.set('strictQuery', false);

// Connect to DB
mongoose
  .connect(DB)
  .then(() => {
    console.log(`DB Connected Successfully...`);

    // Port Number
    const port = process.env.PORT || 8080;

    // Starting Server
    app.listen(port, () => {
      console.log(`Server is running on port ${port}...`);
    });
  })
  .catch(err => {
    console.log(err);
  });
