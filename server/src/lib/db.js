import mongoose from 'mongoose';

export async function connectDB() {
  const uri = process.env.MONGODB_URI || 
              process.env.DATABASE_URL || 
              'mongodb://localhost:27017/localshop';
  
  if (!uri) {
    throw new Error('MONGODB_URI or DATABASE_URL must be set');
  }
  
  try {
    mongoose.set('strictQuery', true);
    
    const options = {
      dbName: process.env.MONGODB_DB || 'localshop',
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
      bufferCommands: false
    };

    // Production optimizations
    if (process.env.NODE_ENV === 'production') {
      options.retryWrites = true;
      options.w = 'majority';
    }

    await mongoose.connect(uri, options);
    
    console.log('✅ MongoDB connected successfully');
    console.log(`📍 Database: ${mongoose.connection.name}`);
    
  } catch (error) {
    console.error('❌ MongoDB connection error:', error.message);
    
    // Retry in production
    if (process.env.NODE_ENV === 'production') {
      console.log('🔄 Retrying connection in 5 seconds...');
      setTimeout(connectDB, 5000);
    } else {
      process.exit(1);
    }
  }
}

// Connection event handlers
mongoose.connection.on('error', (error) => {
  console.error('MongoDB error:', error);
});

mongoose.connection.on('disconnected', () => {
  console.log('📡 MongoDB disconnected');
});

// Graceful shutdown
process.on('SIGINT', async () => {
  try {
    await mongoose.connection.close();
    console.log('🔌 MongoDB connection closed');
    process.exit(0);
  } catch (error) {
    console.error('Error closing MongoDB connection:', error);
    process.exit(1);
  }
});
