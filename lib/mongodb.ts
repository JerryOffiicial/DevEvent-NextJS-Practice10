import mongoose from 'mongoose';

// Define the MongoDB URI with type safety
const MONGODB_URI = process.env.MONGODB_URI as string;

// Validate that the MongoDB URI is defined
if (!MONGODB_URI) {
  throw new Error(
    'Please define the MONGODB_URI environment variable inside .env.local'
  );
}

/**
 * Global type declaration for caching the MongoDB connection
 * This prevents TypeScript errors when accessing global.mongoose
 */
declare global {
  // eslint-disable-next-line no-var
  var mongoose: {
    conn: mongoose.Connection | null;
    promise: Promise<mongoose.Connection> | null;
  };
}

/**
 * Global cache for the MongoDB connection
 * In development, Next.js hot reloading can cause multiple connections
 * Caching prevents connection exhaustion by reusing existing connections
 */
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

/**
 * Establishes and maintains a MongoDB connection using Mongoose
 * 
 * @returns Promise<mongoose.Connection> - The active Mongoose connection
 * 
 * Features:
 * - Connection caching to prevent multiple instances
 * - Optimized buffer settings for better performance
 * - Type-safe implementation without 'any' types
 */
async function connectDB(): Promise<mongoose.Connection> {
  // Return existing connection if already established
  if (cached.conn) {
    return cached.conn;
  }

  // Reuse pending connection promise if one exists
  if (!cached.promise) {
    const options = {
      bufferCommands: false, // Disable Mongoose buffering for better error handling
    };

    // Create new connection promise
    cached.promise = mongoose.connect(MONGODB_URI, options).then((mongooseInstance) => {
      return mongooseInstance.connection;
    });
  }

  try {
    // Await the connection and cache it
    cached.conn = await cached.promise;
  } catch (error) {
    // Clear the promise on failure to allow retry
    cached.promise = null;
    throw error;
  }

  return cached.conn;
}

export default connectDB;
