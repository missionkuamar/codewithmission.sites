import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    githubUrl: {
      type: String,
      required: true,
    },
    liveUrl: {
      type: String,
      required: true,
    },
    tags: [{
      type: String,
      trim: true,
    }],
    type: {
      type: String,
      enum: ['Frontend', 'Fullstack', 'AI', 'Backend', 'Mobile', 'Other'],
      required: true,
    },
    coverImage: {
      type: String,
      required: true,
    },
    images: [{
      type: String,
    }],
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    views: {
      type: Number,
      default: 0,
    },
    likes: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

projectSchema.index({ title: 'text', description: 'text', tags: 'text' });

const Project = mongoose.model('Project', projectSchema);
export default Project;