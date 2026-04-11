import Project from '../models/Project.js';
import { customValidators } from '../utils/validators.js';

// @desc    Create a project
// @route   POST /api/projects
export const createProject = async (req, res) => {
  try {
    // Sanitize input data
    const sanitizedData = customValidators.sanitizeProject(req.body);
    
    const project = await Project.create({
      ...sanitizedData,
      user: req.user._id,
    });
    
    res.status(201).json(project);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all projects with advanced filtering
// @route   GET /api/projects
export const getProjects = async (req, res) => {
  try {
    const { search, type, tag, page = 1, limit = 12, sortBy = 'createdAt', sortOrder = 'desc' } = req.query;
    const query = {};
    
    // Text search - only add if search exists and is not empty
    if (search && search.trim() !== '') {
      query.$text = { $search: search.trim() };
    }
    
    // Filter by type - only add if type exists and is not empty
    if (type && type.trim() !== '' && type !== 'All') {
      query.type = type;
    }
    
    // Filter by tag - only add if tag exists and is not empty
    if (tag && tag.trim() !== '') {
      query.tags = tag;
    }
    
    // Sorting
    const sort = {};
    sort[sortBy] = sortOrder === 'desc' ? -1 : 1;
    
    // Calculate skip
    const skip = (parseInt(page) - 1) * parseInt(limit);
    
    const projects = await Project.find(query)
      .populate('user', 'name email avatar')
      .sort(sort)
      .limit(parseInt(limit))
      .skip(skip);
    
    const total = await Project.countDocuments(query);
    
    res.json({
      projects,
      totalPages: Math.ceil(total / parseInt(limit)),
      currentPage: parseInt(page),
      total,
      limit: parseInt(limit),
    });
  } catch (error) {
    console.error('Error in getProjects:', error);
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single project
// @route   GET /api/projects/:id
export const getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id)
      .populate('user', 'name email avatar');
    
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    
    // Increment views
    project.views += 1;
    await project.save();
    
    res.json(project);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update project
// @route   PUT /api/projects/:id
export const updateProject = async (req, res) => {
  try {
    let project = await Project.findById(req.params.id);
    
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    
    // Check if user owns the project
    if (project.user.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(401).json({ message: 'Not authorized' });
    }
    
    // Sanitize input data
    const sanitizedData = customValidators.sanitizeProject(req.body);
    
    project = await Project.findByIdAndUpdate(
      req.params.id,
      { ...sanitizedData },
      { new: true, runValidators: true }
    );
    
    res.json(project);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete project
// @route   DELETE /api/projects/:id
export const deleteProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    
    // Check if user owns the project
    if (project.user.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(401).json({ message: 'Not authorized' });
    }
    
    await project.deleteOne();
    res.json({ message: 'Project removed successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get user projects
// @route   GET /api/projects/user/:userId
export const getUserProjects = async (req, res) => {
  try {
    const projects = await Project.find({ user: req.params.userId })
      .sort('-createdAt')
      .populate('user', 'name email');
    
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Toggle like on project
// @route   POST /api/projects/:id/like
export const toggleLike = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    
    // This is a simplified like system
    // For a real implementation, you'd want to track which users liked which projects
    project.likes += 1;
    await project.save();
    
    res.json({ likes: project.likes });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get related projects
// @route   GET /api/projects/:id/related
export const getRelatedProjects = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    
    const relatedProjects = await Project.find({
      _id: { $ne: project._id },
      $or: [
        { tags: { $in: project.tags } },
        { type: project.type }
      ]
    })
    .limit(4)
    .populate('user', 'name');
    
    res.json(relatedProjects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};