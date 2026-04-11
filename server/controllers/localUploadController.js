import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
  console.log('Created uploads directory at:', uploadsDir);
}

// Local upload for testing
export const uploadLocal = async (req, res) => {
  try {
    console.log('Upload request received');
    
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    // Generate unique filename
    const timestamp = Date.now();
    const randomString = Math.random().toString(36).substring(7);
    const fileName = `${timestamp}-${randomString}-${req.file.originalname}`;
    const filePath = path.join(uploadsDir, fileName);
    
    console.log('Saving file to:', filePath);
    
    // Save file locally
    fs.writeFileSync(filePath, req.file.buffer);
    
    // Return FULL URL for the uploaded file
    const protocol = req.protocol;
    const host = req.get('host');
    const fullUrl = `${protocol}://${host}/uploads/${fileName}`;
    const relativeUrl = `/uploads/${fileName}`;
    
    console.log('File saved successfully, URL:', fullUrl);
    
    res.json({
      success: true,
      url: fullUrl, // Return full URL for validation
      relativeUrl: relativeUrl, // Also return relative URL
      fileName: fileName,
      message: 'File uploaded successfully'
    });
  } catch (error) {
    console.error('Local upload error:', error);
    res.status(500).json({ 
      message: error.message || 'Failed to upload locally',
      error: error.toString()
    });
  }
};

// Get all uploaded files
export const getUploadedFiles = (req, res) => {
  try {
    const files = fs.readdirSync(uploadsDir);
    const protocol = req.protocol;
    const host = req.get('host');
    
    const fileInfos = files.map(file => ({
      name: file,
      url: `${protocol}://${host}/uploads/${file}`,
      relativeUrl: `/uploads/${file}`,
      path: path.join(uploadsDir, file)
    }));
    res.json(fileInfos);
  } catch (error) {
    console.error('Error reading uploads:', error);
    res.status(500).json({ message: error.message });
  }
};

// Delete uploaded file
export const deleteLocalFile = (req, res) => {
  try {
    const { fileName } = req.params;
    const filePath = path.join(uploadsDir, fileName);
    
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      res.json({ message: 'File deleted successfully' });
    } else {
      res.status(404).json({ message: 'File not found' });
    }
  } catch (error) {
    console.error('Error deleting file:', error);
    res.status(500).json({ message: error.message });
  }
};