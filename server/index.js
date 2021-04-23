import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

import studentRoutes from './routes/students.js'
import adminRoutes from './routes/admins.js'
import userRoutes from './routes/users.js'


dotenv.config();

const app = express();
const PORT = process.env.PORT|| 5000;


app.use(express.json({ limit: '30mb', extended: true }))
app.use(express.urlencoded({ limit: '30mb', extended: true }))
app.use(cors());



app.use('/students', studentRoutes)
app.use('/admins', adminRoutes)
app.use('/users', userRoutes)

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(PORT, () => console.log(`Server Running on Port: http://localhost:${PORT}`)))
  .then(mongoose.connection.once('open', () => {
    console.log('MongoDB database connection established successfully');
  }))
  .catch((error) => console.log(`${error} did not connect`));

mongoose.set('useFindAndModify', false);