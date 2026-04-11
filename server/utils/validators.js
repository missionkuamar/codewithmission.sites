import { body, param, query, validationResult } from 'express-validator';

// Custom URL validator that accepts localhost
const isValidUrl = (url) => {
  try {
    new URL(url);
    // Accept localhost URLs for development
    if (url.includes('localhost') || url.includes('127.0.0.1')) {
      return true;
    }
    // Also accept regular URLs
    return url.startsWith('http://') || url.startsWith('https://');
  } catch {
    return false;
  }
};
// User validation rules
export const validateUserRegistration = [
  body('name')
    .trim()
    .notEmpty().withMessage('Name is required')
    .isLength({ min: 2, max: 50 }).withMessage('Name must be between 2 and 50 characters')
    .matches(/^[a-zA-Z\s]+$/).withMessage('Name can only contain letters and spaces'),
  
  body('email')
    .trim()
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Please provide a valid email')
    .normalizeEmail(),
  
  body('password')
    .notEmpty().withMessage('Password is required')
    .isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/).withMessage('Password must contain at least one uppercase letter, one lowercase letter, and one number'),
];

export const validateUserLogin = [
  body('email')
    .trim()
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Please provide a valid email')
    .normalizeEmail(),
  
  body('password')
    .notEmpty().withMessage('Password is required'),
];

// Project validation rules
export const validateProject = [
  body('title')
    .trim()
    .notEmpty().withMessage('Project title is required')
    .isLength({ min: 3, max: 100 }).withMessage('Title must be between 3 and 100 characters'),
  
  body('description')
    .trim()
    .notEmpty().withMessage('Description is required')
    .isLength({ min: 10, max: 1000 }).withMessage('Description must be between 10 and 1000 characters'),
  
  body('githubUrl')
    .trim()
    .notEmpty().withMessage('GitHub URL is required')
    .custom((value) => {
      if (!isValidUrl(value)) {
        throw new Error('Please provide a valid URL');
      }
      return true;
    }),
  
  body('liveUrl')
    .trim()
    .notEmpty().withMessage('Live demo URL is required')
    .custom((value) => {
      if (!isValidUrl(value)) {
        throw new Error('Please provide a valid URL');
      }
      return true;
    }),
  
  body('tags')
    .optional()
    .isArray().withMessage('Tags must be an array')
    .custom((tags) => {
      if (tags && tags.length > 10) {
        throw new Error('Maximum 10 tags allowed');
      }
      return true;
    }),
  
  body('type')
    .trim()
    .notEmpty().withMessage('Project type is required')
    .isIn(['Frontend', 'Fullstack', 'AI', 'Backend', 'Mobile', 'Other']).withMessage('Invalid project type'),
  
  body('coverImage')
    .trim()
    .notEmpty().withMessage('Cover image is required')
    .custom((value) => {
      // Accept localhost URLs, local paths, or any URL
      if (value.startsWith('/uploads/') || 
          value.includes('localhost') || 
          value.startsWith('http://') || 
          value.startsWith('https://')) {
        return true;
      }
      throw new Error('Please provide a valid image URL');
    }),
  
  body('images')
    .optional()
    .isArray().withMessage('Images must be an array')
    .custom((images) => {
      if (images && images.length > 10) {
        throw new Error('Maximum 10 images allowed');
      }
      return true;
    }),
];


// Project update validation (partial updates allowed)
export const validateProjectUpdate = [
  body('title')
    .optional()
    .trim()
    .isLength({ min: 3, max: 100 }).withMessage('Title must be between 3 and 100 characters'),
  
  body('description')
    .optional()
    .trim()
    .isLength({ min: 10, max: 1000 }).withMessage('Description must be between 10 and 1000 characters'),
  
  body('githubUrl')
    .optional()
    .trim()
    .custom((value) => {
      if (!isValidUrl(value)) {
        throw new Error('Please provide a valid URL');
      }
      return true;
    }),
  
  body('liveUrl')
    .optional()
    .trim()
    .custom((value) => {
      if (!isValidUrl(value)) {
        throw new Error('Please provide a valid URL');
      }
      return true;
    }),
  
  body('tags')
    .optional()
    .isArray().withMessage('Tags must be an array')
    .custom((tags) => {
      if (tags && tags.length > 10) {
        throw new Error('Maximum 10 tags allowed');
      }
      return true;
    }),
  
  body('type')
    .optional()
    .trim()
    .isIn(['Frontend', 'Fullstack', 'AI', 'Backend', 'Mobile', 'Other']).withMessage('Invalid project type'),
  
  body('coverImage')
    .optional()
    .trim()
    .custom((value) => {
      if (value.startsWith('/uploads/') || 
          value.includes('localhost') || 
          value.startsWith('http://') || 
          value.startsWith('https://')) {
        return true;
      }
      throw new Error('Please provide a valid image URL');
    }),
  
  body('images')
    .optional()
    .isArray().withMessage('Images must be an array')
    .custom((images) => {
      if (images && images.length > 10) {
        throw new Error('Maximum 10 images allowed');
      }
      return true;
    }),
];


// ID validation
export const validateId = [
  param('id')
    .notEmpty().withMessage('ID is required')
    .isMongoId().withMessage('Invalid ID format'),
];

// Pagination validation
export const validatePagination = [
  query('page')
    .optional()
    .isInt({ min: 1 }).withMessage('Page must be a positive integer')
    .toInt(),
  
  query('limit')
    .optional()
    .isInt({ min: 1, max: 50 }).withMessage('Limit must be between 1 and 50')
    .toInt(),
];

// Search validation
export const validateSearch = [
  query('search')
    .optional()
    .trim()
    .customSanitizer(value => value === '' ? undefined : value),
  
  query('type')
    .optional()
    .trim()
    .customSanitizer(value => value === '' ? undefined : value)
    .isIn(['Frontend', 'Fullstack', 'AI', 'Backend', 'Mobile', 'Other']).optional(),
  
  query('tag')
    .optional()
    .trim()
    .customSanitizer(value => value === '' ? undefined : value),
];

// Refresh token validation
export const validateRefreshToken = [
  body('refreshToken')
    .notEmpty().withMessage('Refresh token is required')
    .isString().withMessage('Invalid refresh token format'),
];

// Image upload validation
export const validateImageUpload = [
  body('image')
    .custom((value, { req }) => {
      if (!req.file) {
        throw new Error('No image file provided');
      }
      return true;
    }),
];

// Middleware to handle validation results
export const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // For development, log the errors
    if (process.env.NODE_ENV === 'development') {
      console.log('Validation Errors:', errors.array());
    }
    
    return res.status(400).json({
      message: 'Validation failed',
      errors: errors.array().map(err => ({
        field: err.param,
        message: err.msg,
      })),
    });
  }
  next();
};

// Custom validators
export const customValidators = {
  // Check if string is a valid URL
  isValidUrl: (url) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  },
  
  // Check if string is a valid image URL
  isValidImageUrl: (url) => {
    const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg'];
    return imageExtensions.some(ext => url.toLowerCase().endsWith(ext));
  },
  
  // Sanitize tags (remove duplicates, trim, lowercase)
  sanitizeTags: (tags) => {
    if (!tags || !Array.isArray(tags)) return [];
    return [...new Set(tags)]
      .map(tag => tag.trim().toLowerCase())
      .filter(tag => tag.length > 0 && tag.length <= 30);
  },
  
  // Validate and sanitize project data
  sanitizeProject: (projectData) => {
    const sanitized = { ...projectData };
    
    if (sanitized.title) {
      sanitized.title = sanitized.title.trim();
    }
    
    if (sanitized.description) {
      sanitized.description = sanitized.description.trim();
    }
    
    if (sanitized.tags) {
      sanitized.tags = customValidators.sanitizeTags(sanitized.tags);
    }
    
    if (sanitized.githubUrl) {
      sanitized.githubUrl = sanitized.githubUrl.trim();
    }
    
    if (sanitized.liveUrl) {
      sanitized.liveUrl = sanitized.liveUrl.trim();
    }
    
    return sanitized;
  },
};