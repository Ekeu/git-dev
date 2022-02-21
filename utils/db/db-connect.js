const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable.');
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const options = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(MONGODB_URI, options).then((mongoose) => {
      return mongoose;
    });
  }

  try {
    cached.conn = await cached.promise;
    console.info(
      `MongoDB Connected: ${cached.conn.connection.host}`.cyan.underline
    );
    return cached.conn;
  } catch (error) {
    console.error(
      `MongoDB Connection Error: ${error.message}`.red.underline.bold
    );
  }
}

module.exports = dbConnect;
