import mongoose from 'mongoose';
import { MONGO_URL } from '.';

mongoose.connect(MONGO_URL);

const db = mongoose.connection;

db.on('error',console.error.bind(console,"Something went wrong in database connection"));

db.once('open',() => {
    console.log("Database Connected")
})

export default db;