export const categories = [
  'All',
  'Technology',
  'Lifestyle',
  'Travel',
  'Food',
  'Fashion',
  'Sports',
  'Music',
  'Art',
  'Business',
  'Education',
  'Other'
];

export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const MAX_IMAGE_SIZE = 5 * 1024 * 1024; // 5MB
export const MAX_IMAGES = 5;

export const SORT_OPTIONS = [
  { value: 'latest', label: 'Latest' },
  { value: 'oldest', label: 'Oldest' },
  { value: 'popular', label: 'Most Popular' },
  { value: 'mostLiked', label: 'Most Liked' }
];