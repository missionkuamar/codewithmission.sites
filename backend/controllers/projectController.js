
import Product from '../models/Project.js';
import { uploadToCloudinary, deleteFromCloudinary } from '../utils/cloudinary.js';

// Create Product
export const createProduct = async (req, res) => {
  try {
   // console.log('Request body:', req.body);
    //console.log('Request files:', req.files);

    const { 
      title, description, price, category, tags, 
      type, socialLinks, liveDemoUrl, githubUrl,
      featured, inStock 
    } = req.body;

    // Validate required fields
    if (!title || !description || !price || !category || !type) {
      return res.status(400).json({ 
        success: false,
        message: 'Please provide all required fields: title, description, price, category, type' 
      });
    }

    // Parse JSON fields
    let parsedTags = [];
    let parsedSocialLinks = [];
    
    try {
      parsedTags = tags ? JSON.parse(tags) : [];
    } catch (e) {
      parsedTags = tags ? tags.split(',').map(t => t.trim()) : [];
    }

    try {
      parsedSocialLinks = socialLinks ? JSON.parse(socialLinks) : [];
    } catch (e) {
      parsedSocialLinks = [];
    }

    // Handle images
    let uploadedImages = [];
    let thumbnail = null;

    if (req.files) {
      // Handle multiple images
      if (req.files.images) {
        for (const file of req.files.images) {
          const result = await uploadToCloudinary(file.path, 'products');
          uploadedImages.push({
            url: result.secure_url,
            publicId: result.public_id,
            isThumbnail: false
          });
        }
      }

      // Handle thumbnail
      if (req.files.thumbnail) {
        const file = req.files.thumbnail[0];
        const result = await uploadToCloudinary(file.path, 'products/thumbnails');
        thumbnail = {
          url: result.secure_url,
          publicId: result.public_id,
          isThumbnail: true
        };
      } else if (uploadedImages.length > 0) {
        // Set first image as thumbnail if no thumbnail uploaded
        thumbnail = {
          ...uploadedImages[0],
          isThumbnail: true
        };
        uploadedImages[0].isThumbnail = true;
      }
    }

    // Create product
    const product = await Product.create({
      title,
      description,
      price: Number(price),
      category,
      tags: parsedTags,
      images: uploadedImages,
      thumbnail: thumbnail,
      type,
      socialLinks: parsedSocialLinks,
      liveDemoUrl: liveDemoUrl || '',
      githubUrl: githubUrl || '',
      featured: featured === 'true' || featured === true,
      inStock: inStock === 'true' || inStock === true,
      createdBy: req.user?.id || req.user?._id
    });

    res.status(201).json({
      success: true,
      product,
      message: 'Product created successfully'
    });

  } catch (error) {
    console.error('Create product error:', error);
    res.status(500).json({ 
      success: false,
      message: 'Failed to create product',
      error: error.message 
    });
  }
};

// Get all products
export const getProducts = async (req, res) => {
  try {
    const { category, type, featured, search, page = 1, limit = 20 } = req.query;
    
    const query = {};
    if (category) query.category = category;
    if (type) query.type = type;
    if (featured === 'true') query.featured = true;
    if (search) {
      query.$text = { $search: search };
    }

    const skip = (Number(page) - 1) * Number(limit);
    
    const products = await Product.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(Number(limit))
      .populate('createdBy', 'name email');

    const total = await Product.countDocuments(query);

    res.json({
      success: true,
      products,
      pagination: {
        total,
        page: Number(page),
        pages: Math.ceil(total / Number(limit))
      }
    });
  } catch (error) {
    console.error('Get products error:', error);
    res.status(500).json({ message: 'Failed to fetch products' });
  }
};

// Get single product
export const getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
      .populate('createdBy', 'name email');
    
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    product.views += 1;
    await product.save();

    res.json({ success: true, product });
  } catch (error) {
    console.error('Get product error:', error);
    res.status(500).json({ message: 'Failed to fetch product' });
  }
};

// Update product
export const updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    const { 
      title, description, price, category, tags, 
      type, socialLinks, liveDemoUrl, githubUrl,
      featured, inStock 
    } = req.body;

    // Update basic fields
    if (title) product.title = title;
    if (description) product.description = description;
    if (price) product.price = Number(price);
    if (category) product.category = category;
    if (type) product.type = type;
    if (liveDemoUrl) product.liveDemoUrl = liveDemoUrl;
    if (githubUrl) product.githubUrl = githubUrl;
    if (featured !== undefined) product.featured = featured === 'true' || featured === true;
    if (inStock !== undefined) product.inStock = inStock === 'true' || inStock === true;

    // Parse tags
    if (tags) {
      try {
        product.tags = JSON.parse(tags);
      } catch (e) {
        product.tags = tags.split(',').map(t => t.trim());
      }
    }

    // Parse social links
    if (socialLinks) {
      try {
        product.socialLinks = JSON.parse(socialLinks);
      } catch (e) {
        product.socialLinks = [];
      }
    }

    // Handle new images
    if (req.files && req.files.images) {
      // Delete old images
      for (const image of product.images) {
        if (image.publicId) {
          await deleteFromCloudinary(image.publicId);
        }
      }

      // Upload new images
      const uploadedImages = [];
      for (const file of req.files.images) {
        const result = await uploadToCloudinary(file.path, 'products');
        uploadedImages.push({
          url: result.secure_url,
          publicId: result.public_id,
          isThumbnail: false
        });
      }

      product.images = uploadedImages;
    }

    // Handle thumbnail update
    if (req.files && req.files.thumbnail) {
      if (product.thumbnail?.publicId) {
        await deleteFromCloudinary(product.thumbnail.publicId);
      }
      const file = req.files.thumbnail[0];
      const result = await uploadToCloudinary(file.path, 'products/thumbnails');
      product.thumbnail = {
        url: result.secure_url,
        publicId: result.public_id,
        isThumbnail: true
      };
    }

    await product.save();

    res.json({
      success: true,
      product,
      message: 'Product updated successfully'
    });
  } catch (error) {
    console.error('Update product error:', error);
    res.status(500).json({ message: 'Failed to update product' });
  }
};

// Delete product
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Delete images
    for (const image of product.images) {
      if (image.publicId) {
        await deleteFromCloudinary(image.publicId);
      }
    }

    if (product.thumbnail?.publicId) {
      await deleteFromCloudinary(product.thumbnail.publicId);
    }

    await product.deleteOne();

    res.json({
      success: true,
      message: 'Product deleted successfully'
    });
  } catch (error) {
    console.error('Delete product error:', error);
    res.status(500).json({ message: 'Failed to delete product' });
  }
};