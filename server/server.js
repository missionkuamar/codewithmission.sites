import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import { testCloudinaryConnection } from './config/cloudinary.js';
import { testS3Connection } from './config/aws.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create uploads directory
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
  console.log('Created uploads directory');
}

// Import routes
import connectDB from './config/db.js';
import projectRoutes from './routes/projectRoutes.js';
import authRoutes from './routes/authRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';
import { errorHandler } from './middleware/errorMiddleware.js';

// Connect to MongoDB
connectDB();

// Test cloud services
const testServices = async () => {
  console.log('\n📡 Testing Cloud Services...');
  
  // Test Cloudinary if configured
  if (process.env.CLOUDINARY_CLOUD_NAME) {
    await testCloudinaryConnection();
  } else {
    console.log('⚠️  Cloudinary not configured (skipping)');
  }
  
  // Test S3 if configured
  if (process.env.AWS_S3_BUCKET_NAME) {
    await testS3Connection();
  } else {
    console.log('⚠️  AWS S3 not configured (skipping)');
  }
  
  console.log('✅ Ready to accept uploads!\n');
};

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from uploads directory
app.use('/uploads', express.static(uploadsDir));

// Test endpoint
app.get('/api/test', (req, res) => {
  res.json({ 
    message: 'Server is running!', 
    timestamp: new Date().toISOString(),
    services: {
      cloudinary: !!process.env.CLOUDINARY_CLOUD_NAME,
      s3: !!process.env.AWS_S3_BUCKET_NAME,
      local: true
    }
  });
});

// Routes
app.use('/api/projects', projectRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/upload', uploadRoutes);

// Error handler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, async () => {
  console.log(`\n✅ Server running on port ${PORT}`);
  console.log(`📍 Test the server at: http://localhost:${PORT}/api/test`);
  console.log(`📍 Uploads directory: ${uploadsDir}`);
  await testServices();
});

server.on('error', (error) => {
  if (error.code === 'EADDRINUSE') {
    console.error(`❌ Port ${PORT} is already in use.`);
    process.exit(1);
  } else {
    console.error('Server error:', error);
  }
});