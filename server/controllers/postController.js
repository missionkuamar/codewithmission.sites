import Post from '../models/Post.js';
import { asyncHandler } from '../middleware/errorHandler.js';

// Create post with image upload
export const createPost = asyncHandler(async (req, res) => {
  console.log('=== CREATE POST REQUEST ===');
  console.log('User:', req.user?.id);
  console.log('Body:', req.body);
  console.log('Files:', req.files?.length || 0);
  
  try {
    const { title, content, category, tags } = req.body;
    
    // Validation
    if (!title || !title.trim()) {
      const error = new Error('Title is required');
      error.statusCode = 400;
      throw error;
    }
    
    if (!content || !content.trim()) {
      const error = new Error('Content is required');
      error.statusCode = 400;
      throw error;
    }
    
    // Process images if any
    let images = [];
    if (req.files && req.files.length > 0) {
      images = req.files.map(file => ({
        url: file.path,
        publicId: file.filename
      }));
      console.log(`Processing ${images.length} images`);
    }
    
    // Process tags
    let parsedTags = [];
    if (tags) {
      try {
        parsedTags = typeof tags === 'string' ? JSON.parse(tags) : tags;
      } catch (e) {
        parsedTags = tags.split(',').map(tag => tag.trim());
      }
    }
    
    // Create post
    const postData = {
      user: req.user.id,
      title: title.trim(),
      content: content.trim(),
      images,
      category: category || 'Other',
      tags: parsedTags
    };
    
    console.log('Creating post with data:', { ...postData, content: content.substring(0, 50) });
    
    const post = await Post.create(postData);
    console.log('Post created successfully:', post._id);
    
    // Populate user data
    const populatedPost = await Post.findById(post._id)
      .populate('user', 'username profilePicture')
      .populate('likes', 'username profilePicture')
      .populate('comments.user', 'username profilePicture');
    
    res.status(201).json({
      success: true,
      data: populatedPost,
      message: 'Post created successfully'
    });
    
  } catch (error) {
    console.error('Create post error details:', {
      name: error.name,
      message: error.message,
      stack: error.stack,
      code: error.code
    });
    
    // Handle specific MongoDB errors
    if (error.name === 'ValidationError') {
      error.statusCode = 400;
      error.message = Object.values(error.errors).map(e => e.message).join(', ');
    } else if (error.code === 11000) {
      error.statusCode = 409;
      error.message = 'Duplicate entry found';
    }
    
    throw error;
  }
});

// Get all posts with pagination
export const getPosts = asyncHandler(async (req, res) => {
  console.log('=== GET POSTS REQUEST ===');
  console.log('Query:', req.query);
  
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const startIndex = (page - 1) * limit;
    
    let query = {};
    
    // Filter by category
    if (req.query.category && req.query.category !== 'All') {
      query.category = req.query.category;
    }
    
    // Search functionality
    if (req.query.search && req.query.search.trim()) {
      query.$text = { $search: req.query.search };
    }
    
    console.log('MongoDB Query:', JSON.stringify(query));
    
    const posts = await Post.find(query)
      .populate('user', 'username profilePicture')
      .populate('likes', 'username profilePicture')
      .populate('comments.user', 'username profilePicture')
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip(startIndex);
    
    const total = await Post.countDocuments(query);
    
    console.log(`Found ${posts.length} posts out of ${total} total`);
    
    res.json({
      success: true,
      data: {
        posts,
        pagination: {
          currentPage: page,
          totalPages: Math.ceil(total / limit),
          totalPosts: total,
          limit
        }
      }
    });
    
  } catch (error) {
    console.error('Get posts error:', error);
    throw error;
  }
});

// Get single post
export const getPostById = asyncHandler(async (req, res) => {
  console.log('=== GET POST BY ID ===', req.params.id);
  
  try {
    const post = await Post.findById(req.params.id)
      .populate('user', 'username profilePicture bio')
      .populate('likes', 'username profilePicture')
      .populate('comments.user', 'username profilePicture');
    
    if (!post) {
      const error = new Error('Post not found');
      error.statusCode = 404;
      throw error;
    }
    
    // Increment views
    post.views += 1;
    await post.save();
    
    res.json(post);
    
  } catch (error) {
    console.error('Get post by ID error:', error);
    throw error;
  }
});

// Toggle like
export const toggleLike = asyncHandler(async (req, res) => {
  console.log('=== TOGGLE LIKE ===', req.params.id, 'User:', req.user.id);
  
  try {
    const post = await Post.findById(req.params.id);
    
    if (!post) {
      const error = new Error('Post not found');
      error.statusCode = 404;
      throw error;
    }
    
    const likeIndex = post.likes.indexOf(req.user.id);
    
    if (likeIndex === -1) {
      post.likes.push(req.user.id);
      console.log('Added like');
    } else {
      post.likes.splice(likeIndex, 1);
      console.log('Removed like');
    }
    
    await post.save();
    
    const updatedPost = await Post.findById(req.params.id)
      .populate('likes', 'username profilePicture');
    
    res.json(updatedPost);
    
  } catch (error) {
    console.error('Toggle like error:', error);
    throw error;
  }
});

// Add comment
export const addComment = asyncHandler(async (req, res) => {
  console.log('=== ADD COMMENT ===', req.params.id);
  console.log('Comment text:', req.body.text);
  
  try {
    const post = await Post.findById(req.params.id);
    
    if (!post) {
      const error = new Error('Post not found');
      error.statusCode = 404;
      throw error;
    }
    
    if (!req.body.text || !req.body.text.trim()) {
      const error = new Error('Comment text is required');
      error.statusCode = 400;
      throw error;
    }
    
    post.comments.push({
      user: req.user.id,
      text: req.body.text.trim()
    });
    
    await post.save();
    
    const updatedPost = await Post.findById(req.params.id)
      .populate('comments.user', 'username profilePicture');
    
    res.json(updatedPost);
    
  } catch (error) {
    console.error('Add comment error:', error);
    throw error;
  }
});

// Delete comment - FIXED EXPORT
export const deleteComment = asyncHandler(async (req, res) => {
  console.log('=== DELETE COMMENT ===', req.params.postId, 'Comment:', req.params.commentId);
  
  try {
    const post = await Post.findById(req.params.postId);
    
    if (!post) {
      const error = new Error('Post not found');
      error.statusCode = 404;
      throw error;
    }
    
    const commentIndex = post.comments.findIndex(
      comment => comment._id.toString() === req.params.commentId
    );
    
    if (commentIndex === -1) {
      const error = new Error('Comment not found');
      error.statusCode = 404;
      throw error;
    }
    
    // Check if user is authorized to delete comment
    const comment = post.comments[commentIndex];
    if (comment.user.toString() !== req.user.id && post.user.toString() !== req.user.id) {
      const error = new Error('Not authorized to delete this comment');
      error.statusCode = 401;
      throw error;
    }
    
    post.comments.splice(commentIndex, 1);
    await post.save();
    
    const updatedPost = await Post.findById(req.params.postId)
      .populate('comments.user', 'username profilePicture');
    
    res.json({
      success: true,
      data: updatedPost,
      message: 'Comment deleted successfully'
    });
    
  } catch (error) {
    console.error('Delete comment error:', error);
    throw error;
  }
});

// Delete post
export const deletePost = asyncHandler(async (req, res) => {
  console.log('=== DELETE POST ===', req.params.id, 'User:', req.user.id);
  
  try {
    const post = await Post.findById(req.params.id);
    
    if (!post) {
      const error = new Error('Post not found');
      error.statusCode = 404;
      throw error;
    }
    
    if (post.user.toString() !== req.user.id) {
      const error = new Error('Not authorized to delete this post');
      error.statusCode = 401;
      throw error;
    }
    
    // Delete images from cloudinary if any
    if (post.images && post.images.length > 0) {
      console.log(`Deleting ${post.images.length} images from Cloudinary`);
      // Import cloudinary only if needed
      const cloudinary = (await import('../config/cloudinary.js')).default;
      for (const image of post.images) {
        try {
          await cloudinary.uploader.destroy(image.publicId);
        } catch (cloudError) {
          console.error('Error deleting image from Cloudinary:', cloudError);
        }
      }
    }
    
    await post.deleteOne();
    console.log('Post deleted successfully');
    
    res.json({ 
      success: true, 
      message: 'Post deleted successfully' 
    });
    
  } catch (error) {
    console.error('Delete post error:', error);
    throw error;
  }
});

// Get posts by category
export const getPostsByCategory = asyncHandler(async (req, res) => {
  console.log('=== GET POSTS BY CATEGORY ===', req.params.category);
  
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 6;
    const startIndex = (page - 1) * limit;
    
    const query = { category: req.params.category };
    
    const posts = await Post.find(query)
      .populate('user', 'username profilePicture')
      .populate('likes', 'username')
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip(startIndex);
    
    const total = await Post.countDocuments(query);
    
    res.json({
      success: true,
      posts,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      totalPosts: total
    });
    
  } catch (error) {
    console.error('Get posts by category error:', error);
    throw error;
  }
});

// Update post (bonus feature)
export const updatePost = asyncHandler(async (req, res) => {
  console.log('=== UPDATE POST ===', req.params.id);
  
  try {
    const post = await Post.findById(req.params.id);
    
    if (!post) {
      const error = new Error('Post not found');
      error.statusCode = 404;
      throw error;
    }
    
    if (post.user.toString() !== req.user.id) {
      const error = new Error('Not authorized to update this post');
      error.statusCode = 401;
      throw error;
    }
    
    const { title, content, category, tags } = req.body;
    
    if (title) post.title = title.trim();
    if (content) post.content = content.trim();
    if (category) post.category = category;
    if (tags) {
      let parsedTags;
      try {
        parsedTags = typeof tags === 'string' ? JSON.parse(tags) : tags;
      } catch (e) {
        parsedTags = tags.split(',').map(tag => tag.trim());
      }
      post.tags = parsedTags;
    }
    
    await post.save();
    
    const updatedPost = await Post.findById(req.params.id)
      .populate('user', 'username profilePicture')
      .populate('likes', 'username profilePicture')
      .populate('comments.user', 'username profilePicture');
    
    res.json({
      success: true,
      data: updatedPost,
      message: 'Post updated successfully'
    });
    
  } catch (error) {
    console.error('Update post error:', error);
    throw error;
  }
});

// Get user's saved posts (bonus feature)
export const getSavedPosts = asyncHandler(async (req, res) => {
  console.log('=== GET SAVED POSTS ===', req.user.id);
  
  try {
    const user = await User.findById(req.user.id).populate({
      path: 'savedPosts',
      populate: [
        { path: 'user', select: 'username profilePicture' },
        { path: 'likes', select: 'username' },
        { path: 'comments.user', select: 'username profilePicture' }
      ]
    });
    
    res.json({
      success: true,
      posts: user.savedPosts
    });
    
  } catch (error) {
    console.error('Get saved posts error:', error);
    throw error;
  }
});