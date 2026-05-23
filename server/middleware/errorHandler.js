export const errorHandler = (err, req, res, next) => {
  // Ensure err is an object with message
  const errorMessage = err?.message || err?.toString() || 'An unknown error occurred';
  const errorStack = err?.stack || '';
  const statusCode = res.statusCode === 200 ? (err?.statusCode || 500) : res.statusCode;
  
  console.error('Error Details:', {
    message: errorMessage,
    stack: errorStack,
    timestamp: new Date().toISOString(),
    path: req.path,
    method: req.method,
    user: req.user?.id,
    body: req.body,
    files: req.files?.length || 0
  });

  res.status(statusCode).json({
    success: false,
    message: errorMessage,
    stack: process.env.NODE_ENV === 'production' ? null : errorStack,
    errors: err?.errors || null
  });
};

export const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  error.statusCode = 404;
  res.status(404);
  next(error);
};

export const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};