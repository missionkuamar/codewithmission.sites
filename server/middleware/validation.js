export const validatePost = (req, res, next) => {
  const { title, content } = req.body;
  const errors = [];
  
  if (!title || title.trim().length < 3) {
    errors.push('Title must be at least 3 characters long');
  }
  
  if (title && title.trim().length > 200) {
    errors.push('Title cannot exceed 200 characters');
  }
  
  if (!content || content.trim().length < 10) {
    errors.push('Content must be at least 10 characters long');
  }
  
  if (content && content.trim().length > 5000) {
    errors.push('Content cannot exceed 5000 characters');
  }
  
  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors
    });
  }
  
  // Clean and trim the data
  req.body.title = title.trim();
  req.body.content = content.trim();
  
  next();
};

export const validateComment = (req, res, next) => {
  const { text } = req.body;
  
  if (!text || text.trim().length === 0) {
    return res.status(400).json({
      success: false,
      message: 'Comment text is required'
    });
  }
  
  if (text.trim().length > 500) {
    return res.status(400).json({
      success: false,
      message: 'Comment cannot exceed 500 characters'
    });
  }
  
  req.body.text = text.trim();
  next();
};

export const validateUserUpdate = (req, res, next) => {
  const { username, bio } = req.body;
  const errors = [];
  
  if (username && (username.length < 3 || username.length > 30)) {
    errors.push('Username must be between 3 and 30 characters');
  }
  
  if (bio && bio.length > 500) {
    errors.push('Bio cannot exceed 500 characters');
  }
  
  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors
    });
  }
  
  next();
};