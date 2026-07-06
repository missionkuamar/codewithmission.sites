// controllers/blogController.js
import Blog from '../models/Blog.js';
import { uploadToCloudinary, deleteFromCloudinary } from '../utils/cloudinary.js';
import fs from 'fs';

// @desc    Create blog post
// @route   POST /api/blogs
// @access  Private (Admin only)
// controllers/blogController.js - Updated createBlog

// controllers/blogController.js - Add slug generation in create function

export const createBlog = async (req, res) => {
  try {
    const { title, excerpt, content, category, tags, featured, published, readTime, author } = req.body;
    
    // Validate required fields
    if (!title || !excerpt || !content || !category) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }

    // Process tags
    let tagsArray = [];
    if (tags) {
      if (Array.isArray(tags)) {
        tagsArray = tags;
      } else if (typeof tags === 'string') {
        try {
          tagsArray = JSON.parse(tags);
        } catch {
          tagsArray = tags.split(',').map(t => t.trim()).filter(Boolean);
        }
      }
    }

    // Generate slug from title (backup)
    const generateSlug = (text) => {
      return text
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .replace(/^-|-$/g, '') || 'post-' + Date.now();
    };

    // Handle single image upload (featured image) - from req.files.image
    let imageData = {};
    if (req.files && req.files.image && req.files.image.length > 0) {
      try {
        const file = req.files.image[0];
        const result = await uploadToCloudinary(file.path, 'blog');
        imageData = {
          url: result.secure_url,
          publicId: result.public_id
        };
        if (fs.existsSync(file.path)) {
          fs.unlinkSync(file.path);
        }
      } catch (error) {
        console.error('Image upload error:', error);
        if (req.files.image[0] && fs.existsSync(req.files.image[0].path)) {
          fs.unlinkSync(req.files.image[0].path);
        }
      }
    }

    // Handle multiple images (gallery) - from req.files.images
    let imagesData = [];
    if (req.files && req.files.images && req.files.images.length > 0) {
      try {
        for (const file of req.files.images) {
          const result = await uploadToCloudinary(file.path, 'blog/gallery');
          imagesData.push({
            url: result.secure_url,
            publicId: result.public_id
          });
          if (fs.existsSync(file.path)) {
            fs.unlinkSync(file.path);
          }
        }
      } catch (error) {
        console.error('Gallery upload error:', error);
        if (req.files.images) {
          for (const file of req.files.images) {
            if (fs.existsSync(file.path)) {
              fs.unlinkSync(file.path);
            }
          }
        }
      }
    }

    // Calculate read time
    const wordsPerMinute = 200;
    const wordCount = content.replace(/<[^>]*>/g, '').split(/\s+/).length;
    const calculatedReadTime = Math.ceil(wordCount / wordsPerMinute);
    const finalReadTime = readTime || `${Math.max(1, calculatedReadTime)} min read`;

    // Parse author data
    let authorData = {
      name: req.user?.name || 'Admin',
      avatar: req.user?.avatar || '',
      bio: req.user?.bio || ''
    };
    
    if (author) {
      try {
        authorData = typeof author === 'string' ? JSON.parse(author) : author;
      } catch (error) {
        console.error('Author parse error:', error);
      }
    }

    // Create blog with explicit slug
    const blog = new Blog({
      title,
      slug: generateSlug(title), // Explicitly set slug
      excerpt,
      content,
      category,
      tags: tagsArray,
      featured: featured === 'true' || featured === true,
      published: published === 'true' || published === true,
      readTime: finalReadTime,
      author: authorData,
      image: imageData,
      images: imagesData,
      createdBy: req.user._id
    });

    await blog.save();

    res.status(201).json({
      success: true,
      message: 'Blog post created successfully',
      blog
    });
  } catch (error) {
    console.error('Create blog error:', error);
    // Clean up any remaining temp files
    if (req.files) {
      if (req.files.image && req.files.image[0] && fs.existsSync(req.files.image[0].path)) {
        fs.unlinkSync(req.files.image[0].path);
      }
      if (req.files.images) {
        for (const file of req.files.images) {
          if (fs.existsSync(file.path)) {
            fs.unlinkSync(file.path);
          }
        }
      }
    }
    res.status(500).json({ message: error.message || 'Failed to create blog post' });
  }
};

// @desc    Get all blog posts
// @route   GET /api/blogs
// @access  Public
export const getBlogs = async (req, res) => {
  try {
    const { 
      page = 1, 
      limit = 10, 
      search = '', 
      category = '', 
      status = '',
      featured = '',
      sortBy = 'createdAt',
      sortOrder = 'desc'
    } = req.query;

    const query = {};
    
    if (search) {
      query.$text = { $search: search };
    }
    
    if (category && category !== 'all') {
      query.category = category;
    }
    
    if (status === 'published') {
      query.published = true;
    } else if (status === 'draft') {
      query.published = false;
    }
    
    if (featured === 'true') {
      query.featured = true;
    }

    // For public view, only show published
    if (req.query.public === 'true') {
      query.published = true;
    }

    const skip = (Number(page) - 1) * Number(limit);
    const sort = { [sortBy]: sortOrder === 'desc' ? -1 : 1 };

    const blogs = await Blog.find(query)
      .sort(sort)
      .skip(skip)
      .limit(Number(limit))
      .populate('createdBy', 'name email avatar');

    const total = await Blog.countDocuments(query);

    res.json({
      success: true,
      blogs,
      pagination: {
        total,
        page: Number(page),
        pages: Math.ceil(total / Number(limit)),
        limit: Number(limit)
      }
    });
  } catch (error) {
    console.error('Get blogs error:', error);
    res.status(500).json({ message: 'Failed to fetch blog posts' });
  }
};

// @desc    Get single blog post
// @route   GET /api/blogs/:id
// @access  Public
export const getBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id)
      .populate('createdBy', 'name email avatar');
    
    if (!blog) {
      return res.status(404).json({ message: 'Blog post not found' });
    }

    blog.views += 1;
    await blog.save();

    res.json({
      success: true,
      blog
    });
  } catch (error) {
    console.error('Get blog error:', error);
    res.status(500).json({ message: 'Failed to fetch blog post' });
  }
};

// @desc    Get blog post by slug
// @route   GET /api/blogs/slug/:slug
// @access  Public
export const getBlogBySlug = async (req, res) => {
  try {
    const blog = await Blog.findOne({ slug: req.params.slug })
      .populate('createdBy', 'name email avatar');
    
    if (!blog) {
      return res.status(404).json({ message: 'Blog post not found' });
    }

    blog.views += 1;
    await blog.save();

    res.json({
      success: true,
      blog
    });
  } catch (error) {
    console.error('Get blog by slug error:', error);
    res.status(500).json({ message: 'Failed to fetch blog post' });
  }
};

// @desc    Update blog post
// @route   PUT /api/blogs/:id
// @access  Private (Admin only)
// controllers/blogController.js - Updated updateBlog

export const updateBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    
    if (!blog) {
      return res.status(404).json({ message: 'Blog post not found' });
    }

    const { title, excerpt, content, category, tags, featured, published, readTime, author } = req.body;

    // Update fields
    if (title) blog.title = title;
    if (excerpt) blog.excerpt = excerpt;
    if (content) blog.content = content;
    if (category) blog.category = category;
    if (featured !== undefined) blog.featured = featured === 'true' || featured === true;
    if (published !== undefined) blog.published = published === 'true' || published === true;
    if (readTime) blog.readTime = readTime;
    
    if (tags) {
      if (Array.isArray(tags)) {
        blog.tags = tags;
      } else if (typeof tags === 'string') {
        try {
          blog.tags = JSON.parse(tags);
        } catch {
          blog.tags = tags.split(',').map(t => t.trim()).filter(Boolean);
        }
      }
    }

    if (author) {
      try {
        blog.author = typeof author === 'string' ? JSON.parse(author) : author;
      } catch {
        // Keep existing author
      }
    }

    // Handle single image upload (featured image) - from req.files.image
    if (req.files && req.files.image && req.files.image.length > 0) {
      try {
        // Delete old image from cloudinary
        if (blog.image && blog.image.publicId) {
          await deleteFromCloudinary(blog.image.publicId);
        }
        
        const file = req.files.image[0];
        const result = await uploadToCloudinary(file.path, 'blog');
        blog.image = {
          url: result.secure_url,
          publicId: result.public_id
        };
        
        if (fs.existsSync(file.path)) {
          fs.unlinkSync(file.path);
        }
      } catch (error) {
        console.error('Image upload error:', error);
        if (req.files.image[0] && fs.existsSync(req.files.image[0].path)) {
          fs.unlinkSync(req.files.image[0].path);
        }
      }
    }

    // Handle multiple images (gallery) - from req.files.images
    if (req.files && req.files.images && req.files.images.length > 0) {
      try {
        // Delete old gallery images from cloudinary
        if (blog.images && blog.images.length > 0) {
          for (const img of blog.images) {
            if (img.publicId) {
              await deleteFromCloudinary(img.publicId);
            }
          }
        }
        
        // Clear existing gallery images
        blog.images = [];
        
        // Upload new gallery images
        for (const file of req.files.images) {
          const result = await uploadToCloudinary(file.path, 'blog/gallery');
          blog.images.push({
            url: result.secure_url,
            publicId: result.public_id
          });
          if (fs.existsSync(file.path)) {
            fs.unlinkSync(file.path);
          }
        }
      } catch (error) {
        console.error('Gallery upload error:', error);
        if (req.files.images) {
          for (const file of req.files.images) {
            if (fs.existsSync(file.path)) {
              fs.unlinkSync(file.path);
            }
          }
        }
      }
    }

    await blog.save();

    res.json({
      success: true,
      message: 'Blog post updated successfully',
      blog
    });
  } catch (error) {
    console.error('Update blog error:', error);
    if (req.files) {
      if (req.files.image && req.files.image[0] && fs.existsSync(req.files.image[0].path)) {
        fs.unlinkSync(req.files.image[0].path);
      }
      if (req.files.images) {
        for (const file of req.files.images) {
          if (fs.existsSync(file.path)) {
            fs.unlinkSync(file.path);
          }
        }
      }
    }
    res.status(500).json({ message: error.message || 'Failed to update blog post' });
  }
};

// @desc    Delete blog post
// @route   DELETE /api/blogs/:id
// @access  Private (Admin only)
export const deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    
    if (!blog) {
      return res.status(404).json({ message: 'Blog post not found' });
    }

    if (blog.image && blog.image.publicId) {
      await deleteFromCloudinary(blog.image.publicId);
    }
    
    if (blog.images && blog.images.length > 0) {
      for (const img of blog.images) {
        if (img.publicId) {
          await deleteFromCloudinary(img.publicId);
        }
      }
    }

    await blog.deleteOne();

    res.json({
      success: true,
      message: 'Blog post deleted successfully'
    });
  } catch (error) {
    console.error('Delete blog error:', error);
    res.status(500).json({ message: 'Failed to delete blog post' });
  }
};

// @desc    Toggle featured status
// @route   PATCH /api/blogs/:id/featured
// @access  Private (Admin only)
export const toggleFeatured = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    
    if (!blog) {
      return res.status(404).json({ message: 'Blog post not found' });
    }

    blog.featured = !blog.featured;
    await blog.save();

    res.json({
      success: true,
      message: `Blog ${blog.featured ? 'featured' : 'unfeatured'} successfully`,
      featured: blog.featured
    });
  } catch (error) {
    console.error('Toggle featured error:', error);
    res.status(500).json({ message: 'Failed to toggle featured status' });
  }
};

// @desc    Toggle publish status
// @route   PATCH /api/blogs/:id/publish
// @access  Private (Admin only)
export const togglePublish = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    
    if (!blog) {
      return res.status(404).json({ message: 'Blog post not found' });
    }

    blog.published = !blog.published;
    await blog.save();

    res.json({
      success: true,
      message: `Blog ${blog.published ? 'published' : 'unpublished'} successfully`,
      published: blog.published
    });
  } catch (error) {
    console.error('Toggle publish error:', error);
    res.status(500).json({ message: 'Failed to toggle publish status' });
  }
};

// @desc    Like blog post
// @route   POST /api/blogs/:id/like
// @access  Public
export const likeBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    
    if (!blog) {
      return res.status(404).json({ message: 'Blog post not found' });
    }

    blog.likes += 1;
    await blog.save();

    res.json({
      success: true,
      message: 'Blog liked successfully',
      likes: blog.likes
    });
  } catch (error) {
    console.error('Like blog error:', error);
    res.status(500).json({ message: 'Failed to like blog post' });
  }
};

// @desc    Get blog stats
// @route   GET /api/blogs/stats
// @access  Private (Admin only)
export const getBlogStats = async (req, res) => {
  try {
    const total = await Blog.countDocuments();
    const published = await Blog.countDocuments({ published: true });
    const draft = await Blog.countDocuments({ published: false });
    const featured = await Blog.countDocuments({ featured: true });
    
    const result = await Blog.aggregate([
      {
        $group: {
          _id: null,
          totalViews: { $sum: '$views' },
          totalLikes: { $sum: '$likes' },
          totalComments: { $sum: '$comments' },
          totalShares: { $sum: '$shares' }
        }
      }
    ]);

    const stats = result[0] || {
      totalViews: 0,
      totalLikes: 0,
      totalComments: 0,
      totalShares: 0
    };

    res.json({
      success: true,
      stats: {
        total,
        published,
        draft,
        featured,
        ...stats
      }
    });
  } catch (error) {
    console.error('Get blog stats error:', error);
    res.status(500).json({ message: 'Failed to fetch blog stats' });
  }
};

// @desc    Add images to existing blog
// @route   POST /api/blogs/:id/images
// @access  Private (Admin only)
export const addBlogImages = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    
    if (!blog) {
      return res.status(404).json({ message: 'Blog post not found' });
    }

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: 'No images provided' });
    }

    const imagesData = [];
    
    for (const file of req.files) {
      try {
        const result = await uploadToCloudinary(file.path, 'blog/gallery');
        imagesData.push({
          url: result.secure_url,
          publicId: result.public_id
        });
        if (fs.existsSync(file.path)) {
          fs.unlinkSync(file.path);
        }
      } catch (error) {
        console.error('Image upload error:', error);
        if (fs.existsSync(file.path)) {
          fs.unlinkSync(file.path);
        }
      }
    }

    blog.images = [...blog.images, ...imagesData];
    await blog.save();

    res.json({
      success: true,
      message: 'Images added successfully',
      images: blog.images
    });
  } catch (error) {
    console.error('Add images error:', error);
    if (req.files) {
      for (const file of req.files) {
        if (fs.existsSync(file.path)) {
          fs.unlinkSync(file.path);
        }
      }
    }
    res.status(500).json({ message: 'Failed to add images' });
  }
};

// @desc    Remove image from blog gallery
// @route   DELETE /api/blogs/:id/images/:imageId
// @access  Private (Admin only)
export const removeBlogImage = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    
    if (!blog) {
      return res.status(404).json({ message: 'Blog post not found' });
    }

    const imageIndex = blog.images.findIndex(img => img._id.toString() === req.params.imageId);
    
    if (imageIndex === -1) {
      return res.status(404).json({ message: 'Image not found' });
    }

    if (blog.images[imageIndex].publicId) {
      await deleteFromCloudinary(blog.images[imageIndex].publicId);
    }

    blog.images.splice(imageIndex, 1);
    await blog.save();

    res.json({
      success: true,
      message: 'Image removed successfully',
      images: blog.images
    });
  } catch (error) {
    console.error('Remove image error:', error);
    res.status(500).json({ message: 'Failed to remove image' });
  }
};

// @desc    Remove featured image
// @route   DELETE /api/blogs/:id/featured-image
// @access  Private (Admin only)
export const removeFeaturedImage = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    
    if (!blog) {
      return res.status(404).json({ message: 'Blog post not found' });
    }

    if (blog.image && blog.image.publicId) {
      await deleteFromCloudinary(blog.image.publicId);
    }

    blog.image = {};
    await blog.save();

    res.json({
      success: true,
      message: 'Featured image removed successfully'
    });
  } catch (error) {
    console.error('Remove featured image error:', error);
    res.status(500).json({ message: 'Failed to remove featured image' });
  }
};