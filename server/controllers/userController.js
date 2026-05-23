import User from '../models/User.js';
import Post from '../models/Post.js';
import cloudinary from '../config/cloudinary.js';

export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
      .select('-password')
      .populate('followers', 'username profilePicture')
      .populate('following', 'username profilePicture');
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    const posts = await Post.find({ user: req.params.id })
      .populate('likes', 'username')
      .populate('comments.user', 'username')
      .sort({ createdAt: -1 });
    
    const stats = {
      totalPosts: posts.length,
      totalLikes: posts.reduce((sum, post) => sum + post.likes.length, 0),
      totalFollowers: user.followers.length,
      totalFollowing: user.following.length
    };
    
    res.json({ user, posts, stats });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    
    if (req.body.username) user.username = req.body.username;
    if (req.body.bio) user.bio = req.body.bio;
    
    if (req.file) {
      if (user.profilePicture) {
        const publicId = user.profilePicture.split('/').pop().split('.')[0];
        await cloudinary.uploader.destroy(`profiles/${publicId}`);
      }
      user.profilePicture = req.file.path;
    }
    
    await user.save();
    
    res.json({
      _id: user._id,
      username: user.username,
      email: user.email,
      profilePicture: user.profilePicture,
      bio: user.bio
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const followUser = async (req, res) => {
  try {
    const userToFollow = await User.findById(req.params.id);
    const currentUser = await User.findById(req.user.id);
    
    if (!userToFollow) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    if (userToFollow.followers.includes(req.user.id)) {
      userToFollow.followers = userToFollow.followers.filter(
        id => id.toString() !== req.user.id
      );
      currentUser.following = currentUser.following.filter(
        id => id.toString() !== req.params.id
      );
    } else {
      userToFollow.followers.push(req.user.id);
      currentUser.following.push(req.params.id);
    }
    
    await userToFollow.save();
    await currentUser.save();
    
    res.json({ message: 'Success' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const searchUsers = async (req, res) => {
  try {
    const searchQuery = req.query.q;
    const users = await User.find({
      $or: [
        { username: { $regex: searchQuery, $options: 'i' } },
        { email: { $regex: searchQuery, $options: 'i' } }
      ]
    }).select('username profilePicture bio followers');
    
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};